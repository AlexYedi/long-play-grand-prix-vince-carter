// GP review page. Vanilla JS, no deps, no LLM: everything renders from /api/ledger + /api/state.
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let L = null;                // ledger
let S = { annotations: [], questions: [], approvals: [] };
let selected = null;         // company_id
const sources = [];          // registry: index -> source object (for data-src links)

// ---------- formatting ----------
function money(v) {
  if (v == null) return '—';
  const a = Math.abs(v);
  if (a >= 1e6) return '$' + (v / 1e6).toFixed(a >= 1e7 ? 1 : 2).replace(/\.?0+$/, '') + 'M';
  if (a >= 1e3) return '$' + (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return '$' + v;
}
function fmt(v, unit) {
  if (v == null) return '—';
  if (unit === 'usd' || unit === 'currency') return money(v);
  if (unit === 'months') return v + ' mo';
  if (unit === 'pct') return v + '%';
  return String(v);
}
const pct = (d) => (d == null ? '—' : (d > 0 ? '+' : '') + d + '%');
function srcLink(source, text) {
  if (!source) return esc(text);
  sources.push(source);
  return `<a class="val" data-src="${sources.length - 1}">${esc(text)}</a>`;
}
const BADGE = { founder_quote: '✓ founder quote', system_rows: '✓ system rows', unverified: '⚠ unverified' };

// ---------- state helpers ----------
const company = (id) => L.companies.find((c) => c.company_id === id);
const annsFor = (id) => S.annotations.filter((a) => a.company_id === id);
const approvalFor = (id) => [...S.approvals].reverse().find((a) => a.company_id === id);
const redFlags = (c) => c.flags.filter((f) => f.severity === 'red');
const flagTarget = (f) => 'flag:' + f.flag;
// Approve gate: every red flag needs at least one GP annotation targeted at it.
function unannotatedRed(c) {
  const ann = new Set(annsFor(c.company_id).map((a) => a.target));
  return redFlags(c).filter((f) => !ann.has(flagTarget(f)));
}

async function api(path, body) {
  const r = await fetch(path, body ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) } : {});
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
  return r.json();
}
async function refreshState() { S = await api('/api/state'); }

// ---------- top bar ----------
function renderFund() {
  const f = L.fund, p = f.prior || {};
  const item = (label, v, pv) => `<span>${label} <b>${v}</b> <span class="muted">(Q2 ${pv ?? '—'})</span></span>`;
  $('#fund').innerHTML = item('NAV', money(f.nav_usd), money(p.nav_usd)) + item('TVPI', f.tvpi + 'x', p.tvpi != null ? p.tvpi + 'x' : null) +
    item('DPI', f.dpi + 'x', p.dpi != null ? p.dpi + 'x' : null) + item('Net IRR', f.net_irr + '%', p.net_irr != null ? p.net_irr + '%' : null) +
    `<span class="note">computed from the capital account, not generated${L.synthetic ? ' · synthetic' : ''}</span>`;
}

// ---------- left: segments ----------
function renderSegments() {
  const segs = [...L.segments].sort((a, b) => b.summary.red - a.summary.red);
  $('#segments').innerHTML = segs.map((s) => {
    const cos = s.company_ids.map(company).filter(Boolean)
      .sort((a, b) => redFlags(b).length - redFlags(a).length || b.flags.length - a.flags.length);
    return `<div class="seg"><h4>${esc(s.segment)} · ${s.summary.n} <span class="red">${s.summary.red ? s.summary.red + ' red' : ''}</span> <span class="amber">${s.summary.amber ? s.summary.amber + ' amber' : ''}</span></h4>` +
      cos.map((c) => {
        const r = redFlags(c).length, a = c.flags.length - r;
        return `<div class="row ${c.company_id === selected ? 'sel' : ''} ${r ? 'isred' : ''}" data-co="${c.company_id}"><span class="name">${esc(c.company)}</span><span>` +
          (approvalFor(c.company_id) ? '<span class="ok-tag">approved</span>' : '') +
          (r ? `<span class="count red">●${r}</span>` : '') + (a ? `<span class="count amber">●${a}</span>` : '') + '</span></div>';
      }).join('') + '</div>';
  }).join('');
}

