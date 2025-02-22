import WavingText from "@/components/WavingText";
import ExpandableImage from "@/components/ExpandableImage";
import me from "../../public/me.jpeg"
import Link from "next/link";
import Badge from "@/components/Badge";
import {ModeToggle} from "@/components/ModeToggle";
import "./pagestyle.css"
import ShowcaseProjects from "@/components/ShowcaseProjects";

export default function Home() {
  return (
    <div className="">
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
      <main className="min-h-screen max-w-xl mx-auto w-full flex flex-col justify-start gap-12 items-center py-8 md:py-16 px-6 sm:px-0 font-[family-name:var(--font-geist-sans)]">
        <section className="w-full">
            <ExpandableImage src={me} alt="My image" />
        </section>
          <section className="w-full">
            <h1 className="text-lg font-medium">Destiny Ezenwata</h1>
            <span className="text-gray-500 text-sm -mt-0.5 font-medium">Software Developer {"<>"} Mobile App Developer</span>
        </section>
          <section className="w-full">
              <p className="text-2xl font-medium">
                  <WavingText text="Ndewo" /> {" "}
                  — I&#39;m a software developer and a mobile app developer based in {" "}
                  <span className="country">Nigeria</span> , passionate about making things simple and automating daily tasks.{" "}
                  <span className="text-gray-500">My focus is on trying to keep up with security and best practices and always looking for new things to learn.</span>
              </p>
          </section>
          <section className="w-full">
              <Badge text="projects" type={"bold"}/>
              <ShowcaseProjects />
          </section>
      </main>
    </div>

  );
}
