const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("stamina_token");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default Dashboard;
