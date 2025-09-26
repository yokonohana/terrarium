import React from "react";
import { FaDiscord } from "react-icons/fa";
import { SiRoll20 } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-gray-900 border-t border-gray-700 text-gray-400 font-[Unbounded] py-2 px-8 grid grid-cols-3 items-center min-w-full select-none text-xs">
      <div className="flex flex-row justify-start gap-x-6">
        <div className="flex flex-col space-y-0.5">
          <p className="font-semibold text-sky-400 uppercase tracking-wide">Команда разработки:</p>
          <p className="text-gray-300"><span className="font-medium text-sky-300">UI/UX-дизайн:</span> serfick, Bogdan</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <p className="text-gray-300"><span className="font-medium text-sky-300">Frontend/Backend:</span> Daytona</p>
          <p className="text-gray-300"><span className="font-medium text-sky-300">Помощник:</span> IkoMaster</p>
        </div>
      </div>
      <div className="text-center font-semibold text-white text-xs tracking-wide">
        <p>2025 г.</p>
        <p>ТЕРРАРИУМ</p>
      </div>
      <div className="flex justify-end gap-5">
        <a href="https://discord.gg/rMr8HbB6FX" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 text-gray-400 hover:text-sky-400 transition-colors duration-200">
          <FaDiscord className="text-lg" />
          <span>Discord</span>
        </a>
        <a href="https://app.roll20.net/campaigns/details/18604629/tierrarium" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 text-gray-400 hover:text-sky-400 transition-colors duration-200">
          <SiRoll20 className="text-lg" />
          <span>Roll20</span>
        </a>
      </div>
    </footer>
  );
}
