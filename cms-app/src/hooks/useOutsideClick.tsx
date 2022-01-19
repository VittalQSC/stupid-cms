import { RefObject, useEffect } from "react";

const useOutsideClick = (callback: () => void, ...refs: RefObject<HTMLDivElement>[]) => {
    const handleClick = (e: MouseEvent) => {
        if (refs.reduce((clicked, ref) => clicked || (ref.current && !ref.current.contains(e.target as Node)), false)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOutsideClick;