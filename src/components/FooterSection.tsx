const currentYear = new Date().getFullYear();
const FooterSection = () => {
    return (
        <footer className="w-full">
            <div className="flex flex-col gap-2.5">
                <p className="text-center text-gray-500 italic text-xs">Copyrights &copy; {currentYear} — Developed by Destiny</p>
                <p className="text-center text-foreground font-medium text-sm">deveze.bleon.co</p>
            </div>
        </footer>
    );
};

export default FooterSection;
