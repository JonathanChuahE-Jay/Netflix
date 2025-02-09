import { useState, useEffect } from "react";

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState("desktop");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setBreakpoint("mobile");
            } else if (window.innerWidth <= 1024) {
                setBreakpoint("tablet");
            } else {
                setBreakpoint("desktop");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return breakpoint;
};

export default useBreakpoint;
