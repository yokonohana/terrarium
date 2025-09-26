import React, { useEffect, useRef } from "react";
import Login from "./login.jsx";
import Register from "./register.jsx";

export default function Auth({ state, setAuthState }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickClose(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAuthState("idle");
      }
    }

    if (state && state !== "idle") {
      document.addEventListener("mousedown", handleClickClose);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickClose);
    };
  }, [state, setAuthState]);

  if (state === "idle") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {state === "login" && <Login state={state} setAuthState={setAuthState} />}
      {state === "register" && <Register state={state} setAuthState={setAuthState} />}
    </div>
  );
}
