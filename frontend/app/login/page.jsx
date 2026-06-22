"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "../../lib/axios.js";
import useAuthStore from "../../stores/authStore";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register,handleSubmit,formState: { errors },} = useForm();
 
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
     console.log(data);
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;

      login(token);

      router.push("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue planning your trips
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border p-3 outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full rounded-xl border p-3 outline-none"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-3 font-medium cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account ? 
          <button
            onClick={() => router.push("/register")}
            className="font-semibold underline hover:cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </main>
  );
}