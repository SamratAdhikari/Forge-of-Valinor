import gauntletIcon from "../../assets/icons/gauntlet.png"; // Adjust the path as necessary

const PurgeButton = () => {
    const purge = () => {
        console.log("Delete all elements");
    };

    return (
        <button
            className="flex flex-1 mx-1 items-center justify-center bg-gray-200 border-2 border-gray-300 hover:bg-gray-400 p-2 rounded-md shadow-md transition-colors duration-300"
            onClick={purge}
        >
            <img
                src={gauntletIcon}
                alt="Infinity Gauntlet"
                className="w-6 h-6 cursor-pointer"
            />
            <span className="ml-2 text-[#282C34] font-semibold">Purge</span>
        </button>
    );
};

export default PurgeButton;
