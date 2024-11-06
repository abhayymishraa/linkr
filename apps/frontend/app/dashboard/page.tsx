"use client"
import { use, useEffect, useState } from "react";
import Appbar from "../../components/Appbar";
import { DarkButton } from "../../components/buttons/Darkpurplebutton";
import axios from "axios";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import { LinkButton } from "../../components/buttons/LinkButton";

export default function(){
   
    const {loading , zaps} =useZaps();
    const router = useRouter();

    return(
        <div>
            <Appbar />
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full ">
                  <div className=" flex justify-between pr-8">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={()=>{router.push("/zap/create")}} > Create </DarkButton>
                 </div>
                </div>
            </div>

        {loading ? "...Loading":<div className="flex justify-center pt-8"> <ZapTable zaps={zaps} /> </div>}

        </div>
    )
}

function useZaps(){
    const [loading , setLoading] = useState(false);
    const [zaps, setZaps] = useState<Zap[]>([]);
    
    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/zap`,{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
      })
      .then(res =>{
        setZaps(res.data.zaps)
      })
    },[])
  return {
    loading,zaps 
  }
}

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}
function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return <div className=" flex flex-col items-center justify-center py-2 max-w-screen-lg w-full border border-black ">
        <div className="flex items-center justify-around w-full ">
                <div className="flex-1 text-center">Name</div>
                <div className="flex-1 text-center">ID</div>
                <div className="flex-1 text-center">Created at</div>
                <div className="flex-1 text-center">Webhook URL</div>
                <div className="flex-1 text-center">Go</div>
        </div>
        {zaps.map(z => <div className="flex items-center border-t py-2 w-full">
            <div className="flex-1 text-center flex justify-center"><img src={z.trigger.type.image} className="w-[30px] h-[30px]" /> {z.actions.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)}</div>
            <div className="flex-1 text-center">{z.id}</div>
            <div className="flex-1 text-center">Nov 13, 2023</div>
            <div className="flex-1 text-center">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
            <div className="flex-1 flex justify-center" >
                <div className="w-24 text-center">
                <LinkButton onClick={() => {
                    router.push("/zap/" + z.id)
                }}>Go</LinkButton>
                </div>
                </div>
        </div>)}
    </div>
}