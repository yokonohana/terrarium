import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register({ state, setAuthState }) {
  const modalRef = useRef(null);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  useEffect(() => {
    function handleClickClose(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAuthState("idle");
      }
    }

    if (state) document.addEventListener("mousedown", handleClickClose);
    return () => document.removeEventListener("mousedown", handleClickClose);
  }, [state, setAuthState]);

  const onRegister = async (data) => {
    setApiError("");
    try {
      const response = await axios.post("/api/user/register", data);
      alert(response.data.message);
      setAuthState("idle");
    } catch (e) {
      if (e.response?.data?.message) {
        setApiError(e.response.data.message);
      } else {
        setApiError("Ошибка соединения с сервером");
        console.error(e);
      }
    }
  };

  return (
    <form
    ref={modalRef}
    onSubmit={handleSubmit(onRegister)}
    className="flex flex-col gap-3 bg-gray-100 overflow-hidden p-5 min-w-100 rounded-xl shadow-xl shadow-neutral-800">
      <div className="justify-center mb-5">
        <h1 className="text-2xl font-semibold text-center">Регистрация на сайте</h1>
      </div>

      <div className="flex flex-col shadow-md shadow-pink-200">
        <label className="inline-block font-semibold bg-black text-white text-center rounded-tr-md rounded-tl-md px-2 w-3/10">логин</label>
        <input
        {...register("login", { required: "Введите логин" })}
        className="bg-white h-10 rounded-bl-md rounded-tr-md rounded-br-md border-2 border-black px-2" />
        {errors.login && (
          <span className="text-red-500 text-sm">{errors.login.message}</span>
        )}
      </div>

      <div className="flex flex-col shadow-md shadow-sky-200 mt-3">
        <label className="inline-block font-semibold bg-black text-white text-center rounded-tr-md rounded-tl-md px-2 w-3/10">пароль</label>
        <input
        {...register("password", { required: "Введите пароль" })}
        className="bg-white h-10 rounded-bl-md rounded-tr-md rounded-br-md shadow-xs border-2 px-2 border-black" type="password"/>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>

      {apiError && (
        <span className="text-red-500 text-sm text-center mt-2">{apiError}</span>
      )}

      <button
      type="submit"
      className="bg-black px-5 py-3 text-white rounded-xl cursor-pointer mt-5 w-1/2 m-auto font-semibold" >
        зарегистрироваться
      </button>
    </form>
  );
}
