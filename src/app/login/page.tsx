
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-[#080914] text-white flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="text-purple-400 font-bold tracking-widest">
          GAMECORD
        </a>

        <div className="mt-8 rounded-2xl border border-purple-500/30 bg-white/[0.04] p-8 shadow-2xl shadow-purple-950/30">
          <p className="text-sm font-semibold tracking-[0.3em] text-purple-400">
            PLAYER PORTAL
          </p>

          <h1 className="mt-3 text-3xl font-black">
            ENTER THE ARENA
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Log in to continue your competitive journey.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm text-gray-300"
              >
                Email or Game UID
              </label>
              <input
                id="identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Enter your email or UID"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-3 font-bold transition hover:bg-purple-500"
            >
              LOG IN
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            New player?{" "}
            <a
              href="/register"
              className="font-semibold text-purple-400 hover:text-purple-300"
            >
              Create an account
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          GAMECORD ESPORTS PORTAL
        </p>
      </div>
    </main>
  );
}
