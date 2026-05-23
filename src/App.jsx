import { useState, useEffect } from "react";

const ROLES = { ADMIN: "admin", CASHIER: "cashier", WAITER: "waiter", DELIVERY: "delivery" };

const COLORS = {
  primary: "#1a3a2a",
  accent: "#c8a96e",
  accent2: "#e8c98a",
  bg: "#f7f3ec",
  card: "#ffffff",
  muted: "#8a7968",
  danger: "#c0392b",
  success: "#1e7e4a",
  warning: "#d4821a",
  info: "#1a5276",
};

const MENU = [
  { id: 1, name: "Karak Tea", price: 5, cat: "Tea", emoji: "🍵" },
  { id: 2, name: "Mint Tea", price: 6, cat: "Tea", emoji: "🫖" },
  { id: 3, name: "Green Tea", price: 7, cat: "Tea", emoji: "🍃" },
  { id: 4, name: "Masala Chai", price: 8, cat: "Tea", emoji: "☕" },
  { id: 5, name: "Iced Lemon Tea", price: 9, cat: "Cold", emoji: "🧊" },
  { id: 6, name: "Bubble Tea", price: 14, cat: "Cold", emoji: "🧋" },
  { id: 7, name: "Samosa", price: 8, cat: "Snacks", emoji: "🥟" },
  { id: 8, name: "Cheese Toast", price: 12, cat: "Snacks", emoji: "🍞" },
  { id: 9, name: "Club Sandwich", price: 22, cat: "Food", emoji: "🥪" },
  { id: 10, name: "Chicken Wrap", price: 24, cat: "Food", emoji: "🌯" },
  { id: 11, name: "Pasta", price: 28, cat: "Food", emoji: "🍝" },
  { id: 12, name: "Date Cake", price: 18, cat: "Dessert", emoji: "🎂" },
];

const TABLES = [1,2,3,4,5,6,7,8,9,10];

const initialOrders = [
  { id: "ORD-001", type: "dine-in", table: 3, items: [{...MENU[0], qty:2},{...MENU[6], qty:1}], status: "pending", time: "12:30", waiter: "Ali", total: 18 },
  { id: "ORD-002", type: "delivery", address: "Al Sadd, Block 12", items: [{...MENU[5], qty:1},{...MENU[8], qty:2}], status: "preparing", time: "12:45", deliveryBoy: "Hassan", total: 58 },
  { id: "ORD-003", type: "dine-in", table: 1, items: [{...MENU[3], qty:3}], status: "ready", time: "12:50", waiter: "Omar", total: 24 },
  { id: "ORD-004", type: "takeaway", items: [{...MENU[1], qty:2},{...MENU[11], qty:1}], status: "completed", time: "12:10", total: 30 },
];

const initialExpenses = [
  { id: 1, type: "Staff Salaries", amount: 4500, desc: "May salaries - 3 staff", date: "2024-05-01", icon: "👤" },
  { id: 2, type: "Maintenance", amount: 850, desc: "AC servicing", date: "2024-05-05", icon: "🔧" },
  { id: 3, type: "Car Expenses", amount: 320, desc: "Toyota delivery car fuel", date: "2024-05-08", icon: "🚗" },
  { id: 4, type: "Bike Expenses", amount: 180, desc: "Delivery bike repair", date: "2024-05-10", icon: "🏍️" },
  { id: 5, type: "Maintenance", amount: 1200, desc: "Kitchen equipment repair", date: "2024-05-12", icon: "🔧" },
  { id: 6, type: "Staff Salaries", amount: 3200, desc: "Part-time staff", date: "2024-05-15", icon: "👤" },
];

const EXPENSE_TYPES = [
  { label: "Staff Salaries", icon: "👤", color: COLORS.info },
  { label: "Maintenance", icon: "🔧", color: COLORS.warning },
  { label: "Car Expenses", icon: "🚗", color: "#6c3483" },
  { label: "Bike Expenses", icon: "🏍️", color: "#117a65" },
  { label: "Sales", icon: "💰", color: COLORS.success },
  { label: "Other", icon: "📋", color: COLORS.muted },
];

