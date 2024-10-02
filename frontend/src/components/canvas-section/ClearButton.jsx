import { GrClearOption } from "react-icons/gr";

const ClearButton = () => {
    const clearCanvas = () => {
        console.log("Canvas Cleared");
    };

    return (
        <button
            onClick={clearCanvas}
            className="absolute bottom-3 right-3 flex items-center bg-gray-200 border-2 border-gray-300 hover:bg-gray-400 p-2 mr-2 mb-1 rounded-md shadow-md transition-colors duration-300"
        >
            <GrClearOption className="w-6 h-6 text-gray-500" />
            <span className="ml-2 text-gray-500 font-semibold">Clear</span>
        </button>
    );
};

export default ClearButton;
