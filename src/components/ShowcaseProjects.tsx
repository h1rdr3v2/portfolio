import * as React from "react"
import demoWork from "../../public/demo-work.webp"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const projects = [
    {
        name: "MyCGPA",
        description:"A user friendly mobile app made for students to compiile and calculate there universities CGPA"
    },
    {
        name: "Watchman Hymns",
        description:"A church hymn book app"
    }
]
export default function ShowcaseProjects() {
    return (
        <Carousel className="flex mt-6 w-full">
            <CarouselContent>
                {projects.map((project, index) => (
                    <CarouselItem key={index} className="flex justify-center">
                        <Card className="w-full max-w-lg shadow-lg">
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
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
