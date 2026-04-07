import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError("All fields are required ⚠️");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    console.log(isLogin ? "Login Data:" : "Signup Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Name (Signup only) */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 outline-none placeholder-gray-300"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 outline-none placeholder-gray-300"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none placeholder-gray-300"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Confirm Password (Signup only) */}
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 rounded-lg bg-white/20 outline-none placeholder-gray-300"
          />
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-center mt-4 text-gray-400">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="ml-2 text-cyan-400 cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;