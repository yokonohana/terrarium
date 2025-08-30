import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../store/charFormSlice.js";

export default function Backpack() {
  const dispatch = useDispatch();
  const backpack = useSelector((state) => state.characterForm.form.backpack);

  const handleChange = (path, value) => {
    const numberFields = [
      "backpack.backpack_maxsize","backpack.backpack_cursize",
      "backpack.gasmask_electric","backpack.gasmask_fire","backpack.gasmask_poison",
      "backpack.overalls_electric","backpack.overalls_fire","backpack.overalls_poison"
    ];
    if(numberFields.includes(path)) value = Number(value) || 0;
    dispatch(updateField({ path, value }));
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Противогаз и Спецодежда */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
          <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
            <h2 className="text-lg font-semibold text-gray-800">Противогаз</h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Название</label>
              <input placeholder="Название" className={inputClass} value={backpack.gasmask||""} onChange={e=>handleChange("backpack.gasmask", e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Электр.</label>
                <input type="number" className={inputClass} value={backpack.gasmask_electric||""} onChange={e=>handleChange("backpack.gasmask_electric", Number(e.target.value))}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Огонь</label>
                <input type="number" className={inputClass} value={backpack.gasmask_fire||""} onChange={e=>handleChange("backpack.gasmask_fire", Number(e.target.value))}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Яд</label>
                <input type="number" className={inputClass} value={backpack.gasmask_poison||""} onChange={e=>handleChange("backpack.gasmask_poison", Number(e.target.value))}/>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
          <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
            <h2 className="text-lg font-semibold text-gray-800">Спецодежда</h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Название</label>
              <input placeholder="Название" className={inputClass} value={backpack.overalls||""} onChange={e=>handleChange("backpack.overalls", e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Электр.</label>
                <input type="number" className={inputClass} value={backpack.overalls_electric||""} onChange={e=>handleChange("backpack.overalls_electric", Number(e.target.value))}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Огонь</label>
                <input type="number" className={inputClass} value={backpack.overalls_fire||""} onChange={e=>handleChange("backpack.overalls_fire", Number(e.target.value))}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Яд</label>
                <input type="number" className={inputClass} value={backpack.overalls_poison||""} onChange={e=>handleChange("backpack.overalls_poison", Number(e.target.value))}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кошелёк и Банк */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
          <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
            <h2 className="text-lg font-semibold text-gray-800">Кошелёк</h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <input className={inputClass} value={backpack.wallet||""} onChange={e=>handleChange("backpack.wallet", e.target.value)}/>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
          <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
            <h2 className="text-lg font-semibold text-gray-800">Банк</h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <input className={inputClass} value={backpack.bank || ""} onChange={e=>handleChange("backpack.bank", e.target.value)}/>
          </div>
        </div>
      </div>

      {/* Рюкзак */}
      <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-400 overflow-hidden transition hover:shadow-lg">
        <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
          <h2 className="text-lg font-semibold text-gray-800">Рюкзак</h2>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Название</label>
            <input placeholder="Тип рюкзака" className={inputClass} value={backpack.backpack||""} onChange={e=>handleChange("backpack.backpack", e.target.value)}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Текущий вес</span>
              <input type="number" className={inputClass} value={backpack.backpack_cursize||""} onChange={e=>handleChange("backpack.backpack_cursize", Number(e.target.value))}/>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Максимальный вес</span>
              <input type="number" className={inputClass} value={backpack.backpack_maxsize||""} onChange={e=>handleChange("backpack.backpack_maxsize", Number(e.target.value))}/>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Содержимое</label>
            <textarea rows={5} value={backpack.backpack_items} 
              onChange={(e)=>handleChange("backpack.backpack_items", e.target.value)} 
              placeholder="Введите предметы построчно" 
              className={inputClass}/>
          </div>
        </div>
      </div>

    </div>
  );
}
