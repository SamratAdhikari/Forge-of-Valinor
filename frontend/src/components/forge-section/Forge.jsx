import { useDrop } from "react-dnd";
import Element from "./Element.jsx";
import PurgeButton from "./PurgeButton.jsx";
import LogoutButton from "./LogoutButton.jsx";
import useFetchElements from "../../hooks/useFetchElements.js";

const Forge = ({ onDeleteElement }) => {

    const [, drop] = useDrop(() => ({
        accept: "ELEMENT",
        drop: (item) => {
            // Call the delete function when an element is dropped here
            onDeleteElement(item.index);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`flex flex-col w-[25%] bg-gray-100 relative rounded-r-lg h-full p-4`}
        >
            <h1 className="text-center font-semibold text-yellow-500 text-2xl p-2">
                {"Celebrimbor's Forge"}
            </h1>

            <div className="divider before:bg-gray-600 after:bg-gray-600"></div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-4">
                    {elements.map((element) => (
                        <Element key={element.name} element={element} />
                    ))}
                </div>
            </div>

            <div className="flex w-full mt-4 justify-around">
                <PurgeButton className="flex-1 mx-1" />
                <LogoutButton className="z-10 flex-1 mx-1" />
            </div>
        </div>
    );
};

export default Forge;
