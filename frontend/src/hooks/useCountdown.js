import { useEffect, useState } from "react";

const useCountdown = (start, onEnd) => {
    const [countdown, setCountdown] = useState(start);

    useEffect(() => {
        if (countdown === 0) {
            onEnd();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, onEnd]);

    return countdown;
};

export default useCountdown;
