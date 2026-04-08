import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const handleFileChange = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.email || !form.password || (!isLogin && !form.name)) {
        return setError("All fields are required");
      }
      if (!isLogin && form.password !== form.confirmPassword) {
        return setError("Passwords do not match");
      }
      if (isLogin) {
        // LOGIN (JSON)
        const res = await axios.post(
          "http://localhost:3000/user/login",
          {
            email: form.email,
            password: form.password,
          }
        );
        console.log("Login success:", res.data);
      } else {
        // REGISTER (multipart)
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("avatar", form.avatar);
        const res = await axios.post(
          "http://localhost:3000/user/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Signup success:", res.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 outline-none"
            />

            {/* Avatar Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4 text-sm"
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/20 outline-none"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 rounded-lg bg-white/20 outline-none"
          />
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="ml-2 text-cyan-400 cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;