import {  DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users,LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link ,useNavigate} from "react-router";



const SIDEBAR_ITEMS = [

    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
    { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
    { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
    { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];




const Sidebar = ({user}) => {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user from localStorage
        navigate("/login"); // Redirect to login page
    };


    return (
        <motion.div
            className={` absloute left- z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"
                }`}
            animate={{ width: isSidebarOpen ? 320 : 80 }}
        >
            <div className='flex bg-base-200 items-center justify-between p-4 border-b border-r border-primary-content'>
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.span
                            className='mt-3 ml-4 avatar flex items-center'
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 }}>
                                    <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                                        <Link to={'/'} ><img src={user.avatar}  alt="User Avatar" /></Link>
                                    </div>
                                    <p className=" ml-3 text-sm font-semibold  items-center ">{user.name}</p>
                        </motion.span>
                    )}
                </AnimatePresence>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='p-2 ml-2  rounded-full hover:bg-primary-content transition-colors max-w-fit'
                >
                    <Menu size={24} />
                </motion.button>
            </div>
            <div className='h-full bg-base-200  p-4 flex flex-col border-r border-primary-content'>
                <nav className='mt-8 flex-grow'>
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-primary-content  transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                     {/* Logout Button */}
                     <button
                        onClick={handleLogout}
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-primary-content
                        transition-colors mb-2 w-full cursor-pointer"
                    >
                        <LogOut size={20} style={{ color: "#EF4444", minWidth: "20px" }} />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    className="ml-4 whitespace-nowrap"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2, delay: 0.3 }}
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </nav>
            </div>
        </motion.div>
    );
};
export default Sidebar;