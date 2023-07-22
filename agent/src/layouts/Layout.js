import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="app">
      <header className="header">Header</header>
      <div className="content-wrapper">
      <aside className="sidebar">Sidebar</aside>
        <main className="main-content">
          <Outlet /> {/* This is where the child routes will be rendered */}
        </main>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default Layout;
