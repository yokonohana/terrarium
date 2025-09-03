import React from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../../store/charFormSlice.js";

export default function Armor({ value }) {
  const { body_parts } = value;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center">
      <input className="font-extrabold text-3xl text-center mb-10" type="text" placeholder="Введите свое телосложение..."/>
      <div className="grid grid-cols-3 gap-4">
        {
          body_parts.map((el, ind) => (
            <div key={ind} className="flex flex-col overflow-hidden bg-white shadow-sm border border-gray-400 rounded-xl">
              {/* Верхняя градиентная полоска блока */}
              <div className="px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-300 border-b border-gray-400">
                <h1 className="font-semibold text-xl text-gray-600">{el.body_part_name}</h1>
              </div>

              <div className="flex flex-col px-4 py-3">
                {/* Название */}
                <input className="text-xl font-semibold mb-2" type="text" placeholder="Введите название..." value={el.armor_name}
                onChange={(e) => dispatch(updateField({path: `body_parts.${ind}.armor_name`, value: e.target.value}))}/>

                <span className="font-light">О БРОНЕ</span>

                <div className="flex flex-col">
                  {/* КБ */}
                  <div className="flex flex-row gap-2">
                    <span className="flex-shrink-0">Класс Брони:</span>
                    <input className="w-full" type="number" placeholder="класс брони..." value={el.armor_class}
                    onChange={(e) => dispatch(updateField({path: `body_parts.${ind}.armor_class`, value: e.target.value}))}/>
                  </div>

                  {/* Надежность */}
                  <div>
                    <div className="flex flex-row gap-2 mb-2">
                      <span>Надежность:</span>
                      <input className="w-full" type="number" placeholder="надежность..." value={el.durability}
                      onChange={(e) => dispatch(updateField({path: `body_parts.${ind}.durability`, value: e.target.value}))}/>
                    </div>
                  </div>
                </div>

                <span className="font-light">ЗДОРОВЬЕ</span>

                <div className="flex flex-col">
                  {/* Раны */}
                  <div>
                    <div className="flex flex-row gap-2">
                      <span>Урон:</span>
                      <input className="w-full" type="number" placeholder="урон..." value={el.dmg}
                      onChange={(e) => dispatch(updateField({path: `body_parts.${ind}.dmg`, value: e.target.value}))}/>
                    </div>
                  </div>

                  {/* Состояние части тела */}
                  <div>
                    <div className="flex flex-row gap-2">
                      <span>Ранение:</span>
                      <input className="w-full" type="text" placeholder="состояние..." value={el.status}
                      onChange={(e) => dispatch(updateField({path: `body_parts.${ind}.status`, value: e.target.value}))}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}