// ---------- center: company card ----------
function renderCard() {
  const c = company(selected);
  if (!c) return;
  sources.length = 0;
  const fw = `agreed reporting framework: ${esc(c.segment)} · ${esc(c.stage)}${c.sector ? ' · ' + esc(c.sector) : ''}`;
  const rows = c.metrics.map((m) => `<tr>
      <td>${esc(m.label)}${m.derivation ? `<div class="muted" style="font-size:11px">${esc(m.derivation)}</div>` : ''}</td>
      <td class="num">${srcLink(m.source, fmt(m.value, m.unit))}</td>
      <td class="num muted">${fmt(m.prior, m.unit)}</td>
      <td class="num">${pct(m.delta_pct)}</td>
      <td class="num muted">${fmt(m.target, m.unit)}</td>
      <td class="st-${m.status}">${esc(m.status.replace(/_/g, ' '))}</td>
      <td class="badge ${m.verified}">${BADGE[m.verified] || esc(m.verified)}</td>
      <td><button class="q" data-ask="metric:${esc(m.key)}" title="Annotate or ask">?</button></td></tr>`).join('');
  const ann = annsFor(c.company_id);
  const flags = c.flags.map((f) => {
    const notes = ann.filter((a) => a.target === flagTarget(f));
    return `<div class="flag ${f.severity}"><span class="sev">${f.severity}</span> <b>${esc(f.flag.replace(/_/g, ' '))}</b> · ${esc(f.reason)}
      ${f.source ? ' · ' + srcLink(f.source, 'source') : ''}
      <button class="q" data-ask="${esc(flagTarget(f))}">annotate / ask</button>
      ${notes.map((n) => `<div class="ann">GP note: ${esc(n.text)}</div>`).join('')}</div>`;
  }).join('') || '<p class="muted">No flags.</p>';
  const claims = c.claims.length ? `<table><tr><th>Claim</th><th>Check</th><th>Verdict</th><th>Evidence</th></tr>` + c.claims.map((k) => `<tr>
      <td>"${srcLink(k.source, k.claim)}"</td><td>${esc(k.check)}</td>
      <td class="verdict-${k.verdict}">${esc(k.verdict)}</td><td>${srcLink(k.evidence_source, k.evidence)}</td></tr>`).join('') + '</table>' : '<p class="muted">No claims checked this quarter.</p>';
  const m = c.mark || {};
  const markNotes = ann.filter((a) => a.target === 'mark');
  const reason = m.reason ? esc(m.reason) : (markNotes.length ? 'GP: ' + esc(markNotes.at(-1).text) : '<span class="unexplained">UNEXPLAINED — GP annotation required</span>');
  const qs = S.questions.filter((q) => q.company_id === c.company_id);
  const ap = approvalFor(c.company_id);
  const blocking = unannotatedRed(c);

  $('#card').innerHTML = `<h2>${esc(c.company)}</h2><div class="fw">${fw} · update ${esc(c.update_status)}</div>
    <h3>Metrics vs. agreed targets</h3>
    <table><tr><th>Metric</th><th>Q3</th><th>Q2</th><th>Δ</th><th>Target</th><th>Status</th><th>Verified</th><th></th></tr>${rows}</table>
    <h3>Flags</h3>${flags}
    <h3>Claims checked against systems</h3>${claims}
    <h3>Mark</h3><div class="mark">${money(m.q2_usd)} → ${money(m.q3_usd)} <span class="muted">(${pct(m.change_pct)}, ${esc(m.method_q3)})</span><br>${reason}
      ${m.reason ? '' : '<button class="q" data-ask="mark">annotate mark</button>'}</div>
    <div id="akta"></div>
    <h3>GP annotations</h3>${ann.length ? '<ul class="notes">' + ann.map((a) => `<li><span class="muted">${esc(a.target || '')} · ${new Date(a.ts).toLocaleString()}</span><br>${esc(a.text)}</li>`).join('') + '</ul>' : '<p class="muted">None yet. Select any text to annotate.</p>'}
    <h3>Open questions</h3>${qs.length ? '<ul class="notes">' + qs.map((q) => `<li><span class="muted">to ${esc(q.to)} · ${esc(q.target || '')} · ${q.routing?.routed ? 'routed' : 'not yet routed'}</span><br>${esc(q.question)}</li>`).join('') + '</ul>' : '<p class="muted">None.</p>'}
    <div class="approve">${ap
      ? `<span class="approved">✓ Approved by ${esc(ap.approver)} · ${new Date(ap.ts).toLocaleString()}</span>`
      : `<button id="approve-btn" ${blocking.length ? 'disabled' : ''}>Approve company</button>
         ${blocking.length ? `<div class="why">Blocked: ${blocking.length} red flag${blocking.length > 1 ? 's' : ''} without a GP annotation (${blocking.map((f) => esc(f.flag.replace(/_/g, ' '))).join(', ')}).</div>` : '<span class="muted"> Approved companies go into the LP letter.</span>'}`}</div>`;
  renderAkta(c);
}

