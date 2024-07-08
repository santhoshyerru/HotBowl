import { useEffect } from "react";

const About = () => {
    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="lg:mx-[10%] p-3 my-36 flex items-center justify-center text-center">
           

            <div className="bg-slate-200 p-4 w-1/2 shadow-xl">
                <img 
                    src='https://avatars.githubusercontent.com/u/67948067?v=4' 
                    className='rounded-full w-[40%] m-auto'
                    alt="Santhosh Yerru"
                />
                <div className='text-center mt-2'>
                    <div className='font-bold'>Santhosh Yerru</div>
                    <div>Web Developer</div>
                    <div>Cincinnati, OH</div>
                </div>
                <div className="flex items-center justify-center mt-3">
                    <a href="https://github.com/santhoshyerru" target="_blank" rel="noreferrer" className="mr-3">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            alt="Github"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://www.linkedin.com/in/santhoshyerru/" target="_blank" rel="noreferrer" className="mr-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png"
                            alt="LinkedIn"
                            width={30}
                            height={30}
                        />
                    </a>
                    <a href="https://leetcode.com/u/santhosh_yerru/" target="_blank" rel="noreferrer">
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-512/free-leetcode-3521542-2944960.png?f=webp&w=512"
                            alt="LeetCode"
                            width={30}
                            height={30}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;