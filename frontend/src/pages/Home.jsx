import { useState } from "react";
import Canvas from "../components/canvas-section/Canvas";
import Forge from "../components/forge-section/Forge";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
    const [droppedElements, setDroppedElements] = useState([]);
    const deleteElement = (index) => {
        setDroppedElements((prevElements) =>
            prevElements.filter((_, i) => i !== index)
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-full flex border-2 border-gray-500 rounded-lg">
                <Canvas
                    droppedElements={droppedElements}
                    setDroppedElements={setDroppedElements}
                />
                <Forge onDeleteElement={deleteElement} />
            </div>
        </DndProvider>
    );
};

export default Home;
