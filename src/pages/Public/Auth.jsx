import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // if user not found → signup
      await supabase.auth.signUp({
        email,
        password,
      });
    }

    alert("Logged in successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 w-96 shadow-lg">

        <h1 className="text-2xl mb-6 text-center">
          Login / Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-primary py-3 rounded-xl hover:scale-105 transition"
        >
          Continue
        </button>

      </div>

    </div>
  );
}