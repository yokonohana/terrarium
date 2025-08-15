import React from "react";
import { useDispatch } from "react-redux";
import { setModalStatus } from '../../../../store/ruleSlice.js'

export default function HealthRuleCore() {
  const dispatch = useDispatch();
  return (
    <main className="fixed text-white inset-0 m-auto h-190 w-200 bg-slate-800 shadow-2xl/70 rounded-md p-5 overflow-y-auto">
      <h1 className="text-center font-bold text-5xl m-auto" onClick={() => dispatch(setModalStatus(null))}>РАНЕНИЯ</h1>
      <hr className="mt-2 mb-4 border-2 rounded-2xl"/>
      <div className="flex flex-col text-xl">
        <p>ㅤЗдоровье в Террариуме представляет собой шкалу накапливающегося урона в зависимости от телосложения.
          Чем лучше телосложение, тем выше порог для получения ранений.
        </p>
        <p className="font-bold">ㅤТипы телосложений:</p>
        <ul className="list-decimal pl-6">
          <li><i>Очень слабое телосложение (ОСл)</i> - телосложение 1-2.</li>
          <li><i>Слабое телосложение (Сл)</i> - телосложение 3-4.</li>
          <li><i>Среднее телосложение (Ср)</i> - телосложение 5-7.</li>
          <li><i>Крепкое телосложение (Кр)</i> - телосложение 8-9.</li>
          <li><i>Очень крепкое телосложение (ОКр)</i> - телосложение 10.</li>
        </ul>
        <p>ㅤСуществуют 5 типов ранений, их особенности и способы лечения. Рассмотрим подробно о каждом.</p>
      </div>
      <div>
        <h1 className="font-bold text-3xl text-center">Легкое ранение (ЛР)</h1>
        <hr className="mt-2 mb-4 text-white border-2 rounded-2xl"/>
        <main className="mb-5">
          <h2 className="font-bold">ОПИСАНИЕ</h2>
          <p className="mb-5">Обычный синяк, ссадина, ушиб. Часто проходит в течении дня.</p>
          <h2 className="font-bold">ЛЕЧЕНИЕ</h2>
          <p>Рана будет заживать на 1 ед. для каждой части тела при отдыхе. Обычное зелье восстанавливает дополнительные 2 единицы здоровья, хорошее - 4 единицы, а хорошо приготовленная пища - еще дополнительно 2 единицы.</p>
        </main>
      </div>
      <div>
        <h1 className="font-bold text-3xl text-center">Серьезное ранение (СР)</h1>
        <hr className="mt-2 mb-4 text-white border-2 rounded-2xl"/>
        <main>
          <h2 className="font-bold">ОПИСАНИЕ</h2>
          <p className="mb-5">Страннику плохо: у него сперло дыхание, движения затруднены. Чтобы не выбыть из боя на 1 раунд, пройдите проверку на Силу Воли в зависимости от части тела:</p>
          <ul>
            <li>Конечности - легкая проверка.</li>
            <li>Туловище - средняя проверка.</li>
            <li>Голова - сложная проверка.</li>
          </ul>
          <p>При неуспешном прохождении странник падает без сознания на 1 раунд</p>
          <p>В зависимости от раненной части тела, странник получает осложнения:</p>
          <ul>
            <li>Туловище - 2 ОСЛ. к Телосложению, Иммунитету и навыкам, связанных с физической нагрузкой. 1 осл. к Активности., а также -2 ед. к грузоподъемности.</li>
            <li>Руки - 1 ОСЛ. к Телосложению, Активности, Иммунитету и проверкам всех боевых навыков, а также навыков завязанных на ловкости рук. Сила удара уменьшается в два раза. При ранении двух рук - -1ед. грузоподъемности.</li>
            <li>Ноги - 2 ОСЛ. к Активности и 1 ОСЛ. к Телосложению и Иммунитету. Скорость уменьшается в два раза. При ранении двух ног, все увеличивается в два раза и грузоподъемность -2.</li>
            <li>Голова - 2 ОСЛ. к сложности проверок всех характеристик и навыков. 1 ОСЛ. к проверкам Психики и Иммунитета.</li>
          </ul>
          <h2 className="font-bold">ЛЕЧЕНИЕ</h2>
        </main>
      </div>
        {/* <h1 className="font-bold text-3xl text-center">Критическое ранение (КР)</h1>
        <hr className="mt-2 mb-4 text-white border-2 rounded-2xl"/>
        <h1 className="font-bold text-3xl text-center">Смертельное ранение (СмР)</h1>
        <hr className="mt-2 mb-4 text-white border-2 rounded-2xl"/>
        <h1 className="font-bold text-3xl text-center">Кровавая баня (КБ)</h1> */}
    </main>
  );
}
