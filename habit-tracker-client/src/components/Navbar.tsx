// components/Navbar.js

import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    // Clear localStorage
    localStorage.clear();

    // Redirect to login page
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">Habit Tracker</div>

      <button
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md focus:outline-none"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </nav>
  );
}
