import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalStatus } from '../../../store/ruleSlice.js'

export default function HealthRuleCore() {
  const status = useSelector(state => state.rules.status);
  const dispacth = useDispatch();

  return (
    <div className={`transition-all duration-500 overflow-hidden ${status === "health" ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="flex flex-row justify-center mx-50 gap-x-10 p-4">
        <div className="flex flex-col w-50 bg-red-400 p-4 rounded-md shadow-md/50" onClick={() => dispacth(setModalStatus('health'))}>
          <h1 className="font-bold text-white">ТИПЫ РАНЕНИЙ</h1>
          <hr className="text-white border-[1px] mb-2" />
          <p className="text-white text-justify font-[Jost] text-base/4 mb-2">
            Все, что нужно знать, о типах ранений...
          </p>
          <button className="text-white text-end font-[Jost] text-base/4">
            Подробнее...
          </button>
        </div>
        <div className="flex flex-col w-50 bg-red-400 p-4 rounded-md shadow-md/50">
          <h1 className="font-bold text-white">ИММУНИТЕТ</h1>
          <hr className="text-white border-[1px] mb-2" />
          <p className="text-white text-justify font-[Jost] text-base/4 mb-2">
            Все, что нужно знать, об иммунитете...
          </p>
          <button className="text-white text-end font-[Jost] text-base/4">
            Подробнее...
          </button>
        </div>
        <div className="flex flex-col w-50 bg-red-400 p-4 rounded-md shadow-md/50">
          <h1 className="font-bold text-white">ПСИХИКА</h1>
          <hr className="text-white border-[1px] mb-2" />
          <p className="text-white text-justify font-[Jost] text-base/4 mb-2">
            Все, что нужно знать, о психике...
          </p>
          <button className="text-white text-end font-[Jost] text-base/4">
            Подробнее...
          </button>
        </div>
      </div>
    </div>
  );
}
