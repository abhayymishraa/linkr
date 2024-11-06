"use client"
import { ReactNode } from "react";


export const ButtonGray = ({ children, onClick }: {children:ReactNode, onClick: () => void}) =>{


    return <div className="p-1 rounded-full text-xs  bg-[#f0f1fa] cursor-pointer font-normal"  onClick={onClick} >
        {children}
    </div>

}  