import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import TrackFi from './../assets/TrackFi.png'
import { useSelector } from 'react-redux';

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-white shadow-md py-4 lg:px-28 px-6 flex justify-between items-center fixed top-0 w-full z-50">
                <Link to="/" className="text-2xl font-bold text-emerald-600">
                    <img src={TrackFi} alt="TrackFi" className="h-10 w-auto" />
                </Link>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className={`font-medium ${isActive('/') ? 'text-amber-500' : 'text-gray-600 hover:text-emerald-600'}`}>Home</Link>
                    <Link to="/about" className={`font-medium ${isActive('/about') ? 'text-amber-500' : 'text-gray-600 hover:text-emerald-600'}`}>About</Link>

                    {user ? (
                        <Link to="/dashboard">
                            <div className="border border-emerald-500 shadow-md shadow-emerald-100 rounded-full px-2 py-1 flex gap-1 items-center">
                                <p className="">{user?.email}</p>
                                <div className="w-4 h-4 sm:w-8 sm:h-8 overflow-hidden rounded-full border border-emerald-300">
                                    <img
                                        src={user?.image}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded-md font-medium hover:bg-emerald-50 transition"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <FiMenu className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-start justify-end p-4">
                    <Dialog.Panel className="bg-white w-2/3 p-6 shadow-lg rounded-lg space-y-4 relative">
                        {/* Close Icon */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        <Link to="/" className={`block ${isActive('/') ? 'text-amber-500' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/about" className={`block ${isActive('/about') ? 'text-amber-500' : 'text-gray-800'}`} onClick={() => setIsOpen(false)}>About</Link>

                        {user ? (
                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                <div className="border border-emerald-500 shadow-md shadow-emerald-100 rounded-full px-2 py-1 mt-4 flex gap-1 items-center">
                                    <p className="">{user?.email}</p>
                                    <div className="w-4 h-4 sm:w-8 sm:h-8 overflow-hidden rounded-full border border-emerald-300">
                                        <img
                                            src={user?.image}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className='flex gap-2 w-full'>
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block bg-emerald-600 text-white px-4 py-2 rounded-md font-medium text-center hover:bg-emerald-700 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="block border border-emerald-600 text-emerald-600 px-4 py-2 rounded-md font-medium text-center hover:bg-emerald-50 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
