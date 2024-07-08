
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import greenstar from "../Assests/greenstar.png";
const RestaurantMenu = ()=>{
    const [showIndex, setShowIndex] = useState(null);
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
    if(resInfo === null){
        return <Shimmer />
    }
    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])
    console.log(resInfo?.cards[2]?.card.card.info);
    const { name,
        avgRating,
        cuisines,
        locality,
        totalRatingsString, costForTwoMessage} = resInfo?.cards[2]?.card.card.info;
    const {
            lastMileTravelString,
            deliveryTime,
        } = resInfo?.cards[0]?.card?.card?.info?.sla || resInfo?.cards[2]?.card?.card?.info?.sla || resInfo?.cards[5]?.card?.card?.info?.sla || resInfo?.cards[4]?.card?.card?.info?.sla || {};
    
    // const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card;
    console.log(resInfo)
   const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
   console.log("categories", categories)
    return (
        <div className="mt-28">
           <div className="flex justify-center mt-5 flex-wrap">
                <div className="flex justify-between gap-2 border-b-2 sm:w-9/12 sm:px-4">
                    <div className="flex flex-col gap-2 mb-2">
                        <p className="font-bold">{name}</p>
                        <div className="text-gray-400">
                            <p>{cuisines.join(', ')}</p>
                            <p>{locality}</p>
                        </div>
                        <div className="flex gap-1 items-center text-gray-400">
                            <img className="w-5 h-4" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/v1648635511/Delivery_fee_new_cjxumu" alt="rider" />
                            <p>{lastMileTravelString} | {deliveryTime} mins</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center border h-1/2 p-2">

                        <div className="flex items-center gap-1 border-b">
                            <img className="w-[0.9em] h-[0.9em]" src={greenstar} alt="greenstar" />
                            <p className="text-[#3D9B6D] font-bold">{avgRating}</p>
                        </div>
                        <div className="flex">
                            <p className="text-gray-400 font-bold text-[10px]">{totalRatingsString}</p>
                        </div>
                    </div>
                </div>
            </div>
            {categories?.map((category, index)=>{
                return <RestaurantCategory key={category.card.card.title} data={category?.card?.card}  showItems = {showIndex===index ? true : false}  setShowIndex={(show)=>{show ? setShowIndex(index) : setShowIndex(null)}} />
            })}
        </div>
    )
}
export default RestaurantMenu;