const initialStaff = [
  { id: 1, name: "Ahmed Al-Rashid", role: "Cashier", salary: 2800, phone: "+974 5555 1234", status: "active", paid: true },
  { id: 2, name: "Omar Hassan", role: "Waiter", salary: 1800, phone: "+974 5555 5678", status: "active", paid: false },
  { id: 3, name: "Ali Mohammed", role: "Waiter", salary: 1800, phone: "+974 5555 9012", status: "active", paid: true },
  { id: 4, name: "Hassan Karimi", role: "Delivery", salary: 1600, phone: "+974 5555 3456", status: "active", paid: false },
  { id: 5, name: "Sara Nasser", role: "Kitchen", salary: 2200, phone: "+974 5555 7890", status: "on-leave", paid: true },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  app: { fontFamily: "'Segoe UI', system-ui, sans-serif", background: COLORS.bg, minHeight: "100vh", display: "flex", flexDirection: "column" },
  topBar: {
    background: COLORS.primary,
    color: "#fff",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    flexShrink: 0,
  },
  logo: { fontFamily: "'Georgia', serif", fontSize: 22, letterSpacing: 1, color: COLORS.accent },
  navBar: {
    background: "#fff",
    borderBottom: `2px solid ${COLORS.accent}`,
    display: "flex",
    gap: 0,
    overflowX: "auto",
    flexShrink: 0,
  },
  navBtn: (active) => ({
    padding: "0 1.2rem",
    height: 48,
    border: "none",
    borderBottom: active ? `3px solid ${COLORS.accent}` : "3px solid transparent",
    background: active ? "#fffbf2" : "transparent",
    color: active ? COLORS.primary : COLORS.muted,
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  }),
  main: { flex: 1, padding: "1.5rem", maxWidth: 1100, margin: "0 auto", width: "100%" },
  card: { background: COLORS.card, borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.07)", padding: "1.25rem" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" },
  grid4: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" },
  statCard: (color = COLORS.primary) => ({
    background: COLORS.card,
    borderRadius: 10,
    padding: "1rem 1.25rem",
    borderLeft: `4px solid ${color}`,
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  }),
  statNum: { fontSize: 28, fontWeight: 700, color: COLORS.primary, margin: 0 },
  statLabel: { fontSize: 12, color: COLORS.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  badge: (color, bg) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    background: bg,
    color: color,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  }),
  btn: (variant = "primary") => ({
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    background: variant === "primary" ? COLORS.accent : variant === "danger" ? COLORS.danger : variant === "success" ? COLORS.success : "#eee",
    color: variant === "primary" ? COLORS.primary : "#fff",
    transition: "opacity 0.15s",
  }),
  btnSm: (variant = "primary") => ({
    padding: "5px 12px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    background: variant === "primary" ? COLORS.accent : variant === "danger" ? COLORS.danger : variant === "success" ? COLORS.success : variant === "outline" ? "transparent" : "#eee",
    color: variant === "outline" ? COLORS.primary : variant === "primary" ? COLORS.primary : "#fff",
    border: variant === "outline" ? `1px solid ${COLORS.primary}` : "none",
  }),
  input: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 8,
    border: `1px solid #ddd`,
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 8,
    border: `1px solid #ddd`,
    fontSize: 13,
    background: "#fff",
    outline: "none",
  },
  tag: (color = COLORS.primary) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    background: color + "18",
    color: color,
    border: `1px solid ${color}30`,
  }),
  sectionTitle: { fontSize: 18, fontWeight: 700, color: COLORS.primary, marginBottom: "1rem" },
  roleTag: (role) => {
    const map = { admin: COLORS.danger, cashier: COLORS.info, waiter: COLORS.success, delivery: COLORS.warning };
    return { ...S.badge(map[role.toLowerCase()] || COLORS.muted, (map[role.toLowerCase()] || COLORS.muted) + "18") };
  },
};

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [role, setRole] = useState(ROLES.ADMIN);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const pins = { admin: "1234", cashier: "2222", waiter: "3333", delivery: "4444" };

  function handleLogin() {
    if (pin === pins[role]) { onLogin(role); setError(""); }
    else setError("Incorrect PIN. Try: 1234 / 2222 / 3333 / 4444");
  }

  const roles = [
    { key: ROLES.ADMIN, label: "Admin", icon: "🛡️", desc: "Full access" },
    { key: ROLES.CASHIER, label: "Cashier", icon: "🖥️", desc: "POS & billing" },
    { key: ROLES.WAITER, label: "Waiter", icon: "🍽️", desc: "Orders & tables" },
    { key: ROLES.DELIVERY, label: "Delivery", icon: "🛵", desc: "Delivery orders" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 42, color: COLORS.accent, letterSpacing: 2 }}>☕ Tea Day</div>
        <div style={{ fontSize: 14, color: COLORS.accent2, marginTop: 4, letterSpacing: 3 }}>QATAR · CAFÉ MANAGEMENT</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: "1rem", textAlign: "center" }}>Select your role to continue</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
          {roles.map(r => (
            <div key={r.key} onClick={() => setRole(r.key)} style={{
              padding: "0.85rem",
              borderRadius: 10,
              border: `2px solid ${role === r.key ? COLORS.accent : "#e0d8ce"}`,
              background: role === r.key ? "#fffbf2" : "#fff",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.primary }}>{r.label}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ ...S.input, textAlign: "center", fontSize: 18, letterSpacing: 6 }}
          />
        </div>

        {error && <p style={{ color: COLORS.danger, fontSize: 12, textAlign: "center", marginBottom: "0.5rem" }}>{error}</p>}

        <button onClick={handleLogin} style={{ ...S.btn("primary"), width: "100%", padding: "12px", fontSize: 15 }}>
          Sign In →
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: COLORS.muted, marginTop: "1rem" }}>Demo PINs: Admin 1234 · Cashier 2222 · Waiter 3333 · Delivery 4444</p>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    pending: ["#d4821a", "#fff8ee"],
    preparing: ["#1a5276", "#eaf2fb"],
    ready: ["#117a65", "#e8f8f5"],
    completed: ["#6c757d", "#f1f3f5"],
    cancelled: ["#c0392b", "#fdf0ee"],
    "on-leave": ["#e67e22", "#fef9ee"],
    active: ["#1e7e4a", "#eafbf0"],
  };
  const [color, bg] = map[status] || ["#555", "#f0f0f0"];
  return <span style={S.badge(color, bg)}>{status}</span>;
}

