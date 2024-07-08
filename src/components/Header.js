import {useContext, useState} from 'react';
import { LOGO_URL } from "../utils/constants";  
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { FaBars, FaAngleDown, FaShoppingCart} from 'react-icons/fa'
import { FaXmark } from "react-icons/fa6";
import QuickBowl from '../Assests/QuickBowl.png';
import City from './City';
const Header = () => {
    const [btnLogin, setBtnLogin] = useState("Login");
    const isOnline = useOnlineStatus();
    const defaultUser = useContext(UserContext);
    const cartItems = useSelector((store)=>store.cart.items);
    const userCity = useSelector(store => store.user.cityName)
    const [cityVisibility, setCityVisibility] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(window.innerWidth > "1020"); //true
    console.log("cartItems", cartItems)
    console.log("defaultUser", defaultUser)
    console.log("rerendering...");
    return (
        <div className="header fixed z-50 top-0 left-0 right-0 flex justify-between bg-white shadow-md h-24 xs:h-24">
            <div className="logo-container flex items-center">
            <Link to="/"><img className="w-24" src={QuickBowl} alt="logo" /></Link>
            <div className='flex items-center p-4 xs:text-xl hover:text-orange-500 cursor-pointer text-gray-500 bg-transparent' onClick={()=> setCityVisibility(prev => !prev)}>
                    <span className='pr-2'>{userCity}</span>
                    <span className='text-orange-500'><FaAngleDown /></span>
                </div>
            </div>
            <div className="flex items-center">
            <button className="lg:hidden text-black focus:outline-none ml-4 mr-14" onClick={() => setMenuOpen(prev => !prev)}>{isMenuOpen ? <FaXmark className='w-8 h-8' /> : <FaBars className='w-8 h-8' />}</button>
                <ul className={`fixed lg:flex lg:static m-8 mr-0 p-4 right-0 top-8 xs:top-16 bg-white transform ${isMenuOpen  ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out`}>
                    <li className="px-4 mb-4 lg:mb-0 text-[#3D4152] font-semibold hover:text-orange-500">Online Status: {isOnline ? "✅" : "🔴"}</li>
                    <li className="px-4 relative mb-4 lg:mb-0 text-[#3D4152] font-semibold hover:text-orange-500"><Link to='/cart'>
                        <div className='flex'><span>Cart</span> <span><FaShoppingCart className='h-8 w-8 text-green-600' /></span></div>
                        <span className='absolute top-0 left-16 text-gray-50 font-bold'>{cartItems.length }</span></Link></li> {console.log(cartItems.length)}
                    <li className="px-4 mb-4 lg:mb-0 text-[#3D4152] font-semibold hover:text-orange-500"><Link to="/grocery">Grocery</Link></li>
                    <li className='relative w-28 text-[#3D4152] font-semibold hover:text-orange-500'>
                        <button className='login-btn min-w-[4rem] mb-8 lg:mb-0 '
                            onClick={()=>{
                                btnLogin === "Login" ? setBtnLogin("Logout") : setBtnLogin("Login");
                            }}
                        >{btnLogin}</button>
                        <p className='absolute left-0 top-8'>{ btnLogin === "Login" ? "" : defaultUser.loggedInUser}</p>
                    </li>
                   
                </ul>
            </div>
            <div className={`transition-transform transform duration-500 ease-in-out ${cityVisibility ? 'translate-x-0' : '-translate-x-full'} bg-slate-100 p-4 absolute top-0 left-0`}>
                <City handleVisible={setCityVisibility} X={FaXmark}/>
            </div>
        </div>
   
    )
}
export default Header;