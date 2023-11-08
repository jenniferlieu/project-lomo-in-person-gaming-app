import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext.js';
import './NavBar.css';

const NavBar = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className='bg-sky-700 p-4'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='text-white text-3x1 font-bold'>LOMO</div>
                    <ul className='flex space-x-4 text-teal-50'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/createbeacon'>New Beacon</Link></li>
                        <li><Link to='/beaconlist'>List View</Link></li>
                        <li onClick={handleLogout}>Log Out</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;