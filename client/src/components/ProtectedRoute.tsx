import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../auth/firebase.init";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Show a loading spinner while Firebase checks the auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Allow access if the user is authenticated
  return children;
}
