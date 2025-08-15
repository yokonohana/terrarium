import React from "react";
import Header from './header.jsx';
import Footer from './footer.jsx';

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[url('/img/background.png')] bg-cover bg-bottom min-h-screen filter blur-md" />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="flex flex-col text-white font-[Unbounded] w-200 justify-self-center mt-20">
            <h1 className="text-center text-[50px]">Террариум</h1>
            <p>
              Апокалипсис случился, постапокалипсис прошёл, но тьма осталась –
              вокруг людей и в людях. Отправляйся в странствия в жестоком,
              антиутопичном, не прощающем ошибок мире; создай своих персонажей
              – хороших, плохих, неоднозначных – и попытайся сделать
              ими хоть что-то значительное, прежде чем их сожрут монстры, или общество.
            </p>
            <button className="mt-3 mx-auto py-2 px-4 bg-slate-500 rounded-xl w-40 shadow-md/40">
              Подробней
            </button>
          </div>
          <div className="text-white font-[Unbounded] text-[40px] mt-20 mx-10">
            <h1>Новостная лента</h1>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
