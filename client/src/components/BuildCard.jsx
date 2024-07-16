import { useDispatch } from "react-redux"
import { delete_build } from "../store/slicer/dataSlicer"

export default function BuildCard({ data, type, Monster }) {
    const dispatch = useDispatch()
    console.log(Monster, `ini monster`);
    console.log(data, `ini data`);
    const clickHandler = () => {
        dispatch(delete_build(data.id))
    }
    return (
        <>
            <div className="container grid grid-cols-7 gap-4">

                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.Monster.imageUrl} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.Monster.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.head.data.assets.imageMale} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.head.data.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.chest.data.assets.imageMale} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.chest.data.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.legs.data.assets.imageMale} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.legs.data.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.waist.data.assets.imageMale} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.waist.data.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.gloves.data.assets.imageMale} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.gloves.data.name} </h1>
                    </div>
                </div>
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-[29rem] grid grid-rows-2">
                    <div className="container h-[80%] row-span-1">
                        <img className="object-scale-down h-full w-full" src={data.weapon.data.assets.image} />
                    </div>
                    <div className="container h-[20%] flex justify-center items-center text-white font-medium text-xl row-span-1">
                        <h1>{data.weapon.data.name} </h1>
                    </div>
                </div>
            </div>
            {type === "yourBuild" ? (
                <>
                    <div className="container w mx-0 min-w-full flex flex-col items-center">
                        <button className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded">Edit</button>
                    </div>
                    <div className="container w mx-0 min-w-full flex flex-col items-center">
                        <button className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded" onClick={clickHandler}>Delete</button>
                    </div>
                </>
            ) : null}

        </>
    )
}