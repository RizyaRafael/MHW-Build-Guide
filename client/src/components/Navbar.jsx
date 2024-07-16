import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    const [logedIn, setLogedIn] = useState(true)

    const logoutHandler = () => {
        localStorage.removeItem(`access_token`)
        setLogedIn(false)
        navigate('/')
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setLogedIn(!!accessToken)

    }, [localStorage.access_token]);
    return (
        <>
            <div className="relative h-screen w-full bg-slate-800 flex flex-col">
                <div className="mt-6 mb-6 container w-full h-34 flex justify-center align-middle">
                    <Link to={'/'} className="object scale-down h-full w-3/4"  >
                        <img src="https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/monster-hunter-wiki-guide-logo-large.png" alt="" />
                    </Link>
                </div>

                <div className="flex flex-row h-full" >
                    <div className="flex-none w-32">
                    </div>
                    <div className="flex flex-col justify-content-around text-xl text-white justify-between mb-7" id="cek ini">
                        <div className="">
                            <div className="underline decoration-2 text-[28px]">
                                <Link to={'/armors'} >Armors</Link >
                            </div >
                            <div className="flex flex-col text-slate-500">
                                <Link to={'/'} >Head Gear</Link>
                                <Link to={'/'}>Chest Gear</Link>
                                <Link to={'/'}>Legs Gear</Link>
                                <Link to={'/'}>Waist Gear</Link>
                                <Link to={'/'}>Gloves Gear</Link>
                                <Link to={'/'}>Weapon</Link>
                            </div>
                        </div>
                        <div>
                            <div className="underline decoration-2 text-[28px]">

                                <Link to={'/MonsterList'}>Monster List</Link>
                            </div >
                            <div className="flex flex-col text-slate-500">

                                <Link to={'/'}>Monster Build</Link>
                                <Link to={'/YourBuild'}>Your Build</Link>
                            </div>
                        </div>

                        <div>
                            {localStorage.access_token ? (
                                <button onClick={logoutHandler}>Logout</button>
                            ) :
                                <>
                                    <Link to={'/login'}>Login</Link>
                                    <Link to={'/register'}>Register</Link>
                                </>
                            }
                        </div>

                    </div>
                </div >
            </div >
        </>
    )
}