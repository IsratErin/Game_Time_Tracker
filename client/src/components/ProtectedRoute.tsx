import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  if (loading) {
    // Show a loading spinner while Firebase checks the auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>You must be logged in to access this page.</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f472b6",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Allow access if the user is authenticated
  return children;
}
