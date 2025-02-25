import Link from "next/link";
import {ModeToggle} from "@/components/ModeToggle";

const HeaderSection = () => {
    return (
        <header className="w-full flex flex-row justify-between p-3 md:p-5 md:fixed md:z-20">
            <nav className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row gap-2 items-center">
                    <Link className="text-lg font-black duration-300 motion-reduce:transition-none " href="/">DE.</Link>
                </div>
                <div className="flex flex-row gap-2.5 items-center">
                    <p>Nigeria</p>
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
};

export default HeaderSection;
