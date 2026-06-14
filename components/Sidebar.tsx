import { navItems, utilityItems } from "./icons";

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand">SHORTLIST</div>
      <nav className="sidebar-nav">
        {navItems.map(({ label, icon: Icon, badge }, index) => (
          <button className={`nav-item ${index === 0 ? "active" : ""}`} key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
            {badge ? <span className="nav-badge">{badge}</span> : null}
          </button>
        ))}
      </nav>
      <div className="sidebar-utilities">
        {utilityItems.map(({ label, icon: Icon }) => (
          <button className="nav-item" key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
