import { useState } from "react";
import toast from "react-hot-toast";
import eventBus from "../utils/eventBus";

const useAddElement = () => {
    const [combinedElement, setCombinedElement] = useState({});
    const [isNew, setIsNew] = useState(false);

    const addElement = async (name1, name2) => {
        try {
            const res = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ element1: name1, element2: name2 }),
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.message);

            setCombinedElement(data.element);
            setIsNew(data.isNew);

            // Emit the event to notify that a new element was added
            const elementAddedEvent = new CustomEvent("trigger-fetch");
            eventBus.dispatchEvent(elementAddedEvent); // Dispatch the event

            return { combinedElement: data.element, isNew: data.isNew };
        } catch (error) {
            toast.error(error.message);
            return { combinedElement: null, isNew: false }; // Return default values in case of error
        }
    };

    return { addElement, combinedElement, isNew };
};

export default useAddElement;
