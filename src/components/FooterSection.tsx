import Image from "next/image";
import sign from "../../public/signature.png";

const currentYear = new Date().getFullYear();
const FooterSection = () => {
    return (
        <footer className="w-full">
            <div className="flex flex-col gap-2.5 items-center">
                <Image src={sign} alt="Signature" width={110} height={39} className="" />
                <p className="text-center text-gray-500 italic text-xs">Copyrights &copy; {currentYear} — Developed by Destiny</p>
                <p className="text-center text-foreground font-medium text-sm">deveze.bleon.co</p>
            </div>
        </footer>
    );
};

export default FooterSection;
