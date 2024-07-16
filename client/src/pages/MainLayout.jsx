import { Outlet } from "react-router";
import Navbar from "../components/Navbar";


export default function MainLayout () {
    return (
        <>
        <div className='w-full h-screen flex'>
          <div className='flex-auto w-[20vw] '>
            <Navbar />
          </div>
          <div className='flex-auto w-[80vw] overflow-auto h-screen bg-slate-900 '>
            <Outlet />
          </div>
        </div>
      </>
    )
}