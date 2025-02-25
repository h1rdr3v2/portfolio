"use client";

import {Role} from "@/types";
import {getCalApi} from "@calcom/embed-react";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calComUsername = "/destiny-ezenwata/work-chat";

const RolesSection = ({currentRoles, formerRoles}:{currentRoles: Role[], formerRoles: Role[]}) => {
    const [showFormerRoles, setShowFormerRoles] = useState(false);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "auto",
                styles: {
                    branding: { brandColor: "#000000" },
                },
            });
        })();
    }, []);

    return (
        <section className="w-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2.5 w-full">
                    <Badge variant="outline">Current Roles</Badge>
                    {currentRoles.map((role, index) => (
                        <Card key={index} className="flex flex-col gap-y-1 p-3.5 rounded-lg border-0">
                            <CardHeader className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-1 p-0">
                                <CardTitle>
                                    <h3 className="text-xl capitalize">{role.company}</h3>
                                </CardTitle>
                                {role.status && (
                                    <Badge variant="outline" className="text-[0.625rem] truncate" style={{ backgroundColor: "rgba(138,187,76,.2)" }}>
                                        <span className="size-2 rounded-[0.1875rem] mr-1" style={{ backgroundColor: role.statusColor }}></span>
                                        {role.status}
                                    </Badge>
                                )}
                            </CardHeader>
                            <CardContent className="p-0">
                                {role.description && role.description.map((text, idx) => (
                                    <CardDescription key={idx}>
                                        {text.includes("schedule a meeting") ? (
                                            text.split(/(schedule a meeting)/).map((t, id) =>
                                                t === "schedule a meeting" ? (
                                                    <span
                                                        key={id}
                                                        className="cursor-pointer underline underline-offset-4 hover:text-blue-700 text-blue-500 transition-colors"
                                                        data-cal-link={`${calComUsername}`}
                                                    >
                                                        schedule a meeting
                                                    </span>
                                            ) : (
                                            t
                                        )
                                            )
                                            ) : text}
                                    </CardDescription>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowFormerRoles(!showFormerRoles)}>
                        <Badge variant="outline">Former Roles</Badge>
                        {showFormerRoles ? arrowUpIcon() : moreInfoIcon()}
                    </div>
                    <div className={`transition-all duration-300 space-y-2.5 overflow-hidden ${showFormerRoles ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                        {formerRoles.map((role, index) => (
                            <Card key={index} className="flex flex-row gap-y-1 p-3.5 rounded-lg border-0 justify-between items-center space-y-0">
                                <CardHeader className="flex flex-col justify-between space-y-0 p-0">
                                    <CardTitle className="text-base capitalize">{role.company}</CardTitle>
                                    {role.title && (<CardDescription className="text-sm">{role.title}</CardDescription>)}
                                </CardHeader>
                                <CardContent className="p-0">
                                    <CardDescription className="text-xs">{role.period}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const arrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
    </svg>
);

const moreInfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
    </svg>
);

export default RolesSection;
