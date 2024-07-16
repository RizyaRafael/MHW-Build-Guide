import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { get_all_armors } from "../store/slicer/dataSlicer";

export default function Armors() {
    const data = useSelector((state) => state.items.all_armors)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!data[0]) {
            dispatch(get_all_armors())
        }
    })
    return (
        <>
            <div className="">
                <div className="bg-white h-12 w-full flex items-center justify-center text-[24px] font-bold">
                    <h1>Armors list</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 px-4 py-4">
                    {data.map((el) => {
                        return < Card type="armors" data={el} key={el.id} armorId={el.id} />
                    })}
                </div>
            </div>
        </>
    )
}