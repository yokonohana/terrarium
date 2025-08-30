import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../store/charFormSlice.js";

export default function Persona() {
    const dispatch = useDispatch();
    const health = useSelector((state) => state.characterForm.form.health);
    
    const handleChange = (path, value) => {
      dispatch(updateField({ path, value }));
    };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Психика */}
      <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
        <div className="px-5 py-3 bg-linear-to-r from-gray-100 to-gray-300 border-b border-gray-400">
          <h2 className="text-lg font-semibold text-gray-800">Психика</h2>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Уровень психики
              </span>
              <input type="number" value={health.mentality_lvl ?? ""} onChange={(e) => handleChange("health.mentality_lvl", Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Урон психики
              </span>
              <input type="number" value={health.mentality_dmg ?? ""} onChange={(e) => handleChange("health.mentality_dmg", Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
            </label>
          </div>

          <label className="flex flex-col gap-1 border-t border-gray-200 pt-4">
            <span className="text-sm font-medium text-gray-700">Психозы</span>
            <textarea rows={3} value={health.manetality_status ?? ""} onChange={(e) => handleChange("health.manetality_status", e.target.value)}
            placeholder="Опишите психозы..." className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"/>
          </label>
        </div>
      </div> 

      {/* Иммунитет */}
      <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
        <div className="px-5 py-3 bg-linear-to-r from-gray-100 to-gray-300 border-b border-gray-400">
          <h2 className="text-lg font-semibold text-gray-800">Иммунитет</h2>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Уровень иммунитета
              </span>
              <input type="number" value={health.immunity_lvl ?? ""} onChange={(e) => handleChange("health.immunity_lvl", Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Урон иммунитету
              </span>
              <input type="number" value={health.immunity_dmg ?? ""} onChange={(e) => handleChange("health.immunity_dmg", Number(e.target.value))}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
            </label>
          </div>

          <label className="flex flex-col gap-1 border-t border-gray-200 pt-4">
            <span className="text-sm font-medium text-gray-700">Болезни</span>
            <textarea rows={3} value={health.immunity_status ?? ""} onChange={(e) => handleChange("health.immunity_status", e.target.value)}
            placeholder="Опишите болезни..." className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"/>
          </label>
        </div>
      </div>

      {/* Мутации */}
      <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
        <div className="px-5 py-3 bg-linear-to-r from-gray-100 to-gray-300 border-b border-gray-400">
          <h2 className="text-lg font-semibold text-gray-800">Мутации</h2>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Уровень мутации
            </span>
            <input type="number" value={health.mutations_lvl ?? ""} onChange={(e) => handleChange("health.mutations_lvl", Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
          </label>

          <label className="flex flex-col gap-1 border-t border-gray-200 pt-4">
            <span className="text-sm font-medium text-gray-700">
              Текущие мутации
            </span>
            <textarea rows={3} value={health.mutations_status ?? ""} onChange={(e) => handleChange("health.mutations_status", e.target.value)}
            placeholder="Опишите мутации..." className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y"/>
          </label>
        </div>
      </div>
    </div>
  );
}
