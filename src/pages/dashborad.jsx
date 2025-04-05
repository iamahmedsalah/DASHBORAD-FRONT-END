import React from "react";
import { useLocation } from "react-router";

const Dashboard = () => {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to the Dashboard</h1>
                    {user ? (
                        <div className="mt-6">
                            <p className="text-xl">Hello, {user.name}</p>
                            <p className="text-lg">Email: {user.email}</p>
                            <div className="avatar">
                                <div className="mask mask-squircle w-24">
                                    <img src={user.avatar} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-lg mt-6">No user data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;