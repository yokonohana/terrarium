import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "./auth/auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from '../../store/userSlice.js';
import { clearSavedChars } from '../../store/charFormSlice.js';

export default function Header() {
  const location = useLocation().pathname;
  const { login, status } = useSelector((state) => state.user);
  const [authStatus, setAuthStatus] = useState("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();

  const navItems = [
    { path: "/characterslist", label: "Мои Персонажи" },
    { path: "/rules", label: "Правила" },
    { path: "/bestiary", label: "Бестиарий" },
    { path: "/archive", label: "Архив" },
    { path: "/world", label: "Мир" },
  ];

  // закрытие при клике вне меню
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-gray-900 border-b min-h-16 border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto min-h-16 px-8 py-3 flex justify-between items-center">
          <Link
            to="/home"
            className="text-2xl font-bold text-white hover:text-sky-400 transition-colors duration-200 select-none"
          >
            Terrarium
          </Link>

          <nav className="flex space-x-10">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative font-semibold transition-colors duration-200 ${
                  location === path
                    ? "text-sky-400"
                    : "text-gray-300 hover:text-sky-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {status === "unauth" ? (
            <div className="flex gap-1">
              <button
                onClick={() => setAuthStatus("login")}
                className="px-5 py-2 rounded-md font-semibold text-gray-300 cursor-pointer hover:bg-sky-400 hover:text-gray-900 transition-colors duration-200"
              >
                Войти
              </button>
              <button
                onClick={() => setAuthStatus("register")}
                className="px-5 py-2 rounded-md font-semibold text-gray-300 cursor-pointer hover:bg-sky-400 hover:text-gray-900 transition-colors duration-200"
              >
                Регистрация
              </button>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="text-2xl font-bold text-white hover:text-sky-400 transition-colors duration-200 select-none"
              >
                {login}
              </button>

              {/* Выпадающее меню — ширина = ширине кнопки */}
              <div
                className={`absolute left-0 top-full mt-1 select-none bg-gray-800 border border-gray-700 rounded-md overflow-hidden transition-all duration-300 origin-top ${
                  isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <button
                  className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    console.log("Выйти");
                    setIsDropdownOpen(false);
                    dispatch(resetForm());
                    dispatch(clearSavedChars());
                  }}
                >
                  Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {authStatus !== "idle" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <Auth state={authStatus} setAuthState={setAuthStatus} />
        </div>
      )}
    </>
  );
}
