"use client";
import FormPointer from "@/components/FormPoiner";
import Clock from "@/components/Clock";
import HeaderBar from "@/components/HeaderBar";
import { DateOffDay } from "@/utils/dates";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react"

const PointRegister: React.FC = () => {    
    const { point } = useContext(AuthContext)

    return (
        <>  
            <HeaderBar/>          
            <div
                className={`justify-start items-center min-h-screen  
                gap-8 flex flex-col pl-4 pr-4 pt-24 pb-16 bg-[#f5f5f5]`}
            >
                <div className={`lg:text-2xl text-lg font-semibold text-gray-400`}>{DateOffDay()}</div>
                <div className={`lg:text-5xl text-4xl font-bold text-black min-h-[55px] mt-[-30px]`}>
                    <Clock /></div>
                    {point ? (
                        point.map((obj, i) => (
                        <FormPointer key={i} point={obj} />
                     ))
                ) : (
                    <p className={`text-gray-400`}>Não há nada aqui!</p>
                )}                            
            </div>                        
        </>
    );
};

export default PointRegister;
