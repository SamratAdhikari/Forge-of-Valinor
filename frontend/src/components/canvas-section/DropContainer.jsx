import { useDrop } from "react-dnd";
import ClearButton from "./ClearButton";
import DraggableElement from "./DraggableElement";
import { useEffect, useState } from "react";
import useAddElement from "../../hooks/useAddElement";

const DropContainer = ({
    droppedElements,
    setDroppedElements,
    moveElement,
}) => {
    const [elementRects, setElementRects] = useState({});
    const [, setCollisionDetected] = useState(false);
    const { addElement } = useAddElement();

    // React DnD useDrop hook
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
                moveElement(item.index, dropPosition);
            } else {
                addElementToCanvas(item.element, dropPosition);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // Add new element to the canvas
    const addElementToCanvas = (element, position, isNew = false) => {
        setDroppedElements((prevElements) => [
            ...prevElements,
            { element, position, isNew },
        ]);
    };

    // Collision checking logic between two rectangles
    const checkCollision = (rect1, rect2) => {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    };

    // Detecting collisions between all elements on the canvas
    const detectCollisions = async () => {
        const keys = Object.keys(elementRects);
        for (let i = 0; i < keys.length; i++) {
            for (let j = i + 1; j < keys.length; j++) {
                const rect1 = elementRects[keys[i]];
                const rect2 = elementRects[keys[j]];
                if (checkCollision(rect1, rect2)) {
                    const element1 = droppedElements[keys[i]];
                    const element2 = droppedElements[keys[j]];

                    const { combinedElement, isNew } = await addElement(
                        element1.element.name,
                        element2.element.name
                    );

                    if (combinedElement) {
                        const newPosition = element1.position;

                        addElementToCanvas(
                            {
                                name: combinedElement.name,
                                emoji: combinedElement.emoji,
                            },
                            newPosition,
                            isNew
                        );
                        removeElements([parseInt(keys[i]), parseInt(keys[j])]);
                        setCollisionDetected(true);
                    }

                    return;
                }
            }
        }
        setCollisionDetected(false);
    };

    // Handle collision check and store element's bounding box
    const handleCollisionCheck = (index, rect) => {
        setElementRects((prevRects) => ({
            ...prevRects,
            [index]: rect,
        }));
    };

    // Remove the colliding elements from the droppedElements state
    const removeElements = (indexes) => {
        setDroppedElements((prevElements) =>
            prevElements.filter((_, i) => !indexes.includes(i))
        );
    };

    useEffect(() => {
        detectCollisions();
    }, [elementRects]);

    return (
        <div
            id="drop-container"
            ref={drop}
            className={`w-[78%] bg-[#282C34] relative rounded-l-lg p-4`}
        >
            <div className="relative w-full h-full">
                {droppedElements.map((item, index) => (
                    <DraggableElement
                        key={index}
                        element={item.element}
                        index={index}
                        position={item.position}
                        onCollisionCheck={handleCollisionCheck}
                    />
                ))}
            </div>

            <ClearButton setDroppedElements={setDroppedElements} />
        </div>
    );
};

export default DropContainer;
