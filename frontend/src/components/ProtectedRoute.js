import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  const location = useLocation();
  return loggedIn ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
