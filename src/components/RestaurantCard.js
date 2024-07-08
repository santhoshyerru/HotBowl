import { Link } from "react-router-dom";
import { CDN_URL, RES_LOGO, STAR_ICON_URL } from "../utils/constants";
import { useEffect } from "react";

const RestaurantCard = ({resObj}) => {
    const { name, cuisines, avgRatingString, cloudinaryImageId, costForTwo } = resObj?.info;
    const time = resObj?.info?.sla?.deliveryTime;
      return (
        <Link to={"/restaurant/" + resObj?.info?.id}>
        <div data-testid="rescard">
            <div className="w-60 mb-5 mr-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300 ">
                <img className=" w-80 h-60 rounded-2xl" alt="food-image" src={CDN_URL + cloudinaryImageId} />
                <h3 className="font-bold">{name}</h3>
                <h4>{costForTwo}</h4>
                <div className="flex items-center">
                    <img className="w-4  h-4 rounded-full mr-1" src={STAR_ICON_URL} alt="star"/>
                    <div className="flex gap-1"><h4>{avgRatingString}</h4>
                    <h4>| {time} minutes</h4></div>
                </div>
            </div>
        </div>
        </Link>
    );
}
export const withOpenLabel = (RestaurantCard)=>{
    return (props)=>{
        return (
            <div>
   
                <label className="absolute bg-black text-white rounded-lg m-2 p-2">Open</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}
export const withOfferLabel = (RestaurantCard) => {
    return (props)=>{
        const { header,subHeader } = props?.resObj?.info?.aggregatedDiscountInfoV3
        return (
            <div>
                <label className="absolute p-2 mt-48 text-xl sm:text-xl font-extrabold text-white rounded-lg  bg-black-50">{header} {subHeader}</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}
export default RestaurantCard;