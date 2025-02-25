import WavingText from "@/components/WavingText";

const AboutSection = () => {
    return (
        <section className="w-full">
            <p className="text-2xl font-medium">
                <WavingText text="Ndewo" /> {" "}
                — I&#39;m a software developer and a mobile app developer based in {" "}
                <span className="country">Nigeria</span> , passionate about making things simple and automating daily tasks.{" "}
                <span className="text-gray-500">My focus is on trying to keep up with security and best practices and always looking for new things to learn.</span>
            </p>
        </section>
    );
};

export default AboutSection;
