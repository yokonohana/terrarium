import React, { useEffect, useRef } from "react";
import Login from './login.jsx';
import Register from './register.jsx';

export default function Auth({ state, setAuthState }) {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickClose(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAuthState('idle');
      }
    };

    if (state) {
      document.addEventListener("mousedown", handleClickClose);
    };

    return () => {
      document.removeEventListener("mousedown", handleClickClose);
    };
  }, [state, setAuthState]);

  switch (state) {
    case 'login':
      return <Login state={state} setAuthState={setAuthState}/>
    case 'register':
      return <Register state={state} setAuthState={setAuthState}/>
    case 'idle':
      return (
        <></>
      );
    default:
      return (
        <></>
      )
  }
}