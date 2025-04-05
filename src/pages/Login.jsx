
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { fadeIn } from "../variants";
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const nevigate = useNavigate();

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
                console.log("Login successful:", user);
                toast.success("Login Successful redirecting to dashboard...");
                // Redirect or perform further actions here
                setTimeout(() => {
                    nevigate('/dashboard',{ state: { user }});
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
                                type="password"
                                className="input validator"
                                required
                                placeholder="Password"
                                minLength="8"
                                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z\d]{8,}$"
                                title="Password must be at least 8 characters long, include at least one number, one lowercase letter, one uppercase letter, and one special character."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!password ? (
                                <p className="validator-hint">Enter your password</p>
                            ) : (
                                <p className="validator-hint">
                                    Password must be at least 8 characters long, including:
                                    <br />
                                    - At least one number
                                    <br />
                                    - At least one lowercase letter
                                    <br />
                                    - At least one uppercase letter
                                </p>
                            )}
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
