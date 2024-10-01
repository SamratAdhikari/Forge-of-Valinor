import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ email, username, password, confirmPassword }) => {
        const success = handleInputErrors({
            email,
            username,
            password,
            confirmPassword,
        });

        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    confirmPassword,
                }),
            });

            const data = await res.json();

            // check if the response contains a success flag
            if (!data.success) {
                throw new Error(data.message);
            }

            // store user details in local storage
            localStorage.setItem("user-info", JSON.stringify(data.userDetails));

            // set authenticated user in context
            setAuthUser(data.userDetails);

            // success message
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword }) {
    if (!(email && username && password && confirmPassword)) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords donot match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be atleast 6 characters long");
        return false;
    }

    return true;
}
