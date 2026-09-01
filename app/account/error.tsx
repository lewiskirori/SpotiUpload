"use client";

import Box from "@/components/Box";

const Error = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400 flex flex-col items-center">
                <span style={{ fontSize: '1.2rem' }}>
                    Oh sorry. It appears there’s been a hiccup!
                </span>
                <br />
                <span style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Try reloading.
                </span>
            </div>
        </Box>
    );
};

export default Error;
