import React from "react";
import { useSelector } from "react-redux";

export default function ParametersRuleCore() {
  const status = useSelector(state => state.rules.status);

  return (
    <div className={`transition-all duration-500 overflow-hidden ${status === "stats" ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="flex flex-row justify-center mx-50 gap-x-10 p-4">
        <div className="flex flex-col w-50 bg-blue-400 p-4 rounded-md shadow-md/50">
          <h1 className="font-bold text-white">ОСНОВНЫЕ ХАРАКТЕРИСТИКИ</h1>
          <hr className="text-white border-[1px] mb-2" />
          <p className="text-white text-justify font-[Jost] text-base/4 mb-2">
            Все, что нужно знать, об основных характе- ристиках...
          </p>
          <button className="text-white text-end font-[Jost] text-base/4">
            Подробнее...
          </button>
        </div>
        <div className="flex flex-col w-50 bg-blue-400 p-4 rounded-md shadow-md/50">
          <h1 className="font-bold text-white">ПРОИЗВОДНЫЕ ХАРАКТЕРИСТИКИ</h1>
          <hr className="text-white border-[1px] mb-2" />
          <p className="text-white text-justify font-[Jost] text-base/4 mb-2">
            Все, что нужно знать, о производных характе- ристиках...
          </p>
          <button className="text-white text-end font-[Jost] text-base/4">
            Подробнее...
          </button>
        </div>
      </div>
    </div>
  );
}
