import { useState } from "react";
import { supabase } from "../../shared/api/supabaseClient";

type Props = { onSuccess: () => void };

export default function LoginForm({ onSuccess }: Props) {
  const [login, setLogin] = useState("admin"); // по умолчанию admin
  const [password, setPassword] = useState("1234"); // по умолчанию 1234
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Supabase требует email -> превращаем "admin" в "admin@local"
    const email = login.includes("@") ? login : `${login}@local.com`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) setError(error.message);
    else onSuccess();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col  items-center gap-5">
      <input
        className="border-2 w-72 px-5 py-2 border-black"
        placeholder="login (admin)"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        className="border-2 w-72 px-5 py-2 border-black"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        className="border-2 w-72 px-5 py-2 border-black"
        type="submit"
        disabled={loading}
      >
        {loading ? "..." : "Sign in"}
      </button>
      {error && (
        <div className="border-2 w-72 px-5 py-2 border-black">{error}</div>
      )}
    </form>
  );
}
