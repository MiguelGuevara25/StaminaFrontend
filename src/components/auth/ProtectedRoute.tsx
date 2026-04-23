import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  // 1. Verificamos si existe el token en el almacenamiento local
  const token = localStorage.getItem("stamina_token");

  // 2. Si NO hay token, redirigimos al login
  // replace evita que el usuario pueda volver atrás con el botón del navegador
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay token, renderizamos los componentes hijos (el Dashboard)
  // Outlet es un espacio reservado de react-router-dom para las rutas anidadas
  return <Outlet />;
};

export default ProtectedRoute;
