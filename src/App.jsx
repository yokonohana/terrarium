import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home.jsx'
import Character from './components/character.jsx'
import CharactersList from './components/characterslist.jsx'
import Rules from './components/rules.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/character" element={<Character />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/characterslist" element={<CharactersList />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  )
};