async function renderAkta(c) {
  if (c.company_id !== 'C07') return;
  let d;
  try { d = await api('/api/akta'); } catch { return; }
  if (!d || d.available === false || selected !== c.company_id) return;
  const comps = d.comps || d.companies || (Array.isArray(d) ? d : []);
  if (!comps.length) return;
  const tiers = (t) => (t ? `${t[1]} / ${t[2]} / ${t[3]}` : '');
  const fw = (f) => (f ? `${esc(f.date.slice(0, 7))}: ${f.pre ?? '–'} → ${f.post ?? '–'}` : 'no round in window');
  const top = (d.top_tier1_launches || []).map((l) => `<li><b>${esc(l.company)}</b> · ${esc(l.date)} · ${esc(l.event_key || l.title)} — ${esc(l.why_differentiated)} <span class="cap">(${(l.reports || [l.source]).map((s) => s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.akta_news_id ? 'Akta news ' + s.akta_news_id : 'source')}</a>` : 'Akta signal').join(', ')})</span></li>`).join('');
  $('#akta').innerHTML = `<div class="akta"><h3>Market context: product velocity of real competitors (Akta)</h3><table><tr><th>Company</th><th>Stage</th><th>Total funding</th><th>Headcount</th><th>Launches T1/T2/T3</th><th>Velocity /90d</th><th>vs median</th><th>Pre → post latest round</th><th>Akta id</th></tr>` +
    comps.map((x) => `<tr><td>${esc(x.name || x.company)}</td><td>${esc(x.last_round || '')}</td><td>${typeof x.amount === 'number' ? money(x.amount) : esc(x.amount || '')}</td><td>${esc(x.headcount ?? '')}</td><td>${tiers(x.tiers)}</td><td>${esc(x.launch_velocity ?? '')}</td><td>${esc(x.vs_median ?? '')}×</td><td>${fw(x.funding_window)}</td><td>${esc(x.akta_id || '')}</td></tr>`).join('') +
    `</table>${top ? `<h4>Most differentiated tier-1 launches (last 12 months)</h4><ul>${top}</ul>` : ''}<div class="cap">REAL companies, akta.pro data · T1 new product line/clearance, T2 major capability, T3 minor · velocity = weighted launches per 90 days (T1=3, T2=2, T3=1) · funding dates month-level, partial view · Gantrell itself is synthetic</div></div>`;
}

// ---------- right: source view ----------
async function showSource(src, pane = $('#source')) {
  if (!src) return;
  if (src.kind === 'founder_text') {
    pane.innerHTML = '<p class="muted">Loading…</p>';
    try {
      const d = await api(`/api/source?file=${encodeURIComponent(src.file)}&start=${src.span[0]}&end=${src.span[1]}`);
      const t = d.text;
      pane.innerHTML = `<div class="src-file">Source: data-pack/${esc(d.file)} · chars ${d.start}–${d.end}</div>
        <pre class="src">${esc(t.slice(0, d.start))}<mark id="hl">${esc(t.slice(d.start, d.end))}</mark>${esc(t.slice(d.end))}</pre>
        ${t.slice(d.start, d.end) === src.quote ? '<div class="green" style="font-size:12px">✓ quote string-matches the founder text</div>' : `<div class="red" style="font-size:12px">⚠ span text does not match quote "${esc(src.quote)}"</div>`}`;
      $('#hl', pane)?.scrollIntoView({ block: 'center' });
    } catch (e) { pane.innerHTML = `<p class="red">Could not load ${esc(src.file)}: ${esc(e.message)}</p>`; }
  } else if (src.kind === 'system') {
    try {
      const d = await api(`/api/source?file=${encodeURIComponent(src.file)}&rows=${encodeURIComponent((src.row_ids || []).join(','))}`);
      pane.innerHTML = `<div class="src-file">Source: data-pack/${esc(d.file)}${src.formula ? ' · ' + esc(src.formula) : ''}</div>
        ${d.note ? `<div class="amber" style="font-size:12px;margin-bottom:6px">${esc(d.note)}</div>` : ''}
        <table class="csv"><tr>${d.header.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${d.rows.map((r) => `<tr class="${r.highlight ? 'hl' : ''}">${r.cells.map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>`;
      pane.querySelector('tr.hl')?.scrollIntoView({ block: 'center' });
    } catch (e) {
      pane.innerHTML = `<div class="src-file">Source: data-pack/${esc(src.file)}</div><p class="amber">System export not available yet (${esc(e.message)}). Rows: ${esc((src.row_ids || []).join(', '))}${src.formula ? '<br>Formula: ' + esc(src.formula) : ''}</p>`;
    }
  }
}