// ─── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order, onStatus, role }) {
  const next = { pending: "preparing", preparing: "ready", ready: "completed" };
  const typeColors = { "dine-in": COLORS.info, "delivery": COLORS.warning, "takeaway": "#6c3483" };

  return (
    <div style={{ ...S.card, borderTop: `3px solid ${typeColors[order.type] || COLORS.muted}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{order.id}</span>
          <span style={{ ...S.tag(typeColors[order.type]), marginLeft: 8 }}>{order.type}</span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>
        {order.type === "dine-in" && <span>🪑 Table {order.table}  ·  Waiter: {order.waiter}</span>}
        {order.type === "delivery" && <span>📍 {order.address}  ·  By: {order.deliveryBoy}</span>}
        {order.type === "takeaway" && <span>🥡 Takeaway</span>}
        <span style={{ marginLeft: 8 }}>⏱ {order.time}</span>
      </div>

      <div style={{ borderTop: "1px solid #f0ece6", paddingTop: 8 }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 3 }}>
            <span>{item.emoji} {item.name} × {item.qty}</span>
            <span style={{ fontWeight: 600 }}>QAR {item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 8, borderTop: "1px solid #f0ece6" }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.primary }}>QAR {order.total}</span>
        {order.status !== "completed" && order.status !== "cancelled" && (
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => onStatus(order.id, "cancelled")} style={S.btnSm("danger")}>Cancel</button>
            {next[order.status] && (
              <button onClick={() => onStatus(order.id, next[order.status])} style={S.btnSm("success")}>
                → {next[order.status]}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NEW ORDER MODAL (POS) ────────────────────────────────────────────────────

function NewOrderPanel({ onAdd, onClose }) {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("dine-in");
  const [table, setTable] = useState(1);
  const [address, setAddress] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const cats = ["All", ...new Set(MENU.map(m => m.cat))];
  const filtered = activeCat === "All" ? MENU : MENU.filter(m => m.cat === activeCat);

  function addItem(item) {
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      return ex ? c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...c, { ...item, qty: 1 }];
    });
  }

  function removeItem(id) {
    setCart(c => c.map(x => x.id === id ? { ...x, qty: x.qty - 1 } : x).filter(x => x.qty > 0));
  }

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  function submit() {
    if (cart.length === 0) return;
    onAdd({ type: orderType, table, address, items: cart, total });
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "min(800px, 96vw)", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: COLORS.primary, color: "#fff", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>☕ New Order — Tea Day</span>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Menu Side */}
          <div style={{ flex: 1, overflow: "auto", padding: "1rem", borderRight: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: "1rem", flexWrap: "wrap" }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  ...S.btnSm(activeCat === c ? "primary" : "outline"),
                  borderRadius: 20,
                }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {filtered.map(item => (
                <div key={item.id} onClick={() => addItem(item)} style={{
                  padding: "0.75rem",
                  borderRadius: 10,
                  border: "1px solid #e8e0d4",
                  cursor: "pointer",
                  textAlign: "center",
                  background: cart.find(x => x.id === item.id) ? "#fffbf2" : "#fff",
                  transition: "all 0.1s",
                }}>
                  <div style={{ fontSize: 24 }}>{item.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700 }}>QAR {item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Side */}
          <div style={{ width: 260, display: "flex", flexDirection: "column", padding: "1rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Order Type</label>
              <select value={orderType} onChange={e => setOrderType(e.target.value)} style={S.select}>
                <option value="dine-in">Dine-In</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            {orderType === "dine-in" && (
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Table</label>
                <select value={table} onChange={e => setTable(+e.target.value)} style={S.select}>
                  {TABLES.map(t => <option key={t} value={t}>Table {t}</option>)}
                </select>
              </div>
            )}

            {orderType === "delivery" && (
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Address</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Customer address" style={S.input} />
              </div>
            )}

            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, marginBottom: 8 }}>Cart</div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {cart.length === 0 && <p style={{ fontSize: 13, color: COLORS.muted, textAlign: "center", marginTop: 20 }}>No items yet</p>}
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 13 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.emoji} {item.name}</div>
                    <div style={{ color: COLORS.muted }}>QAR {item.price} × {item.qty}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => removeItem(item.id)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => addItem(item)} style={{ width: 24, height: 24, borderRadius: "50%", border: "none", background: COLORS.accent, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "2px solid #f0ece6", paddingTop: 12, marginTop: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                <span>Total</span>
                <span style={{ color: COLORS.primary }}>QAR {total}</span>
              </div>
              <button onClick={submit} style={{ ...S.btn("primary"), width: "100%", padding: 12 }} disabled={cart.length === 0}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────

function AdminDashboard({ orders, expenses, staff }) {
  const totalSales = orders.filter(o => o.status === "completed").reduce((s, o) => s + o.total, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const activeOrders = orders.filter(o => !["completed","cancelled"].includes(o.status)).length;
  const expByType = EXPENSE_TYPES.map(t => ({
    ...t,
    total: expenses.filter(e => e.type === t.label).reduce((s, e) => s + e.amount, 0),
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {[
          { label: "Today's Sales", val: `QAR ${totalSales}`, color: COLORS.success },
          { label: "Total Expenses", val: `QAR ${totalExp}`, color: COLORS.danger },
          { label: "Net Profit", val: `QAR ${totalSales - totalExp}`, color: COLORS.info },
          { label: "Active Orders", val: activeOrders, color: COLORS.warning },
        ].map((s, i) => (
          <div key={i} style={S.statCard(s.color)}>
            <div style={S.statLabel}>{s.label}</div>
            <div style={{ ...S.statNum, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={S.grid2}>
        {/* Expense Breakdown */}
        <div style={S.card}>
          <div style={S.sectionTitle}>Expense Breakdown</div>
          {expByType.filter(e => e.total > 0).map(e => (
            <div key={e.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{e.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{e.label}</span>
                  <span style={{ fontWeight: 700, color: e.color }}>QAR {e.total}</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "#f0ece6", marginTop: 4 }}>
                  <div style={{ height: "100%", borderRadius: 3, background: e.color, width: `${Math.min(100, (e.total / totalExp) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Overview */}
        <div style={S.card}>
          <div style={S.sectionTitle}>Staff Overview</div>
          {staff.map(s => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f5f0e8" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{s.role}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>QAR {s.salary}</div>
                <span style={S.badge(s.paid ? COLORS.success : COLORS.danger, s.paid ? "#eafbf0" : "#fdf0ee")}>{s.paid ? "Paid" : "Pending"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={S.card}>
        <div style={S.sectionTitle}>Recent Orders</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f9f6f0" }}>
              {["Order ID", "Type", "Items", "Total", "Status", "Time"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: COLORS.muted, borderBottom: "2px solid #f0ece6" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: "1px solid #f5f0e8" }}>
                <td style={{ padding: "8px 12px", fontWeight: 700, color: COLORS.primary }}>{o.id}</td>
                <td style={{ padding: "8px 12px" }}><span style={S.tag()}>{o.type}</span></td>
                <td style={{ padding: "8px 12px", color: COLORS.muted }}>{o.items.map(i => i.name).join(", ")}</td>
                <td style={{ padding: "8px 12px", fontWeight: 700 }}>QAR {o.total}</td>
                <td style={{ padding: "8px 12px" }}><StatusBadge status={o.status} /></td>
                <td style={{ padding: "8px 12px", color: COLORS.muted }}>{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ORDERS MANAGEMENT ────────────────────────────────────────────────────────

function OrdersPage({ orders, setOrders, role }) {
  const [filter, setFilter] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const tabs = ["all", "pending", "preparing", "ready", "completed"];

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  // For delivery role, only show delivery orders
  const visible = role === ROLES.DELIVERY ? filtered.filter(o => o.type === "delivery") : filtered;

  function updateStatus(id, status) {
    setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));
  }

  function addOrder(newOrder) {
    const id = "ORD-" + String(orders.length + 1).padStart(3, "0");
    const now = new Date();
    setOrders(o => [...o, {
      ...newOrder,
      id,
      status: "pending",
      time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
    }]);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>
          {role === ROLES.DELIVERY ? "🛵 My Deliveries" : "📋 Orders"}
        </h2>
        {[ROLES.ADMIN, ROLES.CASHIER, ROLES.WAITER].includes(role) && (
          <button onClick={() => setShowNew(true)} style={S.btn("primary")}>+ New Order</button>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: "1rem", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            ...S.btnSm(filter === t ? "primary" : "outline"),
            borderRadius: 20, textTransform: "capitalize",
          }}>{t} {t === "all" ? `(${visible.length})` : `(${orders.filter(o => o.status === t).length})`}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {visible.map(o => <OrderCard key={o.id} order={o} onStatus={updateStatus} role={role} />)}
        {visible.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: COLORS.muted, fontSize: 14 }}>
            No orders found
          </div>
        )}
      </div>

      {showNew && <NewOrderPanel onAdd={addOrder} onClose={() => setShowNew(false)} />}
    </div>
  );
}

// ─── KITCHEN VIEW ─────────────────────────────────────────────────────────────

function KitchenPage({ orders, setOrders }) {
  const active = orders.filter(o => ["pending", "preparing"].includes(o.status));

  function updateStatus(id, status) {
    setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>🍳 Kitchen Display</h2>
        <span style={S.badge(COLORS.warning, "#fff8ee")}>{active.length} Active</span>
      </div>

      {active.length === 0 && (
        <div style={{ ...S.card, textAlign: "center", padding: "4rem", color: COLORS.muted }}>
          ✅ All caught up! No pending orders.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {active.map(o => (
          <div key={o.id} style={{
            ...S.card,
            borderTop: `4px solid ${o.status === "pending" ? COLORS.warning : COLORS.info}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ fontWeight: 800, fontSize: 16, color: COLORS.primary }}>{o.id}</span>
                {o.type === "dine-in" && <span style={{ marginLeft: 8, fontSize: 13, color: COLORS.muted }}>🪑 Table {o.table}</span>}
                {o.type === "delivery" && <span style={{ marginLeft: 8, fontSize: 13, color: COLORS.muted }}>🛵 Delivery</span>}
              </div>
              <StatusBadge status={o.status} />
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>⏱ {o.time}</div>

            {o.items.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 12px",
                background: "#f9f6f0",
                borderRadius: 8,
                marginBottom: 6,
                fontSize: 14,
              }}>
                <span>{item.emoji} {item.name}</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: COLORS.primary }}>×{item.qty}</span>
              </div>
            ))}

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {o.status === "pending" && (
                <button onClick={() => updateStatus(o.id, "preparing")} style={{ ...S.btn("primary"), flex: 1 }}>
                  🔥 Start Cooking
                </button>
              )}
              {o.status === "preparing" && (
                <button onClick={() => updateStatus(o.id, "ready")} style={{ ...S.btn("success"), flex: 1 }}>
                  ✅ Mark Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXPENSES PAGE ────────────────────────────────────────────────────────────

function ExpensesPage({ expenses, setExpenses }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: "Staff Salaries", amount: "", desc: "", date: new Date().toISOString().split("T")[0] });
  const [filterType, setFilterType] = useState("All");

  function submit() {
    if (!form.amount || !form.desc) return;
    const exp = EXPENSE_TYPES.find(e => e.label === form.type);
    setExpenses(e => [...e, { ...form, id: Date.now(), amount: +form.amount, icon: exp?.icon || "📋" }]);
    setForm({ type: "Staff Salaries", amount: "", desc: "", date: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  }

  const filtered = filterType === "All" ? expenses : expenses.filter(e => e.type === filterType);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const byType = EXPENSE_TYPES.map(t => ({
    ...t,
    total: expenses.filter(e => e.type === t.label).reduce((s, e) => s + e.amount, 0),
  })).filter(t => t.total > 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>💼 Expenses Tracker</h2>
        <button onClick={() => setShowForm(!showForm)} style={S.btn("primary")}>+ Add Expense</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {byType.slice(0, 3).map(e => (
          <div key={e.label} style={S.statCard(e.color)}>
            <div style={S.statLabel}>{e.icon} {e.label}</div>
            <div style={{ ...S.statNum, color: e.color, fontSize: 22 }}>QAR {e.total}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {byType.slice(3).map(e => (
          <div key={e.label} style={S.statCard(e.color)}>
            <div style={S.statLabel}>{e.icon} {e.label}</div>
            <div style={{ ...S.statNum, color: e.color, fontSize: 22 }}>QAR {e.total}</div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ ...S.card, marginBottom: "1.5rem", borderLeft: `4px solid ${COLORS.accent}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={S.select}>
                {EXPENSE_TYPES.map(t => <option key={t.label}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Amount (QAR)</label>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0" style={S.input} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Description</label>
              <input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Details..." style={S.input} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={S.input} />
            </div>
            <button onClick={submit} style={{ ...S.btn("primary"), height: 37 }}>Add</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: "1rem", flexWrap: "wrap" }}>
        {["All", ...EXPENSE_TYPES.map(t => t.label)].map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{ ...S.btnSm(filterType === t ? "primary" : "outline"), borderRadius: 20 }}>{t}</button>
        ))}
      </div>

      {/* Total */}
      <div style={{ textAlign: "right", marginBottom: "0.75rem", fontSize: 14, fontWeight: 700, color: COLORS.danger }}>
        Total: QAR {total.toLocaleString()}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(e => (
          <div key={e.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{e.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{e.desc}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{e.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={S.tag(EXPENSE_TYPES.find(t => t.label === e.type)?.color || COLORS.muted)}>{e.type}</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: COLORS.danger }}>QAR {e.amount.toLocaleString()}</span>
              <button onClick={() => setExpenses(ex => ex.filter(x => x.id !== e.id))} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.muted, fontSize: 16 }}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STAFF PAGE ───────────────────────────────────────────────────────────────

function StaffPage({ staff, setStaff }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Waiter", salary: "", phone: "" });
  const totalSalary = staff.reduce((s, x) => s + x.salary, 0);
  const paid = staff.filter(s => s.paid).reduce((s, x) => s + x.salary, 0);
  const pending = totalSalary - paid;

  function addStaff() {
    if (!form.name || !form.salary) return;
    setStaff(s => [...s, { ...form, id: Date.now(), salary: +form.salary, status: "active", paid: false }]);
    setForm({ name: "", role: "Waiter", salary: "", phone: "" });
    setShowForm(false);
  }

  function togglePaid(id) {
    setStaff(s => s.map(x => x.id === id ? { ...x, paid: !x.paid } : x));
  }

  function toggleStatus(id) {
    setStaff(s => s.map(x => x.id === id ? { ...x, status: x.status === "active" ? "on-leave" : "active" } : x));
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ ...S.sectionTitle, margin: 0 }}>👥 Staff Management</h2>
        <button onClick={() => setShowForm(!showForm)} style={S.btn("primary")}>+ Add Staff</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Salary Bill", val: `QAR ${totalSalary.toLocaleString()}`, color: COLORS.primary },
          { label: "Salaries Paid", val: `QAR ${paid.toLocaleString()}`, color: COLORS.success },
          { label: "Pending Payment", val: `QAR ${pending.toLocaleString()}`, color: COLORS.danger },
        ].map((s, i) => (
          <div key={i} style={S.statCard(s.color)}>
            <div style={S.statLabel}>{s.label}</div>
            <div style={{ ...S.statNum, color: s.color, fontSize: 22 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ ...S.card, marginBottom: "1.5rem", borderLeft: `4px solid ${COLORS.accent}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Full Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Staff name" style={S.input} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={S.select}>
                {["Cashier", "Waiter", "Delivery", "Kitchen", "Manager"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Monthly Salary</label>
              <input type="number" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="QAR" style={S.input} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 4 }}>Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+974..." style={S.input} />
            </div>
            <button onClick={addStaff} style={{ ...S.btn("primary"), height: 37 }}>Add</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {staff.map(s => (
          <div key={s.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: COLORS.primary,
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 16,
              }}>
                {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{s.role} · {s.phone}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>QAR {s.salary.toLocaleString()}/mo</span>
              <StatusBadge status={s.status} />
              <span style={S.badge(s.paid ? COLORS.success : COLORS.warning, s.paid ? "#eafbf0" : "#fff8ee")}>
                {s.paid ? "Paid" : "Unpaid"}
              </span>
              <button onClick={() => togglePaid(s.id)} style={S.btnSm(s.paid ? "danger" : "success")}>
                {s.paid ? "Mark Unpaid" : "Mark Paid"}
              </button>
              <button onClick={() => toggleStatus(s.id)} style={S.btnSm("outline")}>
                {s.status === "active" ? "Leave" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TABLES PAGE ──────────────────────────────────────────────────────────────

function TablesPage({ orders }) {
  const occupiedTables = [...new Set(
    orders.filter(o => o.type === "dine-in" && !["completed", "cancelled"].includes(o.status)).map(o => o.table)
  )];

  return (
    <div>
      <h2 style={{ ...S.sectionTitle }}>🗺️ Table Map</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
        {TABLES.map(t => {
          const order = orders.find(o => o.type === "dine-in" && o.table === t && !["completed", "cancelled"].includes(o.status));
          const occupied = !!order;
          return (
            <div key={t} style={{
              ...S.card,
              textAlign: "center",
              borderTop: `4px solid ${occupied ? COLORS.warning : COLORS.success}`,
              padding: "1.25rem 1rem",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{occupied ? "🪑" : "⬜"}</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.primary }}>T{t}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                <StatusBadge status={occupied ? "pending" : "ready"} />
              </div>
              {order && (
                <div style={{ marginTop: 8, fontSize: 12, color: COLORS.muted }}>
                  {order.id}<br />QAR {order.total}<br />⏱ {order.time}
                </div>
              )}
              {!order && <div style={{ marginTop: 8, fontSize: 12, color: COLORS.success }}>Available</div>}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: "1.5rem", fontSize: 13, color: COLORS.muted }}>
        <span>🟢 <span style={{ color: COLORS.success }}>Available: {TABLES.length - occupiedTables.length}</span></span>
        <span>🟡 <span style={{ color: COLORS.warning }}>Occupied: {occupiedTables.length}</span></span>
      </div>
    </div>
  );
}

// ─── REPORTS PAGE ─────────────────────────────────────────────────────────────

function ReportsPage({ orders, expenses }) {
  const completedOrders = orders.filter(o => o.status === "completed");
  const totalSales = completedOrders.reduce((s, o) => s + o.total, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);

  const byType = ["dine-in", "delivery", "takeaway"].map(t => ({
    type: t,
    count: completedOrders.filter(o => o.type === t).length,
    total: completedOrders.filter(o => o.type === t).reduce((s, o) => s + o.total, 0),
  }));

  const topItems = MENU.map(m => ({
    ...m,
    sold: completedOrders.flatMap(o => o.items).filter(i => i.id === m.id).reduce((s, i) => s + (i.qty || 0), 0),
    revenue: completedOrders.flatMap(o => o.items).filter(i => i.id === m.id).reduce((s, i) => s + i.price * (i.qty || 0), 0),
  })).filter(m => m.sold > 0).sort((a, b) => b.revenue - a.revenue).slice(0, 6);

  return (
    <div>
      <h2 style={{ ...S.sectionTitle }}>📊 Reports & Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Revenue", val: `QAR ${totalSales.toLocaleString()}`, color: COLORS.success },
          { label: "Total Expenses", val: `QAR ${totalExp.toLocaleString()}`, color: COLORS.danger },
          { label: "Net Profit", val: `QAR ${(totalSales - totalExp).toLocaleString()}`, color: COLORS.info },
          { label: "Profit Margin", val: `${totalSales ? Math.round(((totalSales - totalExp) / totalSales) * 100) : 0}%`, color: COLORS.warning },
        ].map((s, i) => (
          <div key={i} style={S.statCard(s.color)}>
            <div style={S.statLabel}>{s.label}</div>
            <div style={{ ...S.statNum, color: s.color, fontSize: 22 }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={S.grid2}>
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Sales by Order Type</div>
          {byType.map(t => (
            <div key={t.type} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ textTransform: "capitalize", fontWeight: 600 }}>{t.type}</span>
                <span><strong>{t.count}</strong> orders · <strong style={{ color: COLORS.success }}>QAR {t.total}</strong></span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "#f0ece6" }}>
                <div style={{ height: "100%", borderRadius: 3, background: COLORS.accent, width: `${totalSales ? (t.total / totalSales) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Top Selling Items</div>
          {topItems.length === 0 && <p style={{ color: COLORS.muted, fontSize: 13 }}>Complete some orders to see top items.</p>}
          {topItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 13 }}>
              <span>{item.emoji} {item.name}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={S.tag(COLORS.muted)}>{item.sold} sold</span>
                <span style={{ fontWeight: 700, color: COLORS.success }}>QAR {item.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [orders, setOrders] = useState(initialOrders);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [staff, setStaff] = useState(initialStaff);

  const navByRole = {
    [ROLES.ADMIN]: [
      { key: "dashboard", label: "Dashboard" },
      { key: "orders", label: "Orders" },
      { key: "kitchen", label: "Kitchen" },
      { key: "tables", label: "Tables" },
      { key: "expenses", label: "Expenses" },
      { key: "staff", label: "Staff" },
      { key: "reports", label: "Reports" },
    ],
    [ROLES.CASHIER]: [
      { key: "orders", label: "Orders" },
      { key: "tables", label: "Tables" },
      { key: "reports", label: "Reports" },
    ],
    [ROLES.WAITER]: [
      { key: "orders", label: "My Orders" },
      { key: "tables", label: "Tables" },
      { key: "kitchen", label: "Kitchen Status" },
    ],
    [ROLES.DELIVERY]: [
      { key: "orders", label: "My Deliveries" },
    ],
  };

  useEffect(() => {
    if (role) {
      const firstTab = navByRole[role]?.[0]?.key;
      if (firstTab) setTab(firstTab);
    }
  }, [role]);

  if (!role) return <LoginScreen onLogin={setRole} />;

  const nav = navByRole[role] || [];

  function renderPage() {
    switch (tab) {
      case "dashboard": return <AdminDashboard orders={orders} expenses={expenses} staff={staff} />;
      case "orders": return <OrdersPage orders={orders} setOrders={setOrders} role={role} />;
      case "kitchen": return <KitchenPage orders={orders} setOrders={setOrders} />;
      case "tables": return <TablesPage orders={orders} />;
      case "expenses": return <ExpensesPage expenses={expenses} setExpenses={setExpenses} />;
      case "staff": return <StaffPage staff={staff} setStaff={setStaff} />;
      case "reports": return <ReportsPage orders={orders} expenses={expenses} />;
      default: return null;
    }
  }

  const roleColors = { admin: COLORS.danger, cashier: COLORS.info, waiter: COLORS.success, delivery: COLORS.warning };

  return (
    <div style={S.app}>
      {/* Top Bar */}
      <div style={S.topBar}>
        <div style={S.logo}>☕ Tea Day</div>
        <div style={{ fontSize: 12, color: COLORS.accent2, letterSpacing: 2 }}>QATAR · CAFÉ MANAGEMENT SYSTEM</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            ...S.badge("#fff", roleColors[role] || COLORS.muted),
            fontSize: 12,
            background: (roleColors[role] || COLORS.muted) + "30",
            border: `1px solid ${(roleColors[role] || COLORS.muted)}60`,
          }}>
            {role.toUpperCase()}
          </span>
          <button onClick={() => setRole(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "4px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Nav */}
      <div style={S.navBar}>
        {nav.map(n => (
          <button key={n.key} onClick={() => setTab(n.key)} style={S.navBtn(tab === n.key)}>
            {n.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={S.main}>
        {renderPage()}
      </div>
    </div>
  );
}
