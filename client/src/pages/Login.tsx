import Login from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-96px)] px-4 md:px-0">
      <div className="bg-white  dark:bg-gray-800  rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-pinkyDark">
          Login
        </h1>
        <h2 className="text-sm font-normal text-center mb-6 text-gray-400">
          Login to your account to track your game time!
        </h2>
        <Login />
      </div>
    </div>
  );
}
