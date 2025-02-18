import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal';
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../features/auth/authApi';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {

    const products = useSelector((state) => state.cart.products);
    const [isCartOpen, setisCartOpen] = useState(false);
    const handleCartToggle = () => {
        setisCartOpen(!isCartOpen);
    }

    // show user if logged in
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    // dropdown menu
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    // admin dropdown menu
    const adminDropDownMenu = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: "Manage Items", path: "/dashboard/manage-orders" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add New Post", path: "/dashboard/add-new-post" },
    ];

    // user dropdown menu
    const userDropDownMenu = [
        { label: "Profile", path: "/dashboard/profile" },
    ];

    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenu] : [...userDropDownMenu];

    const handleLogout = async () => {
        try {
            // Logging user out and clearing session
            await logoutUser().unwrap();
            dispatch(logout()); // Clear user state
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again later.'); // Show a user-friendly message
        }
    }

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <div className='nav__logo'>
                    <Link to="/">Cartflow</Link>
                </div>
                <ul className='nav__links flex justify-center'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/contact">Contact</Link></li>
                </ul>

                <div className='nav__icons relative'>
                    <span><Link to="/search"><i className="ri-search-line"></i></Link></span>
                    <span><button onClick={handleCartToggle} className='hover:text-primary'>
                        <i className="ri-shopping-bag-line"></i>
                        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>
                            {products.length}
                        </sup>
                    </button></span>
                    <span>
                        {
                            user ? (
                                <div className='flex items-center space-x-2'>
                                    <img
                                        onClick={handDropDownToggle}
                                        src={user?.profileImage || avatarImg} alt="user-avatar"
                                        className='size-6 rounded-full cursor-pointer' />
                                    <span className='font-medium'>{user?.username}</span>
                                    {
                                        isDropDownOpen && (
                                            <div className='absolute top-5 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                                <ul className='font-medium space-y-4 p-2'>
                                                    {dropdownMenus.map((menu, index) => (
                                                        <li key={index}>
                                                            <Link onClick={() => setIsDropDownOpen(false)} className='dropdown-items' to={menu.path}>
                                                                {menu.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li>
                                                        <Link onClick={handleLogout} className='dropdown-items'>Logout</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <Link to="/login"><i className="ri-user-line"></i></Link>
                            )
                        }
                    </span>
                </div>
            </nav>
            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
            }
        </header>
    )
}

export default Navbar;
