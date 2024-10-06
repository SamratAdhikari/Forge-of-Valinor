import { useDrop, useDrag } from "react-dnd";
import ClearButton from "./ClearButton";

const DraggableElement = ({ element, index, position }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ELEMENT",
        item: { index, element },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`absolute inline-flex items-center justify-center text-gray-700 bg-white p-4 shadow-sm border-2 border-gray-200 rounded-md cursor-pointer min-w-[100px] h-1 font-semibold text-center ${
                isDragging ? "opacity-0" : ""
            }`}
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

const Canvas = ({ droppedElements, setDroppedElements }) => {
    const moveElement = (index, position) => {
        setDroppedElements((prevElements) => {
            const updatedElements = [...prevElements];
            updatedElements[index] = { ...updatedElements[index], position };
            return updatedElements;
        });
    };

    const [, drop] = useDrop(() => ({
        accept: "ELEMENT",
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            const canvasRect = document
                .getElementById("drop-container")
                .getBoundingClientRect();
            const dropPosition = {
                x: offset.x - canvasRect.left,
                y: offset.y - canvasRect.top,
            };

            if (item.index !== undefined) {
                // Move existing element within canvas
                moveElement(item.index, dropPosition);
            } else {
                // Add new element to the canvas
                addElementToCanvas(item.element, dropPosition);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const addElementToCanvas = (element, position) => {
        setDroppedElements((prevElements) => [
            ...prevElements,
            { element, position },
        ]);
    };

    return (
        <div
            id="drop-container"
            ref={drop}
            className={`w-[75%] bg-[#282C34] relative rounded-l-lg p-4`}
        >
            <div className="relative w-full h-full">
                {droppedElements.map((item, index) => (
                    <DraggableElement
                        key={index}
                        element={item.element}
                        index={index}
                        position={item.position}
                    />
                ))}
            </div>

            <ClearButton setDroppedElements={setDroppedElements} />
        </div>
    );
};

export default Canvas;
