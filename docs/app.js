// app.js — Windfall Dashboard Logic

/* ══════════════════════════════════════
   Chart.js global defaults
══════════════════════════════════════ */
Chart.defaults.color = '#8b949e';
Chart.defaults.borderColor = 'rgba(255,255,255,0.07)';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(22,27,34,0.95)';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.titleColor = '#e6edf3';
Chart.defaults.plugins.tooltip.bodyColor = '#8b949e';
Chart.defaults.plugins.tooltip.cornerRadius = 8;

/* ══════════════════════════════════════
   Color palette
══════════════════════════════════════ */
const C = {
  orange:  '#f97316',
  teal:    '#14b8a6',
  blue:    '#6366f1',
  purple:  '#a855f7',
  red:     '#ef4444',
  green:   '#22c55e',
  yellow:  '#eab308',
  pink:    '#ec4899',
  sky:     '#0ea5e9',
  lime:    '#84cc16',
};

const PALETTE = [C.orange, C.teal, C.blue, C.purple, C.red, C.green, C.yellow, C.pink, C.sky, C.lime];

function alpha(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function grad(ctx, color) {
  const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  g.addColorStop(0, alpha(color, 0.35));
  g.addColorStop(1, alpha(color, 0.01));
  return g;
}

/* ══════════════════════════════════════
   Navigation
══════════════════════════════════════ */
const pageTitles = {
  overview:  'Overview Dashboard',
  revenue:   'Revenue & Trends',
  products:  'Products & Categories',
  customers: 'Customers & Geo',
  shipping:  'Shipping & Logistics',
  inventory: 'Inventory & Discounts',
};

function showPage(id) {
  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('nav-' + id).classList.add('active');

  // Update title
  document.getElementById('pageTitle').textContent = pageTitles[id];

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
  }

  // Init charts for this page lazily
  initPage(id);

  return false;
}

// Track which pages have been initialised
const initialised = {};

function initPage(id) {
  if (initialised[id]) return;
  initialised[id] = true;

  switch(id) {
    case 'overview':  initOverview();  break;
    case 'revenue':   initRevenue();   break;
    case 'products':  initProducts();  break;
    case 'customers': initCustomers(); break;
    case 'shipping':  initShipping();  break;
    case 'inventory': initInventory(); break;
  }
}

/* ══════════════════════════════════════
   Sidebar / hamburger
══════════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
});
document.getElementById('sidebarClose').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
});
document.getElementById('overlay').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
});

/* ══════════════════════════════════════
   Utility: format numbers
══════════════════════════════════════ */
function fmt$(n) {
  return '$' + Math.round(n).toLocaleString();
}
function fmtN(n) {
  return Math.round(n).toLocaleString();
}

/* ══════════════════════════════════════
   OVERVIEW PAGE
══════════════════════════════════════ */
function initOverview() {
  // Sparklines
  const sparkData = {
    revenue:   [27861,25485,26382,37516,45600,45240,61259,38484,38547,53033],
    orders:    [22,25,23,26,25,31,33,29,30,31,32,30,33,33,37,38,34,48,55,54,73,74,14],
    customers: [12,15,13,15,18,20,20,22,19,23,25,24,26,27,29,30,28,35,36,38,40,42,15],
    aov:       [1267,1019,1147,1443,1824,1459,1856,1327,1285,1711,1681,1212,1546,1433,1512,1757,1280,1487,1713,1841,1436,1673,1309],
  };

  function sparkLine(id, data, color) {
    new Chart(document.getElementById(id), {
      type: 'line',
      data: {
        labels: data.map((_,i) => i),
        datasets: [{ data, borderColor: color, borderWidth: 2, pointRadius: 0, tension: 0.4, fill: false }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 800 },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  }

  sparkLine('spark-revenue',   sparkData.revenue,   C.orange);
  sparkLine('spark-orders',    sparkData.orders,    C.teal);
  sparkLine('spark-customers', sparkData.customers, C.blue);
  sparkLine('spark-aov',       sparkData.aov,       C.purple);

  // Monthly trend chart
  const monthly = NW.monthly;
  const ctx = document.getElementById('chart-monthly').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthly.map(d => d.label),
      datasets: [{
        label: 'Revenue ($)',
        data: monthly.map(d => d.revenue),
        borderColor: C.orange,
        backgroundColor: grad(ctx, C.orange),
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: C.orange,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + fmt$(c.raw) } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
      },
    },
  });

  // Yearly bar chart
  const yearly = NW.yearly;
  new Chart(document.getElementById('chart-yearly'), {
    type: 'bar',
    data: {
      labels: yearly.map(d => d.year),
      datasets: [{
        label: 'Revenue',
        data: yearly.map(d => d.revenue),
        backgroundColor: [alpha(C.orange,0.7), alpha(C.teal,0.7), alpha(C.blue,0.7)],
        borderColor: [C.orange, C.teal, C.blue],
        borderWidth: 1.5,
        borderRadius: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + fmt$(c.raw) } } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
      },
    },
  });
}

