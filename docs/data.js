// data.js — All Northwind data extracted from SQL queries

const NW = {

  // ─── Overview KPIs ───────────────────────────────────────────
  kpis: {
    totalRevenue: 1265793,
    totalOrders: 830,
    shippedOrders: 809,
    pendingOrders: 21,
    customers: 89,
    activeCustomers: 89,
    repeatCustomers: 88,
    avgOrderValue: 1525,
    avgDaysToShip: 8.49,
    totalFreight: 64942.69,
    freightPct: 5.1,
    lateOrders: 37,
    latePct: 4.6,
    discountGiven: 88665.55,
    salesBeforeDiscount: 1354458.59,
    discountPct: 6.5,
  },

  // ─── Monthly Revenue (Jul 1996 – May 1998) ───────────────────
  monthly: [
    { year:1996, month:7,  label:'Jul 96', revenue:27861,  orders:22 },
    { year:1996, month:8,  label:'Aug 96', revenue:25485,  orders:25 },
    { year:1996, month:9,  label:'Sep 96', revenue:26382,  orders:23 },
    { year:1996, month:10, label:'Oct 96', revenue:37516,  orders:26 },
    { year:1996, month:11, label:'Nov 96', revenue:45600,  orders:25 },
    { year:1996, month:12, label:'Dec 96', revenue:45240,  orders:31 },
    { year:1997, month:1,  label:'Jan 97', revenue:61259,  orders:33 },
    { year:1997, month:2,  label:'Feb 97', revenue:38484,  orders:29 },
    { year:1997, month:3,  label:'Mar 97', revenue:38547,  orders:30 },
    { year:1997, month:4,  label:'Apr 97', revenue:53033,  orders:31 },
    { year:1997, month:5,  label:'May 97', revenue:53781,  orders:32 },
    { year:1997, month:6,  label:'Jun 97', revenue:36362,  orders:30 },
    { year:1997, month:7,  label:'Jul 97', revenue:51020,  orders:33 },
    { year:1997, month:8,  label:'Aug 97', revenue:47288,  orders:33 },
    { year:1997, month:9,  label:'Sep 97', revenue:55954,  orders:37 },
    { year:1997, month:10, label:'Oct 97', revenue:66749,  orders:38 },
    { year:1997, month:11, label:'Nov 97', revenue:43534,  orders:34 },
    { year:1997, month:12, label:'Dec 97', revenue:71398,  orders:48 },
    { year:1998, month:1,  label:'Jan 98', revenue:94223,  orders:55 },
    { year:1998, month:2,  label:'Feb 98', revenue:99415,  orders:54 },
    { year:1998, month:3,  label:'Mar 98', revenue:104855, orders:73 },
    { year:1998, month:4,  label:'Apr 98', revenue:123799, orders:74 },
    { year:1998, month:5,  label:'May 98', revenue:18332,  orders:14 },
  ],

  // ─── Yearly Summary ──────────────────────────────────────────
  yearly: [
    { year: 1996, orders: 152, revenue: 208084, avgOrderValue: 1369 },
    { year: 1997, orders: 408, revenue: 617085, avgOrderValue: 1512 },
    { year: 1998, orders: 270, revenue: 440624, avgOrderValue: 1632 },
  ],

  // ─── Jan-Apr Comparison ──────────────────────────────────────
  janApr: [
    { year: 1997, orders: 123, revenue: 191323 },
    { year: 1998, orders: 256, revenue: 422292 },
  ],

  // ─── Revenue by Category ─────────────────────────────────────
  categories: [
    { name: 'Beverages',       revenue: 267868, share: 21.2 },
    { name: 'Dairy Products',  revenue: 234507, share: 18.5 },
    { name: 'Confections',     revenue: 167358, share: 13.2 },
    { name: 'Meat/Poultry',    revenue: 163023, share: 12.9 },
    { name: 'Seafood',         revenue: 131262, share: 10.4 },
    { name: 'Produce',         revenue: 99985,  share:  7.9 },
    { name: 'Special Items',   revenue: 141624, share: 11.2 },
    { name: 'Condiments',      revenue: 106166, share:  8.4 },
  ],

  // ─── Top 10 Products ─────────────────────────────────────────
  topProducts: [
    { rank:1,  name: 'Côte de Blaye',          revenue: 141396, units: 623  },
    { rank:2,  name: 'Thüringer Rostbratwurst', revenue:  80369, units: 746  },
    { rank:3,  name: 'Raclette Courdavault',    revenue:  71155, units: 1496 },
    { rank:4,  name: 'Camembert Pierrot',       revenue:  46825, units: 1577 },
    { rank:5,  name: 'Manjimup Dried Apples',   revenue:  41819, units:  895 },
    { rank:6,  name: 'Alice Mutton',            revenue:  32698, units:  978 },
    { rank:7,  name: 'Carnarvon Tigers',        revenue:  29171, units:  429 },
    { rank:8,  name: 'Rössle Sauerkraut',       revenue:  25696, units:  701 },
    { rank:9,  name: 'Perth Pasties',           revenue:  23002, units: 1137 },
    { rank:10, name: 'Flotemysost',             revenue:  19000, units: 1063 },
  ],

  // ─── Revenue by Country ──────────────────────────────────────
  countries: [
    { country: 'USA',         orders: 122, revenue: 245585 },
    { country: 'Germany',     orders: 122, revenue: 230285 },
    { country: 'Austria',     orders:  40, revenue: 128004 },
    { country: 'Brazil',      orders:  83, revenue: 106925 },
    { country: 'France',      orders:  77, revenue:  77933 },
    { country: 'UK',          orders:  56, revenue:  57931 },
    { country: 'Sweden',      orders:  37, revenue:  55380 },
    { country: 'Ireland',     orders:  19, revenue:  47287 },
    { country: 'Switzerland', orders:  18, revenue:  42618 },
    { country: 'Venezuela',   orders:  46, revenue:  40228 },
    { country: 'Canada',      orders:  30, revenue:  32856 },
    { country: 'Denmark',     orders:  18, revenue:  31445 },
    { country: 'Belgium',     orders:  18, revenue:  29800 },
    { country: 'Finland',     orders:  22, revenue:  22449 },
    { country: 'Portugal',    orders:  29, revenue:  20620 },
    { country: 'Spain',       orders:  23, revenue:  18980 },
    { country: 'Norway',      orders:   5, revenue:   5735 },
    { country: 'Poland',      orders:   7, revenue:   7004 },
    { country: 'Argentina',   orders:  16, revenue:   7650 },
    { country: 'Italy',       orders:  28, revenue:  16950 },
    { country: 'Mexico',      orders:  28, revenue:  22076 },
  ],

  // ─── Top 10 Customers ────────────────────────────────────────
  topCustomers: [
    { rank:1,  company: 'QUICK-Stop',               country: 'Germany',    revenue: 110277, share: 8.7 },
    { rank:2,  company: 'Ernst Handel',              country: 'Austria',    revenue: 104875, share: 8.3 },
    { rank:3,  company: 'Save-a-lot Markets',        country: 'USA',        revenue:  71438, share: 5.6 },
    { rank:4,  company: 'Rattlesnake Canyon Grocery',country: 'USA',        revenue:  51098, share: 4.0 },
    { rank:5,  company: 'Hanari Carnes',             country: 'Brazil',     revenue:  34101, share: 2.7 },
    { rank:6,  company: 'Hungry Owl All-Night Groc.',country: 'Ireland',    revenue:  49979, share: 3.9 },
    { rank:7,  company: 'Folies gourmandes',         country: 'France',     revenue:  32556, share: 2.6 },
    { rank:8,  company: 'Bottom-Dollar Markets',     country: 'Canada',     revenue:  20221, share: 1.6 },
    { rank:9,  company: 'Simons bistro',             country: 'Denmark',    revenue:  19604, share: 1.5 },
    { rank:10, company: 'Berglunds snabbköp',        country: 'Sweden',     revenue:  25765, share: 2.0 },
  ],

  // ─── Shippers ────────────────────────────────────────────────
  shippers: [
    { name: 'Federal Shipping', shipped: 249, late: 9,  latePct: 3.6, avgFreight: 68.03 },
    { name: 'Speedy Express',   shipped: 245, late: 12, latePct: 4.9, avgFreight: 66.27 },
    { name: 'United Package',   shipped: 315, late: 16, latePct: 5.1, avgFreight: 86.53 },
  ],

  // ─── Employees ───────────────────────────────────────────────
  employees: [
    { name: 'Margaret Peacock',  shipped: 156, late: 10, latePct: 6.4 },
    { name: 'Janet Leverling',   shipped: 127, late:  7, latePct: 5.5 },
    { name: 'Nancy Davolio',     shipped: 123, late:  5, latePct: 4.1 },
    { name: 'Robert King',       shipped:  72, late:  5, latePct: 6.9 },
    { name: 'Andrew Fuller',     shipped:  96, late:  4, latePct: 4.2 },
    { name: 'Michael Suyama',    shipped:  67, late:  3, latePct: 4.5 },
    { name: 'Laura Callahan',    shipped:  104,late:  3, latePct: 2.9 },
    { name: 'Steven Buchanan',   shipped:  42, late:  0, latePct: 0.0 },
    { name: 'Anne Dodsworth',    shipped:  22, late:  0, latePct: 0.0 },
  ],

  // ─── Discounts ───────────────────────────────────────────────
  discounts: [
    { discount: 0.00, orderLines: 1317, avgQty: 21.7 },
    { discount: 0.05, orderLines:  185, avgQty: 25.9 },
    { discount: 0.10, orderLines:  173, avgQty: 27.1 },
    { discount: 0.15, orderLines:  157, avgQty: 28.0 },
    { discount: 0.20, orderLines:  161, avgQty: 27.8 },
    { discount: 0.25, orderLines:  154, avgQty: 27.6 },
  ],
};
