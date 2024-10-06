import toast from "react-hot-toast";
import eventBus from "../utils/eventBus"; // Make sure this is correctly pointing to your eventBus

const usePurgeElements = () => {
    const purgeElements = async () => {
        try {
            const res = await fetch("/api/purge", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            toast.success("Forge purged!");

            const elementsPurgedEvent = new CustomEvent("trigger-fetch");
            eventBus.dispatchEvent(elementsPurgedEvent);

            return data.elements;
        } catch (error) {
            toast.error(`Purge failed: ${error.message}`);
            return null;
        }
    };

    return { purgeElements };
};

export default usePurgeElements;
