import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../../store/charFormSlice.js';

export default function Weapon() {
  const [openIndex, setOpenIndex] = useState(0);
  const weapons = useSelector((state) => state.characterForm.form.weapons);
  const dispatch = useDispatch();

  const currentWeapon = weapons[openIndex] || {};

  const weaponParams = currentWeapon
    ? [
        { key: "Название", path: `weapons.${openIndex}.name`, value: currentWeapon.name || '' },
        { key: "Редкость", path: `weapons.${openIndex}.rarity`, value: currentWeapon.rarity || '' },
        { key: "Тип", path: `weapons.${openIndex}.type`, value: currentWeapon.type || '' },
        { key: "Дальность", path: `weapons.${openIndex}.distance`, value: currentWeapon.distance || '' },
        { key: "Отдача", path: `weapons.${openIndex}.recoil`, value: currentWeapon.recoil || '' },
        { key: "Выстрелов", path: `weapons.${openIndex}.shots`, value: currentWeapon.shots || '' },
        { key: "Пулевой залп", path: `weapons.${openIndex}.burst`, value: currentWeapon.burst || '' },
        { key: "Магазин", path: `weapons.${openIndex}.magazine`, value: currentWeapon.magazine || '' },
        { key: "Калибр", path: `weapons.${openIndex}.caliber`, value: currentWeapon.caliber || '' },
        { key: "Надёжность", path: `weapons.${openIndex}.reliability`, value: currentWeapon.reliability || '' },
        { key: "Перезарядка", path: `weapons.${openIndex}.reload`, value: currentWeapon.reload || '' },
      ]
    : [];

  return (
    <div className="flex flex-col relative w-full">
      <div className="flex flex-row gap-2">
        {weapons.map((el, index) => (
          <section key={index} className="flex grow-1">
            <button
              className={`relative w-full px-6 py-3 rounded-lg font-semibold transition cursor-pointer duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ${
                index === openIndex
                  ? "bg-gray-300 text-gray-900 shadow-md border border-gray-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } active:scale-95 no-underline`}
              onClick={() => setOpenIndex(index)}
            >
              Слот {index + 1}
            </button>
          </section>
        ))}
      </div>

      {currentWeapon && (
        <div className="mt-10">
          <h1 className='text-center font-extrabold text-2xl mb-2'>СЛОТ {openIndex + 1}</h1>
          {weaponParams.map(({ key, path, value }) => (
            <div key={key} className="flex justify-between border-b border-gray-300 mb-2 mx-10">
              <span className="font-medium">{key}:</span>
              <input
                className="w-1/2 text-right font-semibold"
                value={value}
                onChange={(e) => dispatch(updateField({ path, value: e.target.value }))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
