const Canvas = () => {
    const clearCanvas = () => {
        console.log("Canvas Cleared");
    };
    return (
        <div className="w-[80%] h-screen border border-gray-300 p-4 relative">
            <button
                onClick={clearCanvas}
                className="absolute bottom-2 right-2 bg-gray-300 p-2 rounded-md"
            >
                Clear Canvas
            </button>
        </div>
    );
};

export default Canvas;
