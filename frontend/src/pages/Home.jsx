import Canvas from "../components/canvas-section/Canvas";
import Forge from "../components/forge-section/Forge";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-full flex border-2 border-gray-500 rounded-lg">
                <Canvas />
                <Forge />
            </div>
        </DndProvider>
    );
};

export default Home;
