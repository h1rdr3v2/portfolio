import React from 'react';
import {Badge} from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RolesSection = () => {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2.5 w-full">
                    <Badge variant="outline">Current Roles</Badge>
                    <Card className="flex flex-col gap-y-1 p-3.5 rounded-lg border-0">
                        <CardHeader className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-1 p-0">
                            <CardTitle>
                                <h3 className="text-xl capitalize">Contractor Bleon</h3>
                            </CardTitle>
                            <Badge variant="outline" className="text-[0.625rem] truncate" style={{backgroundColor:"rgba(138,187,76,.2)"}}><span className="size-2 rounded-[0.1875rem] mr-1 " style={{backgroundColor:"#8ABB4CFF"}}></span>Open for collaboration</Badge>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription>Founder of bleon we have a team specialized in different fields that handle number of collaboration yearly in bring ideas to life</CardDescription>
                            <CardDescription>Feel free to schedule a meeting with us and lets work on something together</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col gap-y-1 p-3.5 rounded-lg border-0">
                        <CardHeader className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-1 p-0">
                            <CardTitle>
                                <h3 className="text-xl capitalize">Co-founder Hafrikplay</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription>Music streaming app focused on showcasing upcoming afro beats talents in africa</CardDescription>
                            <CardDescription>Check us out at</CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col gap-y-2.5">
                    <Badge variant="outline">Former Roles</Badge>
                    <Card className="flex flex-row gap-y-1 p-3.5 rounded-lg border-0 justify-between items-center space-y-0">
                        <CardHeader className="flex flex-col justify-between space-y-0 p-0">
                            <CardTitle className="text-base capitalize">
                                Crash Alerts
                            </CardTitle>
                            <CardDescription className="text-sm">Product developer</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription className="text-xs">2020 — 2024</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-row gap-y-1 p-3.5 rounded-lg border-0 justify-between items-center space-y-0">
                        <CardHeader className="flex flex-col justify-between space-y-0 p-0">
                            <CardTitle className="text-base capitalize">
                                Softmation
                            </CardTitle>
                            <CardDescription className="text-sm">Lead developer</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardDescription className="text-xs">2017 — 2021</CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

const arrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
    </svg>
)
const moreInfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
    </svg>
)

export default RolesSection;
