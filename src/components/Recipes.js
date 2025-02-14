import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RES_LOGO } from '../utils/constants';

const Recipes = (props) =>{
    const { resObj } = props
    // console.log(resData)
    const { imageId } = resObj;
    const navigate = useNavigate();
  
    const handleClick = () => {
      // Use navigate to go to the new route with state
      const link = resObj?.action?.link
      const query = link.substring(link?.indexOf('?')+1)
      navigate(`/collection/${resObj?.id}?${query}`, { state: { link: resObj?.action?.link } });
    };

    return (
        <div data-testid="recipes" className=" m-1 p-1 w-[7rem] md:w-[10rem] rounded-lg" onClick={handleClick}>
            <img className="rounded-lg h-32 md:h-40 cursor-pointer" alt="restaurant logo"
                src={RES_LOGO + imageId}
            />
        </div>
    )
}

export default Recipes