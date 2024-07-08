import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header'
import Body from './components/Body'
import About from './components/About'
import Contact from './components/Contact'
import Error from './components/Error'
import RestaurantMenu from './components/RestaurantMenu';
import { Outlet, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import UserContext from './utils/UserContext';
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import  Cart from "./components/Cart";
import RecipesRestaurant from './components/RecipesRestaurant';
import Footer from './components/Footer';
// import Grocery from './components/Grocery';

// Instead of directly importing the grocery we will lazy import only when ever it is necessary

const Grocery = lazy(()=>import('./components/Grocery'));
const AppLayout = () => {
    const [userName, setUserName] = React.useState("");
    useEffect(()=>{
        //api call
        const data = {name: "santhosh"}
        setUserName(data.name);
    }, [])
    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
        <div className="app">
            <Header />
            <div className='mt-28 xs:mt-28'><Outlet /></div>
            <Footer />
        </div>
        </UserContext.Provider>
        </Provider>
    )
}
const AppRouter = createHashRouter([
    { path: "/",
      element: <AppLayout/>,
      children: [
        {
            path: "/",
            element: <Body/>
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "grocery",
            element: <Suspense fallback={<h1>Loading.... </h1>}><Grocery /></Suspense>
        },
        {
            path: "/restaurant/:resId",
            element: <RestaurantMenu />
        },
        {
            path:"/cart",
            element: <Cart />
        },
        {
            path: "/collection/:query",
            element: <RecipesRestaurant />
        },
      ],
      errorElement: <Error />
    },
  
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />);