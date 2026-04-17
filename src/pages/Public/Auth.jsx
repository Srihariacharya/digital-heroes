import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleAuth = async () => {
    if (loading) return; // prevent multiple clicks

    try {
      setLoading(true);

      // ✅ Validation
      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      // 🔹 LOGIN
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert("Invalid email or password ❌");
          return;
        }

        // ✅ Redirect after login
        navigate("/dashboard");
      }

      // 🔹 SIGNUP
      else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        // ✅ Create profile
        if (data.user) {
          await supabase.from("profiles").insert([
            {
              id: data.user.id,
              name: email,
            },
          ]);
        }

        alert("Signup successful! Now login 🔐");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 w-96 shadow-lg">

        <h1 className="text-2xl mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-primary py-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : isLogin
            ? "Login"
            : "Signup"}
        </button>

        {/* TOGGLE */}
        <p
          className="text-center mt-4 text-sm cursor-pointer text-gray-400"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}