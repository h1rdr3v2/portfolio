import React from 'react';

const QuoteSection = () => {
    return (
        <section className="w-full">
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
        </section>
    );
};

export default QuoteSection;
