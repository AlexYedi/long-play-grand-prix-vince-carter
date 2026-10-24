// Provable LP Update: review server. node:http, zero deps, no network or LLM calls.
// Run: node app/server.mjs   (PORT env, default 3000)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const APP = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(APP, 'public');
const OUT = path.join(APP, 'out');
const DATA_PACK = path.resolve(APP, '..', 'data-pack');
const PORT = Number(process.env.PORT) || 3000;

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

function readJsonl(name) {
  const p = path.join(OUT, name);
  if (!fs.existsSync(p)) return [];
  return fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

// Append-only log: there is deliberately no update or delete path.
function append(name, rec) {
  fs.mkdirSync(OUT, { recursive: true });
  fs.appendFileSync(path.join(OUT, name), JSON.stringify(rec) + '\n');
  return rec;
}

// Resolve a data-pack-relative path; null if it escapes data-pack/.
function safeDataPath(file) {
  if (!file || path.isAbsolute(file) || file.split(/[\\/]/).includes('..')) return null;
  const full = path.resolve(DATA_PACK, file);
  return full.startsWith(DATA_PACK + path.sep) ? full : null;
}

// Minimal CSV parser (handles quoted fields with commas).
function parseCsv(text) {
  return text.trim().split(/\r?\n/).filter((l) => !l.startsWith('#')).map((line) => {
    const out = []; let cur = ''; let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
      else if (ch === '"') q = true; else if (ch === ',') { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur);
    return out;
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let b = '';
    req.on('data', (c) => { b += c; if (b.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

// HOOK: Roundtable task routing goes here later (founder / ops / GP).
// Must stay side-effect free until wired; returns {routed:false}.
function routeQuestion(q) { // eslint-disable-line no-unused-vars
  return { routed: false };
}

function ledger() {
  const live = path.join(OUT, 'ledger.json');
  if (fs.existsSync(live)) return { body: fs.readFileSync(live, 'utf8'), from: 'app/out/ledger.json' };
  return { body: fs.readFileSync(path.join(PUBLIC, 'sample-ledger.json'), 'utf8'), from: 'app/public/sample-ledger.json (sample)' };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    if (req.method === 'GET' && p === '/api/ledger') {
      const { body, from } = ledger();
      res.setHeader('x-ledger-source', from);
      return send(res, 200, body);
    }

    if (req.method === 'GET' && p === '/api/source') {
      const file = url.searchParams.get('file');
      const full = safeDataPath(file);
      if (!full) return send(res, 400, { error: 'file must be a relative path under data-pack/' });
      if (!fs.existsSync(full)) return send(res, 404, { error: 'source file not found', file });
      const text = fs.readFileSync(full, 'utf8');
      const rows = url.searchParams.get('rows');
      if (rows !== null || file.endsWith('.csv')) {
        const [header, ...data] = parseCsv(text);
        const ids = new Set((rows || '').split(',').filter(Boolean));
        const note = text.split(/\r?\n/).filter((l) => l.startsWith('#')).map((l) => l.replace(/^#\s*/, '')).join(' ') || null;
        return send(res, 200, { file, note, header, rows: data.map((r) => ({ id: r[0], cells: r, highlight: ids.has(r[0]) })) });
      }
      const start = Number(url.searchParams.get('start'));
      const end = Number(url.searchParams.get('end'));
      return send(res, 200, { file, text, start: Number.isFinite(start) ? start : null, end: Number.isFinite(end) ? end : null });
    }

    if (req.method === 'GET' && p === '/api/state') {
      return send(res, 200, { annotations: readJsonl('annotations.jsonl'), questions: readJsonl('questions.jsonl'), approvals: readJsonl('approvals.jsonl') });
    }

    if (req.method === 'GET' && p === '/api/akta') {
      const f = path.join(APP, 'data', 'akta_comps.json');
      return fs.existsSync(f) ? send(res, 200, fs.readFileSync(f, 'utf8')) : send(res, 200, { available: false });
    }

    if (req.method === 'POST' && p === '/api/annotate') {
      const b = await readBody(req);
      if (!b.company_id || !b.text) return send(res, 400, { error: 'company_id and text required' });
      const rec = append('annotations.jsonl', { id: randomUUID(), ts: new Date().toISOString(), author: 'GP', company_id: b.company_id, target: b.target ?? null, text: String(b.text) });
      return send(res, 200, rec);
    }

    if (req.method === 'POST' && p === '/api/ask') {
      const b = await readBody(req);
      if (!b.company_id || !b.question || !['founder', 'ops', 'gp'].includes(b.to)) return send(res, 400, { error: 'company_id, question and to (founder|ops|gp) required' });
      const q = { id: randomUUID(), ts: new Date().toISOString(), company_id: b.company_id, target: b.target ?? null, question: String(b.question), to: b.to, status: 'open' };
      q.routing = routeQuestion(q);
      append('questions.jsonl', q);
      return send(res, 200, { id: q.id, routing: q.routing });
    }

    if (req.method === 'POST' && p === '/api/approve') {
      const b = await readBody(req);
      if (!b.company_id || !b.approver) return send(res, 400, { error: 'company_id (or "fund") and approver required' });
      const rec = append('approvals.jsonl', { id: randomUUID(), ts: new Date().toISOString(), company_id: b.company_id, approver: String(b.approver) });
      return send(res, 200, rec);
    }

    if (req.method === 'GET') {
      const rel = p === '/' ? 'index.html' : decodeURIComponent(p.slice(1));
      const full = path.resolve(PUBLIC, rel);
      if (!full.startsWith(PUBLIC + path.sep) || !fs.existsSync(full) || !fs.statSync(full).isFile()) return send(res, 404, { error: 'not found' });
      return send(res, 200, fs.readFileSync(full), TYPES[path.extname(full)] || 'application/octet-stream');
    }
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, 500, { error: e.message });
  }
});

server.listen(PORT, () => console.log(`review server on http://localhost:${PORT}`));