/* ══════════════════════════════════════
   REVENUE PAGE
══════════════════════════════════════ */
function initRevenue() {
  const monthly = NW.monthly;

  // Full monthly bar+line combo
  const ctx = document.getElementById('chart-revenue-monthly').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthly.map(d => d.label),
      datasets: [
        {
          type: 'bar',
          label: 'Revenue ($)',
          data: monthly.map(d => d.revenue),
          backgroundColor: monthly.map(d => d.year === 1996 ? alpha(C.orange,0.5) : d.year === 1997 ? alpha(C.teal,0.5) : alpha(C.blue,0.5)),
          borderColor:     monthly.map(d => d.year === 1996 ? C.orange : d.year === 1997 ? C.teal : C.blue),
          borderWidth: 1,
          borderRadius: 5,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Orders',
          data: monthly.map(d => d.orders),
          borderColor: C.yellow,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: C.yellow,
          tension: 0.4,
          fill: false,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { position: 'top', labels: { padding: 16 } },
        tooltip: {
          callbacks: {
            label: c => c.datasetIndex === 0
              ? ' Revenue: ' + fmt$(c.raw)
              : ' Orders: ' + c.raw,
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 45, font: { size: 10 } } },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' },
          title: { display: true, text: 'Revenue ($)', color: '#8b949e', font: { size: 11 } },
        },
        y1: {
          position: 'right',
          grid: { display: false },
          title: { display: true, text: 'Orders', color: '#8b949e', font: { size: 11 } },
        },
      },
    },
  });

  // Jan-Apr comparison
  const janApr = NW.janApr;
  new Chart(document.getElementById('chart-jan-apr'), {
    type: 'bar',
    data: {
      labels: janApr.map(d => 'Jan–Apr ' + d.year),
      datasets: [{
        label: 'Revenue (Jan–Apr)',
        data: janApr.map(d => d.revenue),
        backgroundColor: [alpha(C.teal,0.6), alpha(C.blue,0.6)],
        borderColor: [C.teal, C.blue],
        borderWidth: 1.5,
        borderRadius: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + fmt$(c.raw) } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
      },
    },
  });
}

