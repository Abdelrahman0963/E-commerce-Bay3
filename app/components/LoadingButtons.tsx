"use client";
import React from "react";

const LoadingButtons = () => {
    return (
        <>
            <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
            Loading...
        </>
    );
};

export default LoadingButtons;
