import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ProductsTable = ({ products, setProducts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with the `products` prop
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [editingProduct, setEditingProduct] = useState(null); // State to track the product being edited
    const [isEditing, setIsEditing] = useState(false); // State to toggle the edit modal
    const itemsPerPage = 7; // Number of items per page

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to the first page after search
    };

    // Handle delete product
    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
		toast.success("Product deleted successfully");
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products
    };

    // Handle edit product
    const handleEdit = (product) => {
        setEditingProduct(product); // Set the product to be edited
        setIsEditing(true); // Open the edit modal
    };

    // Handle save product
    const handleSave = () => {
        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Update filtered products
        setIsEditing(false); // Close the edit modal
		toast.success("Product updated successfully");
    };

    return (
        <motion.div
            className='bg-base-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-primary-content mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex max-sm:flex-col justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold '>Product List</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-base-300 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-content max-sm:w-40'
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className='absolute left-3 top-2.5 ' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Category
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Price
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Stock
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Sales
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-primary-content'>
                        {currentProducts.map((product) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center'>
                                    <img
                                        src={product.image}
                                        alt='Product img'
                                        className='size-10 rounded-full'
                                    />
                                    {product.name}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm '>
                                    {product.category}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm '>
                                    ${product.price}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm '>{product.count}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm '>{product.sales}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm '>
                                    <button
                                        className='text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer'
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className='text-red-400 hover:text-red-300 cursor-pointer'
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center mt-6'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full cursor-pointer ${
                            currentPage === index + 1
                                ? 'bg-primary text-white'
                                : 'bg-base-300 text-gray-500'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        className='fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className='bg-base-100 rounded-lg p-6 w-96 shadow-2xl'
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className='text-xl font-semibold mb-4'>Edit Product</h2>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium mb-1'>Name</label>
                                <input
                                    type='text'
                                    className='w-full border rounded-lg px-3 py-2'
                                    value={editingProduct.name}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium mb-1'>Category</label>
                                <input
                                    type='text'
                                    className='w-full border rounded-lg px-3 py-2'
                                    value={editingProduct.category}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, category: e.target.value })
                                    }
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium mb-1'>Price</label>
                                <input
                                    type='number'
                                    className='w-full border rounded-lg px-3 py-2'
                                    value={editingProduct.price}
                                    onChange={(e) =>
                                        setEditingProduct({ ...editingProduct, price: e.target.value })
                                    }
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    className='px-4 py-2 bg-base-300 rounded-lg mr-2 cursor-pointer'
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='px-4 py-2 bg-primary text-white rounded-lg cursor-pointer'
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

export default ProductsTable;