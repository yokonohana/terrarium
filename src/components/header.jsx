import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation().pathname;

  const navItems = [
    { path: "/characterslist", label: "Мои Персонажи" },
    { path: "/rules", label: "Правила" },
    { path: "/bestiary", label: "Бестиарий" },
    { path: "/archive", label: "Архив" },
    { path: "/world", label: "Мир" },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
        <Link to="/home"
          className="text-2xl font-bold text-white hover:text-sky-400 transition-colors duration-200 select-none">
          Terrarium
        </Link>
        <nav className="flex space-x-10">
          {navItems.map(({ path, label }) => (
            <Link key={path} to={path} className={`relative font-semibold transition-colors duration-200
                ${location === path
                  ? "text-sky-400"
                  : "text-gray-300 hover:text-sky-400"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <Link to="/auth"
          className={`ml-10 px-5 py-2 rounded-md font-semibold transition-colors duration-200
            ${location === "/auth"
              ? "bg-sky-400 text-gray-900 shadow-lg"
              : "text-gray-300 hover:bg-sky-400 hover:text-gray-900"}`}>
          Профиль
        </Link>
      </div>
    </header>
  );
}
