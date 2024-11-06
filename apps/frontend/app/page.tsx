import Appbar from "../components/Appbar";
import Hero from "../components/Hero";
import { HeroVideo } from "../components/HeroVideo";


export default function Page(){


  return(
    <main className="">
        <Appbar/>
        <Hero/>
        <div className="py-8">
        <HeroVideo />  
        </div>
    </main>
  )
}