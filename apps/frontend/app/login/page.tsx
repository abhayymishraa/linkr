"use client";
import { useState } from "react";
import Appbar from "../../components/Appbar";
import { Input } from "../../components/Input";
import  axios from 'axios'
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [email,setEmail] =  useState("");
    const [password,setPassword] = useState("");


    const handleFormSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
          username: email,
          password: password    
      })
      localStorage.setItem("token",res.data.token);
      router.push("/dashboard");
    }

  return (
    <>
      <Appbar />
      <div className="flex justify-center gap-2 items-center pt-8 ">
        <div className="pt-20 max-w-xl  pr-20 ">
          <div className="font-bold text-3xl">
             Automate across your teams
          </div>
          <div className="pb-6 pt-4 max-w-sm">
          Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.
          </div>
        </div>

        <div className="flex pt-20 flex-col ">
          <form onSubmit={handleFormSubmit}>
            <div className="w-fit border-[#ff4f00] border-2 px-6 py-6">
              <Input
                onChange={e => setEmail(e.target.value)}
                value={email}
                label={"Email"}
                type="text"
                placeholder="Your Email"
              ></Input>

              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                label={"Password"}
                type="password"
                placeholder="Password"
              ></Input>

              <button
                type="submit"
                className="text-sm mt-10 w-full font-medium px-10 pb-2 pt-2 hover:shadow-lg  bg-[#ff4f00] flex justify-center items-center text-white cursor-pointer rounded-full"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
