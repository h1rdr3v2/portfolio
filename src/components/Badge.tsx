import React from 'react';

const Badge = ({text, type = "normal"}:{text: string, type?: "bold" | "normal"}) => {
    const style = type === "normal" ? "text-foreground bg-transparent border-foreground" : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
    return (
        <div className={`inline-flex items-center border rounded-lg px-1.5 py-0.5 text-xs font-medium
        transition-colors uppercase w-fit ${style}`}>
            {text}
        </div>
    );
};

export default Badge;
