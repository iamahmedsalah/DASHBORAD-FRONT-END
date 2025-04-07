import React from 'react';
import { Construction } from "lucide-react";
import { Link } from 'react-router';
import { motion } from "framer-motion"; 

const Settings = () => {
    return (
        <motion.div
            className="flex items-center justify-center w-full h-screen bg-gray-200"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }} 
        >
            <motion.div
                className="text-center"
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.3}} 
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Construction size={64} className="text-yellow-500 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings Page</h1>
                <p className="text-lg text-gray-600 mb-6">This page is currently under development. Stay tuned for updates!</p>
                <motion.button
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-[#6EE7B7] rounded-lg shadow hover:bg-primary-content  transition duration-300"
                >
                    <Link to="/">
                        Back to Dashboard
                    </Link>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Settings;