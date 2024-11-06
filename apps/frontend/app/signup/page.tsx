"use client";
import { useState } from "react";
import Appbar from "../../components/Appbar";
import { CheckFeature } from "../../components/CheckFeature";
import { Input } from "../../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Page() {

    const [name,setName] = useState("");
    const [email,setEmail] =  useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();


    const handleFormSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        username: email,
        password,
        name
      })

      router.push("/login");
      

    }


  return (
    <>
      <Appbar />
      <div className="flex justify-center gap-2 items-center pt-8 ">
        <div className="pt-20 max-w-md  pr-20 ">
          <div className="font-bold text-3xl">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-6 pt-4">
            <CheckFeature label={"Easy setup, no coding required"} />
          </div>
          <div className="pb-6">
            <CheckFeature label={"Free forever for core features"} />
          </div>
          <CheckFeature label={"14-day trial of premium features & apps"} />
        </div>

        <div className="flex pt-20 flex-col ">
          <form onSubmit={handleFormSubmit}>
            <div className="w-fit border-[#ff4f00] border-2 px-6 py-6">
              <Input
                value={name}
                label={"Name"}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Your name"
              ></Input>

              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                label={"Email"}
                type="text"
                placeholder="Your Email"
              ></Input>

              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                label={"Password"}
                type="text"
                placeholder="Password"
              ></Input>

              <button
                type="submit"
                className="text-sm mt-10 w-full font-medium px-10 pb-2 pt-2 hover:shadow-lg  bg-[#ff4f00] flex justify-center items-center text-white cursor-pointer rounded-full"
              >
                Get Started Free
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
