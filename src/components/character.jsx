import React, { useState } from "react";
import Header from './header.jsx';
import Footer from './footer.jsx';
import Weapon from './char_content/weapon.jsx';
import Skills from './char_content/skills.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getRandom, getAge, getCountry, getPoliticalView, getReligionView, getSex } from '../tools.js'
import { updateField } from '../../store/charFormSlice.js'

export default function Character() {
  const charForm = useSelector(state => state.characterForm);
  const { form } = charForm;
  const dispatch = useDispatch();

  const [statusPar, setStatusPar] = useState(false);
  const [statusInfo, setStatusInfo] = useState(false);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const params = [
    { label: "ТЕЛОСЛОЖЕНИЕ", path: "parameters.strenght", value: form.parameters.strenght },
    { label: "СИЛА ВОЛИ", path: "parameters.willpower", value: form.parameters.willpower },
    { label: "ИНТЕЛЛЕКТ", path: "parameters.intelligence", value: form.parameters.intelligence },
    { label: "АКТИВНОСТЬ", path: "parameters.activity", value: form.parameters.activity },
  ];

  const info = [
    { key: "Политические взгляды", path: "general_info.political_view", value: form.general_info.political_view },
    { key: "Религиозные взгляды", path: "general_info.religion_view", value: form.general_info.religion_view },
    { key: "Родина", path: "general_info.country", value: form.general_info.country },
    { key: "Пол", path: "general_info.sex", value: form.general_info.sex },
    { key: "Возраст", path: "general_info.age", value: form.general_info.age },
  ];

  const extraParams = [
    { key: "Сила удара", path: "parameters.impact_force", value: form.parameters.impact_force },
    { key: "Количество ударов", path: "parameters.quantity_attacks", value: form.parameters.quantity_attacks },
    { key: "Удача", path: "parameters.luck", value: form.parameters.luck },
    { key: "Скорость", path: "parameters.speed", value: form.parameters.speed },
    { key: "Гены", path: "parameters.genes", value: form.parameters.genes },
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

    dispatch(updateField({ path: params[draggedIndex].path, value: valueDropped }));
    dispatch(updateField({ path: params[index].path, value: valueDragged }));

    setDraggedIndex(null);
  };

  function getPar(min, max) {
    dispatch(updateField({ path: 'parameters.strenght', value: getRandom(min, max) }));
    dispatch(updateField({ path: 'parameters.willpower', value: getRandom(min, max) }));
    dispatch(updateField({ path: 'parameters.intelligence', value: getRandom(min, max) }));
    dispatch(updateField({ path: 'parameters.activity', value: getRandom(min, max) }));

    setStatusPar(true);
  };

  function getInfo() {
    dispatch(updateField({ path: 'general_info.political_view', value: getPoliticalView() }));
    dispatch(updateField({ path: 'general_info.religion_view', value: getReligionView() }));
    dispatch(updateField({ path: 'general_info.country', value: getCountry() }));
    dispatch(updateField({ path: 'general_info.sex', value: getSex() }));
    dispatch(updateField({ path: 'general_info.age', value: getAge() }));

    setStatusInfo(true);
  };

  const [ curIndex, setCurIndex ] = useState(0);

  function getSection(index) {
    switch (index) {
      case 0:
        return <Weapon />
      case 1:
        return <Skills />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />

      <main className="flex-1 flex justify-center items-start py-12 px-8 sm:px-16">
        <div className="flex w-full max-w-[90rem] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <aside className="w-1/3 bg-gray-100 p-10 flex flex-col gap-8 border-r border-gray-300">
            <div>
              <input type="text" className="text-4xl font-extrabold mb-2 text-gray-900 w-full" placeholder="Введите имя..." value={form.name} onChange={() => dispatch(updateField({ path: 'name', value: form.name }))} />
              <input type="text" className="text-lg font-medium text-gray-600 uppercase tracking-wide w-full" placeholder="Введите роль..." value={form.general_info.role} onChange={() => dispatch(updateField({ path: 'general_info.role', value: form.general_info.role }))} />
            </div>

            {!statusPar ? (
              <button className="relative w-full px-6 py-3 rounded-lg font-semibold transition duration-100 cursor-pointer active:scale-95 bg-gray-300 text-gray-900 shadow-md border border-gray-400" onClick={() => getPar(3, 10)}>
                Сгенерировать характеристики
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {params.map(({ label, path, value }, i) => (
                  <div
                    key={label}
                    className="bg-white rounded-lg shadow-sm p-5 flex flex-col items-center hover:shadow-md transition-shadow cursor-default"
                  >
                    <span className="text-xs font-semibold tracking-wider text-gray-500">{label}</span>
                    <input type="text" className="text-3xl font-bold mt-2 text-gray-900 w-full text-center" value={value}
                      draggable
                      onDragStart={onDragStart(i)}
                      onDragOver={onDragOver}
                      onDrop={onDrop(i)}
                      onChange={e => dispatch(updateField({ path, value: e.target.value }))}
                      style={{ cursor: "grab" }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Основная информация</h2>
              {!statusInfo ? (
                <button
                  className="relative w-full px-6 py-3 rounded-lg font-semibold transition duration-100 cursor-pointer active:scale-95 bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                  onClick={() => getInfo()}>
                  Сгенерировать информацию о персонаже
                </button>
              ) : (
                <div className="space-y-3 text-gray-700">
                  {info.map(({ key, path, value }) => (
                    <div key={key} className="flex justify-between border-b border-gray-300 pb-1">
                      <span className="font-medium">{key}:</span>
                      <input type="text" className="flex-1 text-right font-semibold" value={value} onChange={e => dispatch(updateField({ path, value: e.target.value }))}/>
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
                    <input type="text" className="text-right font-semibold" value={value} onChange={e => dispatch(updateField({ path, value: e.target.value }))}/>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-1 bg-white p-12 rounded-tr-2xl rounded-br-2xl shadow-inner flex flex-col">
            <div className="flex gap-6 mb-8 border-b border-gray-300 pb-4">
              {["Оружие", "Навыки", "Броня", "Здоровье", "Заметки"].map((label, index) => (
                <button
                  key={label}
                  className={`relative px-6 py-3 rounded-lg font-semibold transition cursor-pointer duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ${
                    index === curIndex
                      ? "bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } active:scale-95 no-underline`}
                  style={{ textDecoration: "none" }}
                  onClick={() => setCurIndex(index)}
                >
                  {label}
                  <span aria-hidden="true" className="underline"></span>
                </button>
              ))}
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
