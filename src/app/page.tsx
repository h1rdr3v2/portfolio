// import Image from "next/image";
import WavingText from "@/Components/WavingText";

export default function Home() {
  return (
    <div className="">
      <header>
        <nav>
          <ul>
              <ol>DE.</ol>
          </ul>
        </nav>
      </header>
      <main className="min-h-screen max-w-xl mx-auto w-full flex flex-col justify-start gap-12 items-center py-16 md:py-32 px-6 sm:px-0 font-[family-name:var(--font-geist-sans)]">
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
      </main>
    </div>
  );
}
