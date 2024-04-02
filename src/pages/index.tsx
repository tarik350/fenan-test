import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import api from "../api";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const handleLogin = async () => {
    try {
      const response = await api.post("auth/login", {
        username: email,
        password: password,
        channel: "EMAIL",
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.content.token);
        setMessage("Login successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setMessage("you havent logged in");
        return;
      }
      const response = await api.post("logout");
      if (response.status === 200) {
        console.log("successfully logged out");
        console.log(response);
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-400">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-2 "
      >
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="password"
        />
        {message && (
          <span className=" text-green-500 font-bold text-[22px]">
            {message}
          </span>
        )}
        <button type="submit">login</button>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </form>
    </main>
  );
}
