import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";

const DraggableElement = ({ element, index, position, onCollisionCheck }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ELEMENT",
        item: { index, element },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const elementRef = useRef(null); // Ref to the element

    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            onCollisionCheck(index, rect); // Send bounding box to parent
        }
    }, [position]); // Run this when position updates

    return (
        <div
            ref={(node) => {
                drag(node); // Connect drag with the element ref
                elementRef.current = node;
            }}
            className={`absolute inline-flex items-center justify-center text-gray-700 bg-white p-4 shadow-sm border-2 border-gray-200 rounded-md cursor-pointer min-w-[100px] h-1 font-semibold text-center
                ${isDragging ? "opacity-0" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <span className="mr-2">{element.emoji}</span>
            <span>{element.name}</span>
        </div>
    );
};

export default DraggableElement;
