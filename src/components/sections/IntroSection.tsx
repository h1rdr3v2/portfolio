import me from "../../../public/images/me.jpeg";
import Image from "next/image";

const IntroSection = () => {
    return (
        <section className="w-full">
			<div className="flex flex-row gap-4 items-center">
				<div className="overflow-hidden rounded-full w-[70px] h-[70px]" >
					<Image
						src={me}
						alt="My profile picture"
						objectFit="cover"
						priority
					/>
				</div>
				<div>
					<h1 className="text-lg font-medium">Destiny Ezenwata</h1>
					<span className="text-gray-500 text-sm -mt-0.5 font-medium">Software Developer {"<>"} Mobile App Developer</span>
				</div>
			</div>
        </section>
    );
};

export default IntroSection;
