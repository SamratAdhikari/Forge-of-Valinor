// src/components/Canvas/Canvas.jsx
import DropContainer from "./DropContainer";

const Canvas = ({ droppedElements, setDroppedElements }) => {
    const moveElement = (index, position) => {
        setDroppedElements((prevElements) => {
            const updatedElements = [...prevElements];
            updatedElements[index] = { ...updatedElements[index], position };
            return updatedElements;
        });
    };

    return (
        <DropContainer
            droppedElements={droppedElements}
            setDroppedElements={setDroppedElements}
            moveElement={moveElement}
        />
    );
};

export default Canvas;
