"use client"
import { ReactNode } from "react";


export const LinkButton = ({ children, onClick }: {children:ReactNode, onClick: () => void}) =>{


    return <div className=" flex justify-center px-2 py-2 rounded-md  text-sm  hover:bg-[#ebe9df] cursor-pointer font-light"  onClick={onClick} >
        {children}
    </div>

}  