// ---------- highlight-and-ask popover ----------
const pop = $('#pop');
let popCtx = null;
function openPop(x, y, ctx) {
  popCtx = ctx;
  $('.pop-target', pop).textContent = ctx.label;
  $('textarea', pop).value = '';
  pop.style.left = Math.min(x, window.innerWidth - 360) + 'px';
  pop.style.top = y + 8 + 'px';
  pop.classList.remove('hidden');
  $('textarea', pop).focus();
}
pop.addEventListener('click', async (e) => {
  const act = e.target.dataset.act;
  if (!act) return;
  if (act === 'close') return pop.classList.add('hidden');
  const text = $('textarea', pop).value.trim();
  if (!text) return $('textarea', pop).focus();
  try {
    if (act === 'annotate') await api('/api/annotate', { company_id: popCtx.company_id, target: popCtx.target, text });
    else await api('/api/ask', { company_id: popCtx.company_id, target: popCtx.target, question: text, to: act });
  } catch (err) { return alert('Save failed: ' + err.message); }
  pop.classList.add('hidden');
  await refreshState();
  renderSegments(); renderCard();
});
document.addEventListener('mouseup', (e) => {
  if (pop.contains(e.target) || !selected) return;
  const sel = window.getSelection();
  const t = sel && sel.toString().trim();
  if (!t || t.length < 2) return;
  const inCard = e.target.closest('#card'), inSrc = e.target.closest('#source');
  if (!inCard && !inSrc) return;
  const file = inSrc ? $('.src-file', $('#source'))?.textContent.replace(/^Source: /, '').split(' · ')[0] : null;
  const quote = t.slice(0, 200);
  openPop(e.pageX, e.pageY, { company_id: selected, target: file ? `text:${file}:"${quote}"` : `text:"${quote}"`, label: `"${quote}"` });
});

