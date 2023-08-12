"use client";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/divLogin.module.css";

const PageLogin = () => {
    const { register, handleSubmit } = useForm();
    const { SigIn } = useContext(AuthContext);

    async function handleSigIn(data: any) {
        await SigIn(data);
    }

    return (                
        <div
            className={`flex items-center justify-center h-[90vh] bg-[url('/images/clockBG.jpg')]
         bg-no-repeat bg-cover bg-top ${styles.divLogin}`}
        >
            <form
                className={`bg-[#d9d8e0] shadow-2xl rounded-md px-8 pt-6 pb-8 mb-4 z-10`}
                onSubmit={handleSubmit(handleSigIn)}
            >
                <div className={`mb-4`}>
                    <label
                        className={`block text-slate-900 text-sm font-bold mb-2`}
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        {...register("email")}
                        className={`shadow appearance-none border rounded-md w-full py-2 px-3
                         text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email_address"
                        name="email"
                        type="email"
                        autoComplete="current-email"
                        required
                        placeholder="Email"
                    />
                </div>
                <div className={`mb-6`}>
                    <label
                        className={`block text-slate-900 text-sm font-bold mb-2`}
                        htmlFor="password"
                    >
                        Senha
                    </label>
                    <input
                        {...register("password")}
                        className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password_login"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                    />
                </div>
                <div className={`flex items-center justify-center`}>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 
                        rounded-md focus:outline-none focus:shadow-outline`}
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>              
    )
}

export default PageLogin
