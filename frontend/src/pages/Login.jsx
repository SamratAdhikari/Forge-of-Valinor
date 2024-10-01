import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login
                    <span className="text-yellow-500"> Forge</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full input input-bordered h-10"
                        />
                    </div>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-6"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>

                    <Link
                        to="/signup"
                        className="text-sm hover:underline hover:text-yellow-600 mt-2 block mx-auto text-center"
                    >
                        {"Don't have an account?"}
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