// ---------- LP letter (deterministic template, approved companies only) ----------
function renderLetter() {
  sources.length = 0;
  const f = L.fund;
  const metric = (c, k) => c.metrics.find((m) => m.key === k);
  const num = (m) => (m && m.value != null ? srcLink(m.source, fmt(m.value, m.unit)) : null);
  const paras = L.segments.map((s) => {
    const cos = s.company_ids.map(company).filter(Boolean);
    const approved = cos.filter((c) => approvalFor(c.company_id));
    const pending = cos.filter((c) => !approvalFor(c.company_id));
    const lines = approved.map((c) => {
      const parts = [];
      const rev = metric(c, 'monthly_revenue');
      if (rev && rev.value != null) parts.push(`monthly revenue ${num(rev)}${rev.delta_pct != null ? ` (${pct(rev.delta_pct)} vs. Q2)` : ''}`);
      const cust = metric(c, 'customers'); if (cust && cust.value != null) parts.push(`${num(cust)} customers`);
      const run = metric(c, 'runway_months'); if (run && run.value != null) parts.push(`runway ${num(run)}`);
      const mk = c.mark;
      const mkTxt = mk ? `; carried at ${money(mk.q3_usd)} (Q2 ${money(mk.q2_usd)}, ${esc(mk.method_q3)})` : '';
      const reds = redFlags(c).map((fl) => {
        const n = annsFor(c.company_id).filter((a) => a.target === flagTarget(fl)).at(-1);
        return `${esc(fl.flag.replace(/_/g, ' '))}${n ? ': ' + esc(n.text) : ''}`;
      });
      return `<li><b>${esc(c.company)}</b>: ${parts.join(', ') || 'no numbers reported'}${mkTxt}.${reds.length ? ' GP notes: ' + reds.join('; ') + '.' : ''}</li>`;
    });
    return `<h3>${esc(s.segment)}</h3>${lines.length ? '<ul>' + lines.join('') + '</ul>' : ''}
      ${pending.length ? `<p class="pending">Pending GP review: ${pending.map((c) => esc(c.company)).join(', ')}.</p>` : ''}`;
  }).join('');
  const fundAp = approvalFor('fund');
  $('#letter-body').innerHTML = `<h2>Halyard Ventures Fund I · Q3 2026 LP update</h2>
    <p class="muted">${L.synthetic ? 'SYNTHETIC fund data. ' : ''}Every number links to its source.</p>
    <p>Fund NAV was ${money(f.nav_usd)} at quarter end (Q2 ${money(f.prior?.nav_usd)}), TVPI ${f.tvpi}x, DPI ${f.dpi}x, net IRR ${f.net_irr}%. These figures are computed from the capital account, not generated.</p>
    ${paras}
    <p class="muted">${fundAp ? `Letter approved by ${esc(fundAp.approver)} · ${new Date(fundAp.ts).toLocaleString()}` : 'Letter not yet approved.'}</p>`;
}

// ---------- events ----------
document.addEventListener('click', async (e) => {
  const row = e.target.closest('[data-co]');
  if (row) { selected = row.dataset.co; renderSegments(); renderCard(); $('#source').innerHTML = '<p class="muted">Click any number to see where it came from.</p>'; return; }
  const v = e.target.closest('[data-src]');
  if (v) { const inLetter = !!e.target.closest('#letter'); return showSource(sources[+v.dataset.src], inLetter ? $('#letter-source') : $('#source')); }
  const q = e.target.closest('[data-ask]');
  if (q) { const r = q.getBoundingClientRect(); return openPop(r.left + window.scrollX, r.bottom + window.scrollY, { company_id: selected, target: q.dataset.ask, label: q.dataset.ask }); }
  if (e.target.id === 'approve-btn') {
    const c = company(selected);
    if (unannotatedRed(c).length) return; // gate re-checked on click, not just via disabled attribute
    const approver = prompt('Approver name', 'GP');
    if (!approver) return;
    await api('/api/approve', { company_id: selected, approver });
    await refreshState(); renderSegments(); renderCard();
    return;
  }
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('active', b === tab));
    $('#review').classList.toggle('hidden', tab.dataset.tab !== 'review');
    $('#letter').classList.toggle('hidden', tab.dataset.tab !== 'letter');
    if (tab.dataset.tab === 'letter') renderLetter(); else renderCard();
  }
});

// ---------- boot ----------
(async function boot() {
  [L] = await Promise.all([api('/api/ledger'), refreshState()]);
  renderFund();
  const firstRed = [...L.companies].sort((a, b) => redFlags(b).length - redFlags(a).length)[0];
  selected = firstRed?.company_id;
  renderSegments(); renderCard();
})();
