import { useDrag } from "react-dnd";

const Element = ({ element }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ELEMENT", // The type must match what the Canvas accepts
        item: { element },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`flex items-center text-gray-700 bg-white p-4 shadow-sm border-2 border-gray-200 rounded-md cursor-pointer min-w-[100px] h-1 text-center ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
        >
            <span className="mr-2">{element.emoji}</span>
            <span>{element.name}</span>
        </div>
    );
};

export default Element;
