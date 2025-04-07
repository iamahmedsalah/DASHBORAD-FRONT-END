import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate form inputs
        if (!name || !email || !password || !confirmPassword) {
            setError("Invalid email or password.")
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            // Send user data to the mock API
            const response = await fetch("https://67f0c8032a80b06b88989e4b.mockapi.io/dashboard/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                toast.success("Sign-up successful! Redirecting to login...");
                console.log("Sign-up successful!");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                toast.error("Failed to sign up. Please try again.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <motion.div className="w-full p-6 m-auto bg-base-100 max-w-sm shrink-0 shadow-2xl rounded-lg "
                    variants={fadeIn("left", 0.3)}
                    initial="hidden"
                    animate="show"
                    exit="hidden">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full input-bordered input validator"
                                pattern="[A-Za-z][A-Za-z0-9\s]*" minLength="3" maxLength="30" title="Only letters, numbers "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <p className="validator-hint">
                                Must be 3 to 30 characters
                                containing only letters,numbers
                            </p>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text ">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="mail@site.com"
                                pattern="^[^@]+@[^@]+\.[^@]+$"
                                maxLength="50"
                                className="w-full input-bordered input validator"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <p className="validator-hint">
                                Enter valid email address
                            </p>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full input-bordered input validator "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="8"
                                maxLength="20"
                                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z\d]{8,}$"
                                title="Password must be at least 8 characters long, include at least one number, one lowercase letter, one uppercase letter, and one special character."
                            />
                            <p className="validator-hint hidden">
                                Password must be at least 8 characters long, including:
                                <br />
                                - At least one number
                                <br />
                                - At least one lowercase letter
                                <br />
                                - At least one uppercase letter
                            </p>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full  input-bordered input validator"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*)[A-Za-z\d]{8,}$"
                                minLength="8"
                                maxLength="20"
                            />
                            <p onChange={(e) => setConfirmPassword(e.target.value)} className="validator-hint">Enter your password again </p>
                        </div>
                        {error && <div role="alert" className="alert alert-error alert-soft flex justify-center items-center">
                            <span>{error}</span>
                        </div>}
                        <div>
                            <button className="btn btn-block btn-neutral" type="submit" disabled={loading}>
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Sign Up"}
                            </button>
                        </div>
                        <span>
                            Already have an account?
                            <Link to="/login" className="link link-info">
                                Login
                            </Link>
                        </span>
                    </form>
                </motion.div>

                <motion.div
                    className="text-center"
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                    <h1 className="text-5xl font-bold">Dashborad</h1>
                    <h2>Register</h2>
                    <p className="py-6">
                        We have received your signup information.<br /> A support admin will be in touch to finalize your account setup.
                    </p>
                </motion.div>

            </div>

        </div>
    );
};

export default SignUp;