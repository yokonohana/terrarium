import React from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../../store/charFormSlice.js";

export default function Persona({ value }) {
  const dispatch = useDispatch();
  const persona = value?.persona || {};

  const handleChange = (path, val) => {
    dispatch(updateField({ path, value: val }));
  };

  const blocks = [
    { title: "Внешний вид", path: "persona.look", placeholder: "Описание внешнего вида", value: persona.look },
    { title: "Семья", path: "persona.family", placeholder: "Описание семьи", value: persona.family },
    { title: "Репутация", path: "persona.reputation", placeholder: "Описание репутации", value: persona.reputation },
    { title: "Характер", path: "persona.personality", placeholder: "Описание личности", value: persona.personality },
    { title: "Пятилетки", path: "persona.aroundtheyears", placeholder: "Описание пятилеток", value: persona.aroundtheyears },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {blocks.map((b) => (
        <div
          key={b.path}
          className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg"
        >
          <div className="px-5 py-3 border-b border-gray-400 bg-gradient-to-r from-gray-100 to-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">{b.title}</h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder={b.placeholder}
              value={b.value || ""}
              onChange={(e) => handleChange(b.path, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
