import * as React from "react"
import demoWork from "../../public/demo-work.webp"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext, CarouselPrevious
} from "@/components/ui/carousel"
import Image from "next/image"

const projects = [
    {
        name: "MyCGPA",
        description: "A user-friendly mobile app for students to compile and calculate their university CGPA."
    },
    {
        name: "Watchman Hymns",
        description: "A digital hymn book app for church worship."
    }
]

export default function ShowcaseProjects() {
    return (
        <>
            <Carousel className="mt-6 w-full relative">
                <CarouselContent>
                    {projects.map((project, index) => (
                        <CarouselItem key={index} className="w-full">
                            <Card className="w-full relative min-h-[360px]">
                                <CardHeader className="p-0">
                                    <Image
                                        src={demoWork}
                                        alt={`${project.name} project`}
                                        className="w-full h-60 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                                    <CardDescription className="text-gray-600">{project.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Floating Single Next Arrow */}
                <CarouselPrevious className="absolute left-3.5 top-[40%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
                <CarouselNext className="absolute right-3.5 top-[40%] -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow-md z-10" />
            </Carousel>

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
    )
}
