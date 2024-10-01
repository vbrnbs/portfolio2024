import { Fraunces } from "next/font/google";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  weight: "800",
  // variable: "--font-fraunces" 
});

const Header = () => {
  return (
    <header className={ `${fraunces.className} antialiased`}>
        <div className="flex px-4 py-3 justify-between">
          <Link href="/">
            <h1 className="text-3xl">brnbs</h1>
          </Link>
        <ModeToggle />
        </div>
      
    </header>
  )
}

export default Header
