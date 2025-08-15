import React from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function CharactersList() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="absolute inset-0 -z-10 bg-[url('/img/background.png')] bg-cover bg-bottom min-h-screen filter blur-md" />

      <main className="flex flex-row flex-wrap content-start gap-10 py-10 pl-17 bg-blue-300/10 flex-1">
        <div className="bg-gray-800 w-100 h-30 rounded-md p-5 flex flex-row gap-x-5 border-2 border-sky-400/25 shadow-lg">
          <div className="bg-gray-300 w-20 h-20 rounded-2xl" />
          <div className="h-20 border-1 border-sky-400/25"></div>
          <div className="text-gray-300 flex flex-col justify-center">
            <div className="flex flex-row gap-2">
              <h1>Имя:</h1>
              <p>Авицена</p>
            </div>
            <div className="flex flex-row gap-2">
              <h1>Роль:</h1>
              <p>Большой человек</p>
            </div>
            <div className="flex flex-row gap-2">
              <h1>Здоровье:</h1>
              <p>Нет ранений</p>
            </div>
          </div>
          <CiSettings className="text-white text-3xl ml-auto" />
        </div>

        <div className="bg-gray-800 w-100 h-30 rounded-md p-5 flex flex-row gap-x-5 border-2 border-sky-400/25 shadow-lg">
          <FaPlus className="text-white text-3xl m-auto" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
