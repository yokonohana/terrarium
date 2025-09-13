import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Weapon from "./char_content/weapon.jsx";
import Skills from "./char_content/skills.jsx";
import Armor from "./char_content/armor.jsx";
import Backpack from "./char_content/backpack.jsx";
import Persona from "./char_content/persona.jsx";
import Health from "./char_content/health.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getRandom, getAge, getCountry, getPoliticalView, getReligionView, getSex } from "../tools.js";
import { updateField, addSavedChar, resetForm, setId } from "../../store/charFormSlice.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Character() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const charForm = useSelector((state) => state.characterForm);
  const { form, savedChars } = charForm;

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [curIndex, setCurIndex] = useState(0);
  const [infoGenerated, setInfoGenerated] = useState(false);
  const [tempChar, setTempChar] = useState(null); // временный чужой персонаж

  // Подгружаем персонажа при смене id
  useEffect(() => {
    async function getChar() {
      try {
        const response = await axios.get(`/api/characters/one/${id}`);
        const { character } = response.data;

        if (character) {
          if (character.userId === userState.userID) {
            // свой персонаж кладем в redux
            dispatch(addSavedChar({ id: character.id, data: character.data, userId: character.userId }));
          } else {
            // чужой персонаж хранится только локально
            setTempChar({ ...character.data, userId: character.userId });
          }
          dispatch(setId(character.id));
        }
      } catch (err) {
        console.error("Ошибка загрузки персонажа:", err);
      }
    }

    if (id) {
      // если нет в savedChars или это чужой персонаж
      if (!savedChars[id] || savedChars[id].userId !== userState.userID) {
        getChar();
      } else {
        dispatch(setId(id));
      }
    } else {
      dispatch(setId(null));
    }
  }, [id, dispatch, savedChars, userState.userID]);

  // Выбираем данные для формы
  const dataForm = (() => {
    if (!id) return form; // новая форма
    if (savedChars[id] && savedChars[id].userId === userState.userID) return savedChars[id]; // свой персонаж
    return tempChar; // чужой временный персонаж
  })();

  const isOwner = !id || (savedChars[id] && savedChars[id].userId === userState.userID);

  if (!dataForm) return <div className="p-4">Персонаж не найден</div>;

  // Универсальная функция изменения полей
  const handleChange = (path, value) => {
    if (!id) {
      dispatch(updateField({ path, value }));
    } else if (savedChars[id] && savedChars[id].userId === userState.userID) {
      dispatch(updateField({ path, value }));
    }
  };

  const hasGeneratedParams = Object.values(dataForm.parameters || {}).some(
    (v) => v !== 0 && v !== null && v !== ""
  );
  const showParButton = !id && !hasGeneratedParams;
  const showInfoButton = !infoGenerated;

  const params = [
    { label: "ТЕЛОСЛОЖЕНИЕ", path: "parameters.strenght", value: dataForm.parameters.strenght || "" },
    { label: "СИЛА ВОЛИ", path: "parameters.willpower", value: dataForm.parameters.willpower || "" },
    { label: "ИНТЕЛЛЕКТ", path: "parameters.intelligence", value: dataForm.parameters.intelligence || "" },
    { label: "АКТИВНОСТЬ", path: "parameters.activity", value: dataForm.parameters.activity || "" },
  ];

  const info = [
    { key: "Политические взгляды", path: "general_info.political_view", value: dataForm.general_info.political_view || "" },
    { key: "Религиозные взгляды", path: "general_info.religion_view", value: dataForm.general_info.religion_view || "" },
    { key: "Родина", path: "general_info.country", value: dataForm.general_info.country || "" },
    { key: "Пол", path: "general_info.sex", value: dataForm.general_info.sex || "" },
    { key: "Возраст", path: "general_info.age", value: dataForm.general_info.age || "" },
  ];

  const extraParams = [
    { key: "Сила удара", path: "parameters.impact_force", value: dataForm.parameters.impact_force || "" },
    { key: "Количество ударов", path: "parameters.quantity_attacks", value: dataForm.parameters.quantity_attacks || "" },
    { key: "Удача", path: "parameters.luck", value: dataForm.parameters.luck || "" },
    { key: "Скорость", path: "parameters.speed", value: dataForm.parameters.speed || "" },
    { key: "Гены", path: "parameters.genes", value: dataForm.parameters.genes || "" },
  ];

  const onDragStart = (index) => (e) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (index) => (e) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const valueDragged = params[draggedIndex].value;
    const valueDropped = params[index].value;

    handleChange(params[draggedIndex].path, valueDropped);
    handleChange(params[index].path, valueDragged);

    setDraggedIndex(null);
  };

  const getPar = (min, max) => {
    handleChange("parameters.strenght", getRandom(min, max));
    handleChange("parameters.willpower", getRandom(min, max));
    handleChange("parameters.intelligence", getRandom(min, max));
    handleChange("parameters.activity", getRandom(min, max));
  };

  const getInfo = () => {
    handleChange("general_info.political_view", getPoliticalView());
    handleChange("general_info.religion_view", getReligionView());
    handleChange("general_info.country", getCountry());
    handleChange("general_info.sex", getSex());
    handleChange("general_info.age", getAge());
    setInfoGenerated(true);
  };

  const getSection = (index) => {
    switch (index) {
      case 0: return <Persona value={dataForm}/>;
      case 1: return <Weapon value={dataForm}/>;
      case 2: return <Skills value={dataForm}/>;
      case 3: return <Armor value={dataForm}/>;
      case 4: return <Health value={dataForm}/>;
      case 5: return <Backpack value={dataForm}/>;
      default: return null;
    }
  };

  const saveCharacter = async () => {
    if (!isOwner) return;
    try {
      const userId = userState.userID;
      if (id && savedChars[id] && savedChars[id].userId === userState.userID) {
        const response = await axios.put(`/api/characters/update/${id}`, { userId, data: dataForm });
        if (response.status === 200) {
          dispatch(addSavedChar({ id, data: response.data.character.data }));
        }
      } else {
        const response = await axios.post("/api/characters/add", { userId, data: dataForm });
        if (response.status === 201) {
          dispatch(addSavedChar({ id: response.data.character.id, data: response.data.character.data }));
          dispatch(resetForm());
          setInfoGenerated(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="flex-1 flex justify-center items-start py-12 px-8 sm:px-16">
        <div className="flex w-full max-w-[90rem] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <aside className="w-1/3 bg-gray-100 p-10 flex flex-col gap-8 border-r border-gray-300">
            <div>
              <input
                type="text"
                className="text-4xl font-extrabold mb-2 text-gray-900 w-full"
                placeholder="Введите имя..."
                value={dataForm.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="text"
                className="text-lg font-medium text-gray-600 uppercase tracking-wide w-full"
                placeholder="Введите роль..."
                value={dataForm.general_info.role || ""}
                onChange={(e) => handleChange("general_info.role", e.target.value)}
              />
            </div>

            {showParButton ? (
              <button
                className="relative w-full px-6 py-3 rounded-lg font-semibold transition duration-100 cursor-pointer active:scale-95 bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                onClick={() => getPar(3, 10)}
              >
                Сгенерировать характеристики
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {params.map(({ label, path, value }, i) => (
                  <div key={label} className="bg-white rounded-lg shadow-sm p-5 flex flex-col items-center hover:shadow-md transition-shadow cursor-default">
                    <span className="text-xs font-semibold tracking-wider text-gray-500">{label}</span>
                    <input
                      type="text"
                      className="text-3xl font-bold mt-2 text-gray-900 w-full text-center"
                      value={value}
                      draggable
                      onDragStart={onDragStart(i)}
                      onDragOver={onDragOver}
                      onDrop={onDrop(i)}
                      onChange={(e) => handleChange(path, e.target.value)}
                      style={{ cursor: "grab" }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Основная информация</h2>
              {(!id && showInfoButton) ? (
                <button
                  className="relative w-full px-6 py-3 rounded-lg font-semibold transition duration-100 cursor-pointer active:scale-95 bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                  onClick={getInfo}
                >
                  Сгенерировать информацию о персонаже
                </button>
              ) : (
                <div className="space-y-3 text-gray-700">
                  {info.map(({ key, path, value }) => (
                    <div key={key} className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="font-medium">{key}:</span>
                      <input
                        type="text"
                        className="flex-1 text-right font-semibold"
                        value={value}
                        onChange={(e) => handleChange(path, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Производственные характеристики</h2>
              <div className="space-y-3 text-gray-700">
                {extraParams.map(({ key, path, value }) => (
                  <div key={key} className="flex justify-between border-b border-gray-300 pb-1">
                    <span className="font-medium">{key}:</span>
                    <input
                      type="text"
                      className="text-right font-semibold"
                      placeholder={key}
                      value={value}
                      onChange={(e) => handleChange(path, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={saveCharacter}
                disabled={!isOwner}
                className={`relative w-full px-6 py-3 rounded-lg font-semibold transition cursor-pointer duration-300 ease-in-out
                  ${isOwner
                    ? "bg-gray-300 text-gray-900 shadow-md border border-gray-400 hover:bg-gray-400"
                    : "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"}`}
              >
                Сохранить персонажа
              </button>
              {!id ? (
                <button
                  onClick={() => { dispatch(resetForm()); setInfoGenerated(false); }}
                  className="relative px-6 py-3 rounded-lg font-semibold transition cursor-pointer duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                >
                  Сбросить персонажа
                </button>
              ) : null}
            </div>
          </aside>

          <section className="flex-1 bg-white p-12 rounded-tr-2xl rounded-br-2xl shadow-inner flex flex-col">
            <div className="flex gap-6 mb-8 border-b border-gray-300 pb-4">
              {["О персонаже", "Оружие", "Навыки", "Части тела", "Здоровье", "Рюкзак"].map(
                (label, index) => (
                  <button
                    key={label}
                    className={`relative px-6 py-3 rounded-lg font-semibold transition cursor-pointer duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ${
                      index === curIndex
                        ? "bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } active:scale-95 no-underline`}
                    onClick={() => setCurIndex(index)}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-8 shadow-inner overflow-auto text-gray-700 text-base leading-relaxed">
              {getSection(curIndex)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
