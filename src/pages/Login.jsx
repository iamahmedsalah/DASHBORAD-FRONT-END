
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { fadeIn } from "../variants";
import { Loader, Eye , EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const SESSION_DURATION = 30 * 60 * 1000;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);


        try {
            // Fetch users from the mock API
            const response = await fetch(
                "https://67f0c8032a80b06b88989e4b.mockapi.io/dashboard/users"
            );
            const users = await response.json();
            // Check if the user exists with the provided email and password
            const user = users.find(
                (u) => u.email === email && u.password === password
            );
            if (user) {
                // Save user data to localStorage
                localStorage.setItem("user", JSON.stringify(user));

                // Set a timeout to remove the user after the session duration
                setTimeout(() => {
                    localStorage.removeItem("user");
                    toast.error("Session expired. Please log in again.");
                    navigate("/login");
                }, SESSION_DURATION);

                toast.success("Login Successful! Redirecting to dashboard...");
                // Redirect to the home page
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <motion.div
                    className="text-center"
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    <h1 className="text-5xl font-bold">Dashborad</h1>
                    <h2>Login</h2>
                    <p className="py-6">
                        Welcome back! Please enter your credentials to access your account.
                    </p>
                </motion.div>
                <motion.div
                    className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    <form className="card-body" onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label className="fieldset-label"> Email </label>
                            <input
                                className="input validator"
                                type="email"
                                required
                                placeholder="mail@site.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="validator-hint">Enter valid email address</div>
                            <label className="fieldset-label">Password</label>
                            <input
                                type={showPassword ? "password" : "text"}
                                className="input validator"
                                required
                                placeholder="Password"
                                minLength="8"
                                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z\d]{8,}$"
                                title="Password must be at least 8 characters long, include at least one number, one lowercase letter, one uppercase letter, and one special character."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                                <button
                                    type="button"
                                    className=" absolute right-15 bottom-39 text-gray-500 hover:text-gray-700 max-sm:right-10"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            <p className="validator-hint">Enter your password</p>
                    {error && <div role="alert" className="alert alert-error alert-soft flex justify-center items-center">
                        <span>{error}</span>
                    </div>}
                            <p className="font-semibold">Don't have account ? 
                                 <Link to="/register" className="link link-info">
                                Register
                            </Link></p>
                            <button
                                className="btn btn-neutral mt-4"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Login"}
                            </button>
                        </fieldset>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
