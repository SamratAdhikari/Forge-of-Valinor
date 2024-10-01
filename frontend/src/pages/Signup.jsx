import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    const { loading, signup } = useSignup();

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Signup
                    <span className="text-yellow-500"> Forge</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            value={inputs.email}
                            placeholder="Enter your email"
                            className="w-full input input-bordered h-10"
                            onChange={(e) =>
                                setInputs({ ...inputs, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            value={inputs.username}
                            placeholder="Enter a username"
                            className="w-full input input-bordered h-10"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
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
                            value={inputs.password}
                            placeholder="Enter a password"
                            className="w-full input input-bordered h-10"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            value={inputs.confirmPassword}
                            placeholder="Enter the password again"
                            className="w-full input input-bordered h-10"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-parser" />
                            ) : (
                                "Sign up"
                            )}
                        </button>
                    </div>

                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-yellow-600 mt-2 block mx-auto text-center"
                    >
                        {"Already have and account?"}
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;
