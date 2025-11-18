import { useState } from "react";
import { signInUser } from "../auth/authService";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInUser({ email, password });
      toast.success("Logged in successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to log in.");
      } else {
        toast.error("Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col space-y-4 bg-gray-100 p-6 rounded-xl max-w-md mx-auto shadow-md"
    >
      {(["email", "password"] as const).map((field) => (
        <div key={field} className="flex flex-col space-y-1">
          <label htmlFor={field} className="block text-gray-700 font-medium">
            {field === "email" ? "Email Address" : "Password"}
          </label>

          <input
            id={field}
            type={field === "email" ? "email" : "password"}
            value={field === "email" ? email : password}
            onChange={(e) =>
              field === "email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
            className="w-full rounded-lg border bg-white border-gray-300 p-3 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`bg-sky-500 text-white rounded-xl px-4 py-2 font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
