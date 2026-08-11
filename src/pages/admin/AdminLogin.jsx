import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { session, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const signInError = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    navigate("/admin");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-ink bg-paper p-8 flex flex-col gap-5"
      >
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-1 text-stone font-mono">Buonstile</p>
          <h1 className="text-2xl text-ink font-heading uppercase">Panel de administración</h1>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-ink font-heading">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-ink bg-paper px-3 py-2 text-sm text-ink font-body focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-ink font-heading">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-ink bg-paper px-3 py-2 text-sm text-ink font-body focus:outline-none"
          />
        </label>

        {error && <p className="text-xs text-red-700 font-mono">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 px-6 py-3 text-sm uppercase tracking-wide bg-ink text-paper font-heading disabled:opacity-50"
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
