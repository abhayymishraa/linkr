"use client"
import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";


export const Borderbutton = ({ children, onClick }: {children:ReactNode, onClick: () => void}) =>{


    return <div className="px-6 flex items-center justify-center gap-2   py-2 rounded-full border-2 border-gray-400 hover:border-black text-md cursor-pointer font-medium"  onClick={onClick} >
        <FcGoogle />
        {children}
    </div>

}  