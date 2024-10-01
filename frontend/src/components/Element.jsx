import Draggable from "react-draggable";


const Element = ({ element }) => {
    return (
        <Draggable>
            <div className="flex items-center bg-white p-2 mb-2 shadow-md rounded-md cursor-pointer">
                <span className="mr-2">{element.emoji}</span>
                <span>{element.name}</span>
            </div>
        </Draggable>
    );
};

export default Element;
