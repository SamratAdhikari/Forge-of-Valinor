import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ email, password }) => {
        const success = handleInputErrors({
            email,
            password,
        });

        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();
            console.log("data", data);

            // check if the response contains a success flag
            if (!data.success) {
                throw new Error(data.message);
            }

            // store user details in local storage
            localStorage.setItem("user-info", JSON.stringify(data.user));

            // set authenticated user in context
            setAuthUser(data.user);

            // success message
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
    if (!(email && password)) {
        console.log(email, password);
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Invalid credentials");
        return false;
    }

    return true;
}
