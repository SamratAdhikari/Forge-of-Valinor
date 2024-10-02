import Element from "./Element.jsx";
import PurgeButton from "./PurgeButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Forge = () => {
    const elements = [
        { name: "Water", emoji: "🌊" },
        { name: "Earth", emoji: "🌍" },
        { name: "Fire", emoji: "🔥" },
        { name: "Wind", emoji: "🌬️" },
        { name: "Metal", emoji: "⚒️" },
        { name: "Wood", emoji: "🌲" },
    ];

    return (
        <div className="w-[25%] bg-white relative rounded-r-lg h-full p-4 flex flex-col">
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
                <LogoutButton className="flex-1 mx-1" />
            </div>
        </div>
    );
};

export default Forge;
