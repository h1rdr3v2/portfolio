import "./pagestyle.css"
import {ProjectInterface, Socials} from "@/types";
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import IntroSection from "@/components/IntroSection";
import FooterSection from "@/components/FooterSection";
import HeaderSection from "@/components/HeaderSection";
import SocialsSection from "@/components/SocialsSection";
import ShowcaseProjectsSection from "@/components/ShowcaseProjectsSection";

const projects: ProjectInterface[] = [
    {
        name: "MyCGPA",
        description: "A user-friendly mobile app designed to help university students track and calculate their CGPA effortlessly.",
        images: ["/mycgpa-1.png", "/mycgpa-2.png", "/mycgpa-3.png", "/mycgpa-4.png"],
        links: {
            appstore: "https://apps.apple.com/us/app/mycgpa/id6450861410"
        },
        tools: ['React Native'],
        content: [
            { body: "MyCGPA simplifies GPA calculations, allowing students to efficiently manage their academic performance and make informed course decisions." },
            { image: "/mycgpa-5.png" },
            { body: "The screenshot above demonstrates how students can input their course details and instantly receive accurate GPA calculations." }
        ]
    },
    {
        name: "Watchman Hymns",
        description: "A digital hymn book app designed to enhance worship experiences in church services.",
        images: ["/watchman-hymns-4.png", "/watchman-hymns-1.png", "/watchman-hymns-2.png", "/watchman-hymns-3.png"],
        links: {
            appstore: "https://apps.apple.com/ng/app/watchmans-hymnal/id6740525384"
        },
        tools: ['React Native'],
        content: [
            { body: "Watchman Hymns is a voluntary project developed for the Watchman Catholic Charismatic Renewal Movement church, providing easy access to hymns for worship." },
            { image: "/watchman-hymns-5.png" },
            { body: "The app features a beautifully designed dark mode for an immersive reading experience." },
            { image: "/watchman-hymns-3.png" },
            { body: "It also supports iPads, ensuring a clear and optimized viewing experience on larger screens." }
        ]
    }
];
const socials: Socials[] = [
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/destinyezenwata/",
    },
    {
        name: "mail",
        url: "mailto:support@bleon.co",
    },
    {
        name: "upwork",
        url: "https://www.upwork.com/freelancers/~01699292f4f731ebce",
    },
    {
        name: "github",
        url: "https://github.com/h1rdr3v2",
    }
]

export default function Home() {
  return (
    <>
      <HeaderSection />
      <main className="min-h-screen max-w-xl mx-auto w-full flex flex-col justify-start gap-12 items-center py-8 md:py-16 px-6 sm:px-0 font-[family-name:var(--font-geist-sans)]">
          <IntroSection />
          <AboutSection />
          <ShowcaseProjectsSection projects={projects} />
          <QuoteSection />
          <SocialsSection socials={socials} />
          <FooterSection />
      </main>
    </>
  );
}
