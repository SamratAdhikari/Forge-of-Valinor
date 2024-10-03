import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchElements = () => {
    const [elements, setElements] = useState([]);

    // This effect will run whenever the elements array changes
    useEffect(() => {
        const fetchElements = async () => {
            try {
                const res = await fetch("/api/fetch");
                const data = await res.json();

                if (!data.success) throw new Error(data.message);

                setElements(data.elements);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchElements();
    }, [elements]); // Dependency array, fetch again when elements change

    return { elements, setElements }; // Return setElements to allow changes to the elements array
};

export default useFetchElements;
