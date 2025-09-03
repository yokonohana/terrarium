import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from './auth/auth.jsx'
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation().pathname;
  const { login, userID, status } = useSelector(state => state.user); // auth - зашел в профиль, unauth - не зашел в профиль
  const [authStatus, setAuthStatus] = useState('idle'); // idle - закрытые окна, login - открытое окно входа, register - открытое окно регистрации
  
  const navItems = [
    { path: "/characterslist", label: "Мои Персонажи" },
    { path: "/rules", label: "Правила" },
    { path: "/bestiary", label: "Бестиарий" },
    { path: "/archive", label: "Архив" },
    { path: "/world", label: "Мир" },
  ];

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
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
          {status === 'unauth' ?
            <div className="flex gap-1">
              <button onClick={() => setAuthStatus('login')}
              className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${"text-gray-300 cursor-pointer hover:bg-sky-400 hover:text-gray-900"}`}>
                Войти
              </button>
              <button onClick={() => setAuthStatus('register')}
              className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${"text-gray-300 cursor-pointer hover:bg-sky-400 hover:text-gray-900"}`}>
                Регистрация
              </button>
            </div>
            :
            <>
              <div className="text-2xl font-bold text-white hover:text-sky-400 transition-colors duration-200 select-none">{login}</div>
            </>
          }
        </div>
      </header>
      {authStatus !== 'idle' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <Auth state={authStatus} setAuthState={setAuthStatus}/>
        </div>
      )}
    </>
  );
}
