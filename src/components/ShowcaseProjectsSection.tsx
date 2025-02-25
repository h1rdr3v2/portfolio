"use client"

import Image from "next/image";
import * as React from "react";
import {GlobeLock} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import {CrossFadeImage} from "@/components/CrossFadeImage";
import Link from "next/link";

interface LinksProps {
    playstore?: string,
    appstore?: string,
    website?: string,
}

interface ProjectInterface {
    name: string;
    description: string;
    images: string[];
    links?: LinksProps;
    tools?: string[];
    content?: ProjectContent[];
}

interface ProjectContent {
    body?: string;
    image?: string;
}

interface ProjectModalProps {
    project: ProjectInterface | null;
    onClose: () => void;
}

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

export default function ShowcaseProjectsSection() {
    const [activeProject, setActiveProject] = React.useState<ProjectInterface | null>(null);

    return (
        <section className="w-full">
            <Badge variant="default">Projects</Badge>
            <Carousel className="mt-6 w-full relative">
                <CarouselContent>
                    {projects.map((project, index) => (
                        <CarouselItem key={index} className="w-full">
                            <Card className="w-full relative min-h-[360px]">
                                <CardHeader className="p-0">
                                    <CrossFadeImage images={project.images}/>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                                    <CardDescription className="text-gray-600">{project.description}</CardDescription>
                                    <Button className="mt-4" onClick={() => setActiveProject(project)}>See More</Button>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-3.5 top-[35%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
                <CarouselNext className="absolute right-3.5 top-[35%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
            </Carousel>

            {activeProject && (<ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />)}
        </section>
    );
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    if(!project) return (<></>);

    return (
        <Dialog open={!!project} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden">
                <DialogHeader>
                    <DialogTitle>{project.name}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                </DialogHeader>

                <Carousel className="mt-4">
                    <CarouselContent>
                        {project.images.map((img, imgIndex) => (
                            <CarouselItem key={imgIndex} className="w-full">
                                <Image
                                    src={img}
                                    alt="Project Image"
                                    width={600}
                                    height={360}
                                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 700px"
                                    className="rounded-lg"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    priority
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
                </Carousel>
                <div>
                    {project.tools && (<span className="font-black text-[10px] uppercase">Tech: </span>)}
                    {project.tools && project.tools.map((tool, index) => (
                        <Badge key={index} variant="outline">{tool}</Badge>
                    ))}
                </div>
                <ProjectLinks links={project.links} />
                <div className="mt-2 space-y-4">
                    {project.content?.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {item.image && <Image src={item.image} alt="Project Detail" width={500} height={300} className="rounded-lg" priority />}
                            {item.body && <p className="mt-2 dark:text-gray-300">{item.body}</p>}
                        </div>
                    ))}
                </div>
                <DialogClose asChild>
                    <Button className="mt-4 mb-6" style={{marginBottom: 48}}>Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
const ProjectLinks: React.FC<{ links?: LinksProps }> = ({ links }) => {
    if (!links) return (<></>);

    return (
        <div className="flex items-center">
            <div className="gap-4">
                {links.playstore && (
                    <Button variant="link" asChild>
                        <Link href={links.playstore} target="_blank" rel="noopener noreferrer">
                            <PlayStoreIcon className="mr-1" />
                            Play Store
                        </Link>
                    </Button>
                )}
                {links.appstore && (
                    <Button variant="link" asChild>
                        <Link href={links.appstore} target="_blank" rel="noopener noreferrer">
                            <AppStoreIcon className="mr-1" />
                            App Store
                        </Link>
                    </Button>
                )}
                {links.website && (
                    <Button variant="link" asChild>
                        <Link href={links.website} target="_blank" rel="noopener noreferrer">
                            <GlobeLock className="mr-1" />
                            Website
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
};
const PlayStoreIcon = ({className}:{className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="google-play" className={className}>
        <path fill="#2196F3" d="M8.32 7.68.58 15.42c-.37-.35-.57-.83-.57-1.35V1.93C.01 1.4.22.92.6.56l7.72 7.12z"></path>
        <path fill="#FFC107" d="M15.01 8c0 .7-.38 1.32-1.01 1.67l-2.2 1.22-2.73-2.52-.75-.69 2.89-2.89L14 6.33c.63.35 1.01.97 1.01 1.67z"></path>
        <path fill="#4CAF50" d="M8.32 7.68.6.56C.7.46.83.37.96.29 1.59-.09 2.35-.1 3 .26l8.21 4.53-2.89 2.89z"></path>
        <path fill="#F44336" d="M11.8 10.89 3 15.74c-.31.18-.66.26-1 .26-.36 0-.72-.09-1.04-.29a1.82 1.82 0 0 1-.38-.29l7.74-7.74.75.69 2.73 2.52z"></path>
    </svg>
)
const AppStoreIcon = ({className}:{className:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="app-store" className={className}>
        <path fill="#2196F3" d="M14.096 14.995c.43-.807-.126-1.974-1.118-1.974H9.915l4.234-7.331a.989.989 0 0 0-1.713-.987l-.44.758-.429-.757a.988.988 0 1 0-1.713.987l1.007 1.747-3.223 5.584H5.12a.986.986 0 1 0 0 1.974h8.976z"></path>
        <path fill="#2196F3" d="M12 24c6.629 0 12-5.371 12-12S18.629 0 12 0 0 5.371 0 12s5.371 12 12 12zm0-22.452c5.743 0 10.452 4.65 10.452 10.452 0 5.743-4.65 10.452-10.452 10.452-5.743 0-10.452-4.65-10.452-10.452C1.548 6.256 6.199 1.548 12 1.548z"></path>
        <path fill="#2196F3" d="m6.231 15.451-.706 1.219a.988.988 0 1 0 1.713.987l.949-1.645-.001.001c-.513-.62-1.162-.809-1.955-.562zm7.22-7.458c-.586.484-1.177 1.916-.349 3.343.807 1.404 2.027 3.509 3.648 6.319a.989.989 0 0 0 1.713-.987L17.501 15h1.428a.986.986 0 1 0 0-1.974H16.36v-.001c-1.292-2.24-2.26-3.919-2.909-5.032z"></path>
    </svg>
)
