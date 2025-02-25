import React from 'react';
import Link from "next/link";
import {Socials} from "@/types";


const SocialsSection = ({socials}:{socials: Socials[]}) => {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                    <h2 className="font-bold text-3xl text-foreground text-center">Let&#39;s Keep in Touch</h2>
                    <p className="text-center text-gray-600"> Stay in the loop with my latest projects, insights, and offerings. Feel free to reach out—whether you have questions, need advice, or just want to connect!</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-2 md:gap-x-4">
                    {socials.map((social, index) => (
                        <React.Fragment key={index}>
                            <Link href={social.url} target="_blank">{social.name}</Link>
                            {index !== socials.length - 1 &&
                                <div className="h-6 w-px bg-gray-800/5 dark:bg-gray-800/80"></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialsSection;
