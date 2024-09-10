import { Fraunces } from "next/font/google";
import { ModeToggle } from "./ui/ModeToggle";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  weight: "800",
  // variable: "--font-fraunces" 
});

const Header = () => {
  return (
    <header className={ `${fraunces.className} antialiased`}>
        <div className="flex px-4 py-3 justify-between">
        <h1 className="text-3xl">brnbs</h1>
        <ModeToggle />
        </div>
      
    </header>
  )
}

export default Header
