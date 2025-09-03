import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../../store/charFormSlice.js";

export default function Skills({ value }) {
  const [openIndex, setOpenIndex] = useState(0);
  const skillsTabs = ["Боевые", "Профессиональные", "Разговорные"];
  const dispatch = useDispatch();
  const { skillsCombat, skillsProfessional, skillsDialogue } = value;
  let mappedArr;

  const [inputExpMap, setInputExpMap] = useState({});

  function getSkillCard(arr, path) {
    return (
      <div className="grid grid-cols-3 h-0 gap-4 mt-5">
        {arr.map((el, idx) => {
          const diffFactor = el.difficulty ? 2 : 1;
          let maxExp = (el.current_lvl * 20 + 20) * diffFactor;
          const progressBar = Math.min((el.current_exp / maxExp) * 100, 100);

          const addExp = () => {
            let expToAdd = Number(inputExpMap[idx]) || 0;
            let newExp = el.current_exp + expToAdd;
            let newLvl = el.current_lvl;

            if (newExp >= maxExp) {
              newLvl += 1;
              newExp = 0;
            };

            if (newExp < 0 && newLvl !== 0) {
              newLvl -= 1;
              maxExp = (newLvl * 20 + 20) * diffFactor;
              newExp = maxExp;
            };

            dispatch(updateField({ path: `${path}.${idx}.current_exp`, value: newExp }));
            dispatch(updateField({ path: `${path}.${idx}.current_lvl`, value: newLvl }));

            setInputExpMap({ ...inputExpMap, [idx]: "" });
          };

          return (
            <div key={idx} className="flex flex-col gap-3 bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-gray-800">
                  {el.name}
                </span>
                <span className="text-sm text-gray-500">{el.parameter}</span>
              </div>
              <div className="text-sm text-gray-600">{el.description}</div>
              <div className="text-xs font-medium text-gray-500">
                {el.difficulty ? "Сложный навык" : "Простой навык"}
              </div>

              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Уровень: {el.current_lvl}</span>
                  <span>
                    {el.current_exp}/{maxExp}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressBar}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                
                <input
                  type="number"
                  className="mt-2 px-3 w-full rounded-lg text-sm border text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Добавить опыт"
                  value={inputExpMap[idx] ?? ""}
                  onChange={(e) =>
                    setInputExpMap({ ...inputExpMap, [idx]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addExp();
                  }}
                />
                <button className="mt-2 px-3 py-1 rounded-lg text-sm font-medium border bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95 transition" onClick={addExp}>
                  Добавить опыт
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function getSkills(index) {
    switch (index) {
      case 0: {
        mappedArr = skillsCombat || [];
        return getSkillCard(mappedArr, 'skillsCombat');
      }
      case 1: {
        mappedArr = skillsProfessional || [];
        return getSkillCard(mappedArr, 'skillsProfessional');
      }
      case 2: {
        mappedArr = skillsDialogue || [];
        return getSkillCard(mappedArr, 'skillsDialogue');
      }
      default:
        return (
          <div className="flex items-center justify-center h-32 text-gray-400">
            Нет данных
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col relative w-full">
      <div className="flex flex-row gap-2">
        {skillsTabs.map((el, index) => (
          <section key={index} className="flex grow-1">
            <button
              className={`relative w-full px-6 py-3 rounded-xl font-semibold transition cursor-pointer duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ${
                index === openIndex
                  ? "bg-gray-200 text-gray-900 shadow-sm border border-gray-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } active:scale-95`}
              onClick={() => setOpenIndex(index)}
            >
              {el}
            </button>
          </section>
        ))}
      </div>
        {getSkills(openIndex)}
    </div>
  );
}
