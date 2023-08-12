'use client'
import { createContext, useState } from "react";
import { setCookie } from "nookies";
import Router from 'next/router'

type SigInData = {
    email : string;
    password: string;
}

type User = {
    _id : string;
    company: string;
    workday: string;
    name: string;
    lastName: string;
    cpf: string;
    rg: string;
    pis:string;
    father_name: string;
    mother_name: string;
    date_of_birth: Date;
    phone: string;
    email: string;
    department: string;
    office: string;
    createdAt: Date;
    updatedAt: Date;
    age: number;
    id: string;
    token: string;
} | null;

type Point = {
    _id: string; 
	user_id: string;
	edited: boolean;
	hours_tot_prev_day: number;
	is_active_init: boolean;
	is_active: boolean;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	hours_1: number;
	hours_2: number;
	hours_tot_1: number;
	hours_3: number;
	hours_4: number;
	hours_tot_2: number;
	hours_tot_day: number;
	hours_f_s: number;
	__v: number;
}[] | null;

type AuthContextType = {
    isAuthenticated : boolean;
    user: User;
    point: Point;
    SigIn: (data: SigInData) => Promise<void>
}

const url_auth_user = "http://localhost:4113/auth/user_auth";


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : { children: React.ReactNode }) {
    
    const [user, setUser] = useState<User | null>(null)
    const [point, setPoint] = useState<Point | null>(null)

    const isAuthenticated = !!user;

    async function SigIn({ email, password }: SigInData) {
        try {
            const response = await fetch(url_auth_user, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                setUser(null)                
                throw new Error('Credenciais inválidas!');
            }
    
            const { userResponse, points,  token } = await response.json();
    
            setCookie(undefined, 'thirteenToken', token, {
                maxAge: 60 * 60 * 1, // 1Hr
            });
    
            setUser(userResponse)
            setPoint(points)            
        } catch (error) {
            console.error('Erro na requisição!:', error);
        }
        if(user)
            Router.push('/point_register');            
    }    

    return (
        <AuthContext.Provider value={{user, point, isAuthenticated, SigIn}}>            
            {children}
        </AuthContext.Provider>
    )
}
