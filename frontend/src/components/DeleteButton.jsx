import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const DeleteButton = () => {
    const { loading, logout } = useLogout();

    return (
        <div className="mt-auto">
            {!loading ? (
                <BiLogOut
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    onClick={logout}
                />
            ) : (
                <span className="loading loading-spinner" />
            )}
        </div>
    );
};

export default DeleteButton;
