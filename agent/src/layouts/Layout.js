import { Outlet, useNavigate } from "react-router";

function Layout({ formData, handleLogout }) {
  const navigate = useNavigate();
  const logoutHandle = () => {
    handleLogout();
    navigate("/login");
  };
  return (
    <div className="app">
      <header className="header d-flex justify-content-between">
        <div>Agent #{formData?.code}</div>
        <div>
          <button className="btn btn-outline-danger" onClick={logoutHandle}>
            Logout
          </button>
        </div>
      </header>
      <div className="content-wrapper">
        <aside className="sidebar">Sidebar</aside>
        <main className="main-content">
          <Outlet /> {/* This is where the child routes will be rendered */}
        </main>
      </div>
      <footer className="footer text-center">@CopyRight YNS Achak</footer>
    </div>
  );
}

export default Layout;
