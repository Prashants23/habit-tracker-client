// components/Navbar.js

import React from "react";

export default function Navbar() {
  const loggedIn = true;
  const handleSignOut = async () => {
    // await signOut();
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">Habit Tracker</div>
      {loggedIn && (
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={handleSignOut}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
