import React, { useEffect} from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSavedChars } from "../../store/charFormSlice.js";

export default function CharactersList() {
  const userState = useSelector(state => state.user);
  const savedChars = useSelector(state => state.characterForm.savedChars);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChars = async () => {
      try {
        const userId = userState.userID;
        if (!userId) return;
        const response = await axios.get(`/api/characters/${userId}`);
        const data = response.data.characters;
        dispatch(getSavedChars(data));
      } catch (err) {
        console.error(err);
      }
    };

    getChars();
  }, [userState.userID, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="absolute inset-0 -z-10 bg-[url('/img/background.png')] bg-cover bg-bottom min-h-screen filter blur-md" />

      <main className="flex flex-row flex-wrap content-start gap-10 py-10 pl-17 bg-blue-300/10 flex-1">
        {Object.entries(savedChars).map(([id, char]) => (
          <Link
            key={id}
            to={`/character/${id}`}
            className="bg-gray-800 w-100 h-30 rounded-md p-5 flex flex-row gap-x-5 border-2 border-sky-400/25 shadow-lg cursor-pointer hover:bg-gray-700 transition no-underline"
          >
            <div className="bg-gray-300 w-20 h-20 rounded-2xl" />
            <div className="h-20 border-1 border-sky-400/25"></div>
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
            <CiSettings className="text-white text-3xl ml-auto" />
          </Link>
        ))}


        <Link
          to="/character"
          className="bg-gray-800 w-100 h-30 rounded-md p-5 flex flex-row gap-x-5 border-2 border-sky-400/25 shadow-lg justify-center items-center text-white cursor-pointer hover:bg-gray-700 transition no-underline"
        >
          <FaPlus className="text-white text-3xl mr-3" />
          <span>Добавить нового персонажа</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
