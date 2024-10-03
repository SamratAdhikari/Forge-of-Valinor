import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <button
            onClick={logout} // Move onClick to the button itself
            className="flex flex-1 mx-1 items-center justify-center bg-gray-200 border-2 border-gray-300 hover:bg-gray-400 p-2 rounded-md shadow-md transition-colors duration-300"
            disabled={loading} // Disable button while loading
        >
            {loading ? (
                <span className="loading loading-spinner" />
            ) : (
                <>
                    <BiLogOut className="w-6 h-6 text-red-800" />
                    <span className="ml-2 text-red-800 font-semibold">
                        Logout
                    </span>
                </>
            )}
        </button>
    );
};

export default LogoutButton;
