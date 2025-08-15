import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../store/ruleSlice.js"; // путь подстрой под свой проект
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import HealthRuleCore from "./rules_components/healthCoreRule.jsx";
import ParametersRuleCore from "./rules_components/parametersCoreRule.jsx";
import HealthCoreRuleModal from "./rules_components/modal/healthCoreRuleModal.jsx";

export default function Rules() {
  const dispatch = useDispatch();
  const modalStatus = useSelector(state => state.rules.statusModal);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex flex-col flex-1 bg-blue-100 w-full">
        <div className="text-white font-bold bg-red-400 py-2 px-4 shadow-md/50 cursor-pointer select-none" onClick={() => dispatch(setStatus("health"))}>
          <h1 className="text-center text-3xl">ЗДОРОВЬЕ</h1>
        </div>
        <HealthRuleCore />
        {modalStatus === 'health' ? <HealthCoreRuleModal /> : null}
        <div className="text-white font-bold bg-blue-400 py-2 px-4 shadow-md/50 cursor-pointer select-none" onClick={() => dispatch(setStatus("stats"))}>
          <h1 className="text-center text-3xl">ХАРАКТЕРИСТИКИ</h1>
        </div>
        <ParametersRuleCore />
      </main>
      <Footer />
    </div>
  );
}
