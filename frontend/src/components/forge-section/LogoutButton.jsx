import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
    const { loading, logout } = useLogout();

    return (
        <button className="flex flex-1 mx-1 items-center justify-center bg-gray-200 border-2 border-gray-300 hover:bg-gray-400 p-2 rounded-md shadow-md transition-colors duration-300">
            {!loading ? (
                <>
                    <BiLogOut
                        className="w-6 h-6 text-red-800"
                        onClick={logout}
                    />
                    <span className="ml-2 text-red-800 font-semibold">
                        Logout
                    </span>
                </>
            ) : (
                <span className="loading loading-spinner" />
            )}
        </button>
    );
};

export default LogoutButton;
