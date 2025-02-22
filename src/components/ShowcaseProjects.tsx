"use client"

import Image from "next/image";
import * as React from "react";
import {Button} from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import {CrossFadeImage} from "@/components/CrossFadeImage";

interface ProjectInterface {
    name: string;
    description: string;
    images: string[];
    link: string;
}

const projects: ProjectInterface[] = [
    {
        name: "MyCGPA",
        description: "A user-friendly mobile app for students to compile and calculate their university CGPA.",
        images: ["/demo-work.webp", "/demo-work-1.webp", "/demo-work-2.webp"],
        link: "https://example.com"
    },
    {
        name: "Watchman Hymns",
        description: "A digital hymn book app for church worship.",
        images: ["/demo-work-2.webp", "/demo-work-1.webp", "/demo-work.webp"],
        link: "https://example.com"
    }
];

export default function ShowcaseProjects() {
    const [activeProject, setActiveProject] = React.useState<ProjectInterface | null>(null);

    return (
        <>
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
                <CarouselPrevious className="absolute left-3.5 top-[40%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
                <CarouselNext className="absolute right-3.5 top-[40%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
            </Carousel>

            {activeProject && (<ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />)}

            {/* Quote Section */}
            <div className="flex flex-col mt-6 w-full text-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 256 256" className="text-gray-500">
                    <path
                        d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path>
                </svg>
                <p className="mt-4 text-lg font-medium text-primary max-w-md">
                    Creativity meets functionality.{" "}<span className="text-gray-500">Turning ideas into impactful digital experiences.</span>
                </p>
            </div>
        </>
    );
}

interface ProjectModalProps {
    project: ProjectInterface | null;
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    if(!project) return null;

    return (
        <Dialog open={!!project} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{project.name}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                </DialogHeader>
                <Carousel className="mt-4">
                    <CarouselContent>
                        {project.images.map((img, imgIndex) => (
                            <CarouselItem key={imgIndex} className="w-full">
                                <Image src={img} alt="Project Image" width={600} height={360} className="w-full h-60 object-cover rounded-lg" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-600 hover:underline">Visit Project</a>
                <DialogClose asChild>
                    <Button className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
