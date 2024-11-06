"use client";
import Image from "next/image";
import { LinkButton } from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";
import { Borderbutton } from "./buttons/Borderbutton";
import { ButtonGray } from "./buttons/ButtonGray";
import { IoArrowForward } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router =  useRouter();
  return (
    <div className=" flex justify-center gap-20 pt-20">
      <div >
        <div className="w-fit items-start">
          <ButtonGray onClick={() => {}}>
            <div className="flex items-center gap-2 text-sm">
              <div className="rounded-full p-1 text-sm border border-2 border-black">
                {" "}
                New{" "}
              </div>{" "}
              Zapier EnterPrises is here
              <IoArrowForward />
            </div>
          </ButtonGray>
        </div>

        <div className=" flex justify-center items-start flex-col">
          <div className="text-6xl text-center font-extrabold pt-8 max-w-xl flex flex-col items-start">
            <p>Automate </p> <p>without limits</p>
          </div>
        </div>
        <div className=" flex justify-center items-start flex-col">
          <div className="text-md font-md pt-8 max-w-sm text-start">
            Turn chaos into smooth operations by automating workflows
            yourself—no developers, no IT tickets, no delays. The only limit is
            your imagination.
          </div>
        </div>
        <div className="flex justify-start justify-center gap-4  pt-12">
          <PrimaryButton size="big" onClick={() =>router.push("/signup")}>
            Start free with email
          </PrimaryButton>
          <div className="flex justify-center items-center">
            <Borderbutton onClick={() => router.push("/signup") }>
              Start free with Google
            </Borderbutton>
          </div>
        </div>
      </div>

      <div className="flex">
        <Image
          src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
          alt="Zapier Enterprises Hero Image"
          unoptimized
          width={450}
          height={350}
        />
      </div>
    </div>
  );
}
