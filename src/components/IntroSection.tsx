import me from "../../public/me.jpeg";
import Image from "next/image";

const IntroSection = () => {
    return (
        <section className="w-full">
            <div className="w-full overflow-hidden relative rounded-xl mb-12" style={{ height: "200px"}} >
                <Image
                    src={me}
                    alt="My profile picture"
                    fill={true}
                    style={{objectFit: "cover"}}
                    sizes="(max-width: 100%) 400px"
                    priority
                />
            </div>
            <h1 className="text-lg font-medium">Destiny Ezenwata</h1>
            <span className="text-gray-500 text-sm -mt-0.5 font-medium">Software Developer {"<>"} Mobile App Developer</span>
        </section>
    );
};

export default IntroSection;
