import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { toast } from "react-hot-toast";

const UsersTable = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users); // Initialize with the `users` prop
    const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
    const [isEditing, setIsEditing] = useState(false); // State to toggle the edit modal

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to the first page after search
    };

    // Handle delete user
    const handleDelete = async (userId) => {
        try {
            await fetch(`https://67f0c8032a80b06b88989e4b.mockapi.io/dashboard/users/${userId}`, {
                method: "DELETE",
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
			toast.success("User deleted successfully")
            setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update filtered users
        } catch (error) {
            console.error("Failed to delete user:", error);
			toast.error("Failed to delete user");
        }
    };

    // Handle edit user
    const handleEdit = (user) => {
        setEditingUser(user); // Set the user to be edited
        setIsEditing(true); // Open the edit modal
    };

    // Handle save user
    const handleSave = async () => {
        try {
            await fetch(`https://67f0c8032a80b06b88989e4b.mockapi.io/dashboard/users/${editingUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingUser),
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
            );
            setFilteredUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
            ); // Update filtered users
			toast.success("User updated successfully");
            setIsEditing(false); // Close the edit modal
        } catch (error) {
            console.error("Failed to update user:", error);
			toast.error("Failed to update user");
        }
    };

    return (
        <motion.div
            className="bg-base-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-primary-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex max-sm:flex-col justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Users</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="bg-base-300 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-content max-sm:w-40"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-content">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                            {currentUsers.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                    {user.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.status === "Active"
                                                    ? "bg-green-800 text-green-100"
                                                    : "bg-red-800 text-red-100"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button
                                            className="text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-400 hover:text-red-300 cursor-pointer"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full cursor-pointer ${
                            currentPage === index + 1
                                ? "bg-primary text-white"
                                : "bg-base-300 text-gray-700"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
			
			{/* Edit User Modal */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-96 shadow-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={editingUser.name}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={editingUser.email}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-lg mr-2 cursor-pointer"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default UsersTable;