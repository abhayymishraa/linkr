"use client";

import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";

export default function Appbar() {
  const router = useRouter();

  return (
    <div className="flex border-b p-2 justify-between ">
      <div className=" flex items-center pl-5 text-xl font-extrabold text-center cursor-pointer" onClick={()=>router.push("/")}>
        <p className="text-[#ff4f00] font-extrabold">_</p>Linkr
      </div>
      <div className="flex gap-2 pr-4">
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        <LinkButton onClick={() => router.push("/login")}> Login</LinkButton>
        <PrimaryButton size="small" onClick={() => router.push("/signup")}>
          Signup
        </PrimaryButton>
      </div>
    </div>
  );
}
  