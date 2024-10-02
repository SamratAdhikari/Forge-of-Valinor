import { useDrop } from "react-dnd";
import { useState } from "react";
import ClearButton from "./ClearButton";

const Canvas = () => {
    const [droppedElements, setDroppedElements] = useState([]);

    const [, drop] = useDrop(() => ({
        accept: "ELEMENT", // Must match the type in Element.jsx
        drop: (item) => addElementToCanvas(item.element),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const addElementToCanvas = (element) => {
        setDroppedElements((prevElements) => [...prevElements, element]);
    };

    return (
        <div
            ref={drop}
            className={`w-[75%] bg-gray-950 relative rounded-l-lg p-4`}
        >
            {/* Render dropped elements */}
            <div className="h-full">
                {droppedElements.map((element, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center justify-center text-gray-700 bg-white p-4 shadow-sm border-2 border-gray-200 rounded-md cursor-pointer min-w-[100px] h-1 text-center"
                    >
                        <span className="mr-2">{element.emoji}</span>
                        <span>{element.name}</span>
                    </div>
                ))}
            </div>

            {/* Clear Button */}
            <ClearButton />
        </div>
    );
};

export default Canvas;
