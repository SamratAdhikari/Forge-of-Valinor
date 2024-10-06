import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import eventBus from "../utils/eventBus"; // Adjust the path if necessary

const useFetchElements = () => {
    const [elements, setElements] = useState([]);

    const fetchElements = useCallback(async () => {
        try {
            const res = await fetch("/api/fetch");
            const data = await res.json();

            if (!data.success) throw new Error(data.message);

            setElements(data.elements);
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    useEffect(() => {
        fetchElements();

        eventBus.addEventListener("trigger-fetch", fetchElements);

        return () => {
            eventBus.removeEventListener("trigger-fetch", fetchElements);
        };
    }, [fetchElements]);

    return { elements };
};

export default useFetchElements;
