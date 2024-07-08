import {useState, useEffect} from "react";
import { MENU_URL, SERVER_URL } from "./constants";
import { useSelector } from "react-redux";
const useRestaurantMenu = (resId)=>{
    const [resInfo, setResInfo] = useState(null);
    const {latitude, longitude} = useSelector(store => store.user)
    useEffect(()=>{
        fetchMenu()
    },[])
    const fetchMenu = async ()=>{
        const data = await fetch(`${SERVER_URL}/api/swiggy/getMenu?lat=${latitude}&lng=${longitude}&restaurantId=${resId}`)
        const json = await data.json();
        setResInfo(json.data);
    }
    return resInfo;
}
export default useRestaurantMenu;