/* ══════════════════════════════════════
   PRODUCTS PAGE
══════════════════════════════════════ */
function initProducts() {
  const cats = NW.categories.sort((a,b) => b.revenue - a.revenue);

  // Donut chart
  new Chart(document.getElementById('chart-categories'), {
    type: 'doughnut',
    data: {
      labels: cats.map(c => c.name),
      datasets: [{
        data: cats.map(c => c.revenue),
        backgroundColor: PALETTE.map(c => alpha(c, 0.8)),
        borderColor: PALETTE,
        borderWidth: 1.5,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      animation: { animateRotate: true, duration: 900 },
      plugins: {
        legend: { position: 'right', labels: { font: { size: 11 }, padding: 10 } },
        tooltip: { callbacks: { label: c => ` ${c.label}: ${fmt$(c.raw)} (${cats[c.dataIndex].share}%)` } },
      },
    },
  });

  // Horizontal bar chart
  new Chart(document.getElementById('chart-categories-bar'), {
    type: 'bar',
    data: {
      labels: cats.map(c => c.name),
      datasets: [{
        label: 'Revenue ($)',
        data: cats.map(c => c.revenue),
        backgroundColor: PALETTE.map(c => alpha(c, 0.7)),
        borderColor: PALETTE,
        borderWidth: 1.5,
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + fmt$(c.raw) + ' (' + cats[c.dataIndex].share + '%)' } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
        y: { grid: { display: false }, ticks: { font: { size: 12 } } },
      },
    },
  });

  // Top 10 products table
  const tbody = document.getElementById('top-products-body');
  const maxRev = NW.topProducts[0].revenue;
  tbody.innerHTML = NW.topProducts.map(p => `
    <tr>
      <td><span class="badge" style="background:rgba(249,115,22,0.12);color:#f97316">#${p.rank}</span></td>
      <td><strong>${p.name}</strong></td>
      <td class="num">${fmt$(p.revenue)}</td>
      <td class="num">${fmtN(p.units)}</td>
      <td>
        <div class="rev-bar-wrap">
          <div class="rev-bar" style="width:${Math.round((p.revenue/maxRev)*100)}%"></div>
          <span style="font-size:11px;color:var(--text-muted)">${Math.round((p.revenue/maxRev)*100)}%</span>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ══════════════════════════════════════
   CUSTOMERS PAGE
══════════════════════════════════════ */
function initCustomers() {
  const top15 = NW.countries.slice(0, 15);

  // Horizontal country bar
  new Chart(document.getElementById('chart-countries'), {
    type: 'bar',
    data: {
      labels: top15.map(c => c.country),
      datasets: [{
        label: 'Revenue ($)',
        data: top15.map(c => c.revenue),
        backgroundColor: top15.map((_,i) => alpha(PALETTE[i % PALETTE.length], 0.7)),
        borderColor:     top15.map((_,i) => PALETTE[i % PALETTE.length]),
        borderWidth: 1.5,
        borderRadius: 6,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + fmt$(c.raw) + ' · ' + top15[c.dataIndex].orders + ' orders' } },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v/1000).toFixed(0) + 'k' } },
        y: { grid: { display: false } },
      },
    },
  });

  // Loyalty donut
  new Chart(document.getElementById('chart-loyalty'), {
    type: 'doughnut',
    data: {
      labels: ['Repeat Customers', 'One-Time Customers', 'Never Ordered'],
      datasets: [{
        data: [88, 1, 2],
        backgroundColor: [alpha(C.green,0.75), alpha(C.yellow,0.75), alpha(C.red,0.75)],
        borderColor: [C.green, C.yellow, C.red],
        borderWidth: 1.5,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      animation: { duration: 900 },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
        tooltip: { callbacks: { label: c => ` ${c.label}: ${c.raw}` } },
      },
    },
  });

  // Top customers table
  const tbody = document.getElementById('top-customers-body');
  tbody.innerHTML = NW.topCustomers.map(c => `
    <tr>
      <td><span class="badge" style="background:rgba(20,184,166,0.12);color:#14b8a6">#${c.rank}</span></td>
      <td><strong>${c.company}</strong></td>
      <td><span class="badge" style="background:rgba(255,255,255,0.06);color:#8b949e">${c.country}</span></td>
      <td class="num">${fmt$(c.revenue)}</td>
      <td><span class="share-pill">${c.share}%</span></td>
    </tr>
  `).join('');
}

/* ══════════════════════════════════════
   SHIPPING PAGE
══════════════════════════════════════ */
function initShipping() {
  const shippers = NW.shippers;

  // Shippers radar/bar
  new Chart(document.getElementById('chart-shippers'), {
    type: 'bar',
    data: {
      labels: shippers.map(s => s.name),
      datasets: [
        {
          label: 'Shipped Orders',
          data: shippers.map(s => s.shipped),
          backgroundColor: [alpha(C.green,0.65), alpha(C.yellow,0.65), alpha(C.red,0.65)],
          borderColor: [C.green, C.yellow, C.red],
          borderWidth: 1.5,
          borderRadius: 6,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Late Rate (%)',
          data: shippers.map(s => s.latePct),
          borderColor: C.orange,
          backgroundColor: alpha(C.orange,0.1),
          borderWidth: 2.5,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: C.orange,
          fill: false,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 800 },
      plugins: { legend: { position: 'top', labels: { padding: 12 } } },
      scales: {
        x: { grid: { display: false } },
        y:  { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Orders', color: '#8b949e' } },
        y1: { position: 'right', grid: { display: false }, ticks: { callback: v => v + '%' }, title: { display: true, text: 'Late %', color: '#8b949e' } },
      },
    },
  });

  // Employee bar
  const emp = NW.employees.filter(e => e.shipped > 0);
  new Chart(document.getElementById('chart-employees'), {
    type: 'bar',
    data: {
      labels: emp.map(e => e.name.split(' ')[0]),
      datasets: [
        {
          label: 'Shipped',
          data: emp.map(e => e.shipped),
          backgroundColor: alpha(C.teal, 0.6),
          borderColor: C.teal,
          borderWidth: 1,
          borderRadius: 5,
          yAxisID: 'y',
        },
        {
          label: 'Late',
          data: emp.map(e => e.late),
          backgroundColor: alpha(C.red, 0.7),
          borderColor: C.red,
          borderWidth: 1,
          borderRadius: 5,
          yAxisID: 'y',
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 800 },
      plugins: {
        legend: { position: 'top', labels: { padding: 12 } },
        tooltip: { callbacks: { afterLabel: (c) => c.datasetIndex === 1 ? ` Late rate: ${emp[c.dataIndex].latePct}%` : '' } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' } },
      },
    },
  });
}

/* ══════════════════════════════════════
   INVENTORY PAGE
══════════════════════════════════════ */
function initInventory() {
  const disc = NW.discounts;

  // Discount vs qty line
  new Chart(document.getElementById('chart-discounts'), {
    type: 'line',
    data: {
      labels: disc.map(d => (d.discount * 100) + '%'),
      datasets: [{
        label: 'Avg Quantity Sold',
        data: disc.map(d => d.avgQty),
        borderColor: C.purple,
        backgroundColor: alpha(C.purple, 0.15),
        borderWidth: 2.5,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: disc.map(d => d.discount === 0 ? C.orange : C.purple),
        tension: 0.3,
        fill: true,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          label: c => ` Avg Qty: ${c.raw}`,
          afterBody: () => ['', '⬆ 5%+ discounts show minimal', '   additional quantity gain'],
        }},
        annotation: {},
      },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: 'Discount Level', color: '#8b949e' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Avg Qty per Order Line', color: '#8b949e' }, min: 18 },
      },
    },
  });

  // Discount distribution bars
  new Chart(document.getElementById('chart-discount-dist'), {
    type: 'bar',
    data: {
      labels: disc.map(d => (d.discount * 100) + '%'),
      datasets: [{
        label: 'Order Lines',
        data: disc.map(d => d.orderLines),
        backgroundColor: disc.map(d => d.discount === 0 ? alpha(C.orange,0.7) : alpha(C.blue,0.6)),
        borderColor:     disc.map(d => d.discount === 0 ? C.orange : C.blue),
        borderWidth: 1.5,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 900 },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw} order lines` } } },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: 'Discount Level', color: '#8b949e' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' } },
      },
    },
  });

  // Discount table
  const tbody = document.getElementById('discount-tbody');
  const baseQty = disc[0].avgQty;
  tbody.innerHTML = disc.map(d => {
    const pct = (d.discount * 100);
    const diff = d.avgQty - baseQty;
    const diffStr = diff === 0 ? '—' : (diff > 0 ? '+' + diff.toFixed(1) : diff.toFixed(1));
    const diffColor = diff === 0 ? 'var(--text-muted)' : diff > 0 ? 'var(--accent-green)' : 'var(--accent-red)';
    return `
      <tr>
        <td><strong>${pct}%</strong>${pct === 0 ? ' <span style="color:var(--text-muted);font-size:11px">(No discount)</span>' : ''}</td>
        <td class="num">${fmtN(d.orderLines)}</td>
        <td class="num">${d.avgQty}</td>
        <td style="color:${diffColor};font-weight:600;text-align:right">${diffStr}</td>
      </tr>
    `;
  }).join('');
}

/* ══════════════════════════════════════
   INIT on load
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Show overview by default
  initPage('overview');
});
