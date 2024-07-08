import { useState, useEffect, useContext, useRef } from "react";
import RestaurantCard, { withOfferLabel, withOpenLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { API_END, API_START, SWIGGY_API, UNSERVICEABLE_ERROR, payload, SERVER_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { RESTAURANTS_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Recipes from "./Recipes";
import checkIt from "./CheckIt";

const Body = () => {
    const resContainerRef = useRef(null)
    const footerDataRef = useRef(null)
    const [makeApiCall, setMakeApiCall] = useState(false)
    const [resList, setResList] = useState([]);
    const [FilteredResList, setFilteredResList] = useState([]);
    const [topRestaurantChain, setTopRestaurantChain] = useState([]);
    const [searchName,setSearchName] = useState("");
    const isOnline = useOnlineStatus();
    const OpenedRestaurantCard = withOpenLabel(RestaurantCard)
    const RestaurantCardOffer = withOfferLabel(RestaurantCard);
    const {loggedInUser, setUserName} = useContext(UserContext);
    const [recipes, setRecipes] = useState([])
    console.log(loggedInUser);
    const userLocation = useSelector(store => store.user)
    const {latitude, longitude} = userLocation
    const RecipesCard = checkIt(Recipes)
    const MiniResCard = checkIt(RestaurantCard)

    const debounce = (func, delay=300) =>{
        let timer;

        return function(){

            clearTimeout(timer)
            let args = arguments
            let Content = this
            timer = setTimeout(()=>{
                // console.log("hello ", resLists?.length, filteredList?.length)
                func.apply(Content, args)
                // resLists?.length > 0 && func.apply(Content, args)
            }, delay)
        }
    }
    const getData = () => {
        // Handle visibility
        let resContainerVisibility, footerDataVisibility, notAtPageBottom;
        if (resContainerRef.current) {
          const { top, bottom } = resContainerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          resContainerVisibility = top < windowHeight && bottom >= 120;
        }
        if (footerDataRef.current) {
          const { top, bottom } = footerDataRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          footerDataVisibility = top < windowHeight && bottom >= 0;
          
        }
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        notAtPageBottom = (windowHeight + scrollTop) < fullHeight;
        const apiCall = resContainerVisibility && footerDataVisibility && notAtPageBottom;
        setMakeApiCall(apiCall);
        if (apiCall) {
          postData();
          console.log("post call")
        }
      };
   
    const postData = async () =>{
        
        try{
            console.log("in post call")
        const url = "https://coder-food-server-imnaval.vercel.app/api/swiggy/update"
        console.log("url: " + url)
        console.log("data: ", payload)
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body : JSON.stringify(payload)
        })

        const json = await data.json();
        console.log(json);
      
        payload.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
        setResList(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
        setFilteredResList(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
        setMakeApiCall(false);
        }
        catch{
            setMakeApiCall(false);
        }
    }
    const scrollHandler = debounce(getData)
    useEffect(()=>{
        window.scrollTo(0, 0)
        fetchData();
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [userLocation])
    fetchData = async () => {
        // const response = await fetch(RESTAURANTS_URL);
        
        const response = await fetch(`${SERVER_URL}/api/swiggy/getData?lat=${latitude}&lng=${longitude}`)

        const json = await response.json();
        console.log(json)
        payload.nextOffset = json?.data?.pageOffset?.nextOffset;
        payload._csrf = json?.csrfToken;
        payload.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
        console.log("initial", payload)
        const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setResList(restaurants);
        setFilteredResList(restaurants);
        setTopRestaurantChain(json?.data?.cards[1]?.card?.card.gridElements?.infoWithStyle?.restaurants)
        setRecipes(json?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    }
    if(!isOnline){
        return <h1>Please Check your internet connection!!!</h1>
    }
    if(resList?.length===0){
        return <Shimmer />
    } 
    return (
        !resList ? <div className="flex justify-center mt-24">
        <img src={UNSERVICEABLE_ERROR} alt="unservisable"/>
    </div>
        :
        <div className="mt-14">
            <div className="m-8 mt-32">
                    <h2 className="text-2xl sm:font-bold mb-4">What's on your mind?</h2>
                    <RecipesCard resObj={recipes} />
                </div>

                <div className="m-8">
                    <h2 className="text-2xl sm:font-bold mb-4">Top Restaurant Chains</h2>
                    <MiniResCard resObj={topRestaurantChain} />
                </div>
                <hr className="mt-8 mb-4 mx-8"></hr>
            <div className="filter flex justify-center">
                <div className="search my-4 p-4 ">
                    <input type="text" data-testid="SearchInput" className="p-2 ml-[10%] sm:ml-[20%] md:ml-4 m-4 w-[16rem] sm:w-[24rem] border-2 border-solid border-gray-500 rounded-xl" placeholder="Search for restaurants" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}}/>
                    
                </div>
                <div className="search my-4 p-4 flex items-center"><button className="px-4 py-2 relative w-full h-10 border-2 my-4 border-green-500 border-collapse text-black font-bold overflow-hidden bg-white rounded-lg transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-green-500 before:to-green-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0"  onClick={()=>{
                        setFilteredResList(resList.filter((restaurant)=> (restaurant.info.name.toLowerCase().includes(searchName.toLowerCase()))));
                    }}>Search</button></div>
                <div className="search m-4 p-4 flex items-center">
                <button className="px-4 py-2  m-2  relative w-full h-10 border-2 my-4 border-orange-500 border-collapse text-black font-bold overflow-hidden bg-white rounded-lg transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-orange-500 before:to-orange-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0" onClick={()=>{
                  setFilteredResList(resList.filter((restaurant)=> (restaurant.info.avgRating>4.3)));
                }}>Top Rated Restaurants</button>
                </div>
            </div>
            <hr className="mb-4 mx-8"></hr>
            <div className="flex flex-wrap justify-center gap-5 px-2 sm:gap-5 w-50 md:px-5 md:gap-7" ref={resContainerRef}>
                {FilteredResList?.map((restaurant) => {
                    return <Link key={restaurant?.info?.id}  to={"restaurant/"+restaurant?.info?.id}>
                        {("aggregatedDiscountInfoV3" in restaurant?.info) ? <RestaurantCardOffer resObj={restaurant} /> : <RestaurantCard resObj={restaurant} />
                        }
                        </Link>
                })}
            </div>
            {makeApiCall && <Shimmer />}
            <div className="footer" ref={footerDataRef}>
               
            </div>
        </div>
    )
}

export default Body;