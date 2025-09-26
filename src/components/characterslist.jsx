import React, { useEffect, useState } from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSavedChars, addSavedChar, clearSavedChars } from "../../store/charFormSlice.js";

export default function CharactersList() {
  const userState = useSelector((state) => state.user);
  const savedChars = useSelector((state) => state.characterForm.savedChars);
  const dispatch = useDispatch();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  // Загрузка персонажей при монтировании
  useEffect(() => {
    const getChars = async () => {
      try {
        const userId = userState.userID;
        if (!userId) return;
        const response = await axios.get(`/api/characters/${userId}`);
        const data = response.data.characters;

        // Преобразуем в объект {id: {data}} для Redux
        const charsObj = {};
        data.forEach((c) => {
          charsObj[c.id] = c.data;
          dispatch(addSavedChar({ id: c.id, data: c.data, userId }));
        });
        dispatch(getSavedChars(charsObj));
      } catch (err) {
        console.error(err);
      }
    };

    getChars();
  }, [userState.userID, dispatch]);

  const deleteChar = async (id) => {
    try {
      dispatch(clearSavedChars());

      await axios.delete(`/api/characters/delete/${id}`);

      const userId = userState.userID;
      const response = await axios.get(`/api/characters/${userId}`);
      const data = response.data.characters;

      dispatch(getSavedChars(data));
      
      setOpenDropdownId(null);
    } catch (err) {
      console.error("Ошибка удаления персонажа:", err);
    }
  };

  const downloadJSON = () => {
    const jsonString = JSON.stringify(savedChars, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "characters.json";
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Фон */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-[url('/img/background.png')] bg-cover bg-bottom w-full h-full" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <main className="flex flex-row flex-wrap content-start gap-10 py-10 pl-20 flex-1">
        {Object.entries(savedChars).map(([id, char]) => (
          <Link
            key={id}
            to={`/character/${id}`}
            className="bg-gray-800 w-[400px] h-[120px] rounded-md p-5 flex flex-row gap-x-5 border border-sky-400/25 shadow-lg cursor-pointer hover:bg-gray-700 transition no-underline relative"
          >
            <div className="mask-clip-padding bg-[url('/img/unnamed.jpg')] bg-cover w-20 h-20 rounded-2xl" />
            <div className="h-20 border border-sky-400/25"></div>
            <div className="text-gray-300 flex flex-col justify-center">
              <div className="flex flex-row gap-2">
                <h1>Имя:</h1>
                <p>{char.name || ""}</p>
              </div>
              <div className="flex flex-row gap-2">
                <h1>Роль:</h1>
                <p>{char.general_info?.role || ""}</p>
              </div>
              <div className="flex flex-row gap-2">
                <h1>Здоровье:</h1>
                <p className="shrink-0">{char.parameters?.health || "Здоров"}</p>
              </div>
            </div>

            <CiSettings
              className={!openDropdownId ? "transition-colors duration-300 relative text-white text-3xl ml-auto cursor-pointer hover:text-blue-400"
                : "relative text-blue-400 text-3xl ml-auto cursor-pointer"
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleDropdown(id);
              }}
            />

            {openDropdownId === id && (
              <div className="absolute right-5 top-12 bg-gray-400 text-white rounded-lg shadow-md p-2 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadJSON();
                    setOpenDropdownId(null);
                  }}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-600"
                >
                  Скачать JSON
                </button>
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteChar(id);
                  }}
                >
                  Удалить
                </button>
              </div>
            )}
          </Link>
        ))}

        {/* Кнопка добавления нового персонажа */}
        <Link
          to="/character"
          className="bg-gray-800 w-[400px] h-[120px] rounded-md p-5 flex flex-row gap-x-5 border border-sky-400/25 shadow-lg justify-center items-center text-white cursor-pointer hover:bg-gray-700 transition no-underline"
        >
          <FaPlus className="text-white text-3xl mr-3" />
          <span>Добавить нового персонажа</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
