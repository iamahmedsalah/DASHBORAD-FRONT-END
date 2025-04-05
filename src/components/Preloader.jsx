import React from "react";

const Preloader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-base-200 z-50">
            <div className="w-16 h-16 border-4 border-neutral border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Preloader;