import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_monster_picture } from "../store/slicer/dataSlicer";
import Card from "../components/Card";

export default function MonsterList () {
    const data = useSelector((state) => state.items.monster_picture)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_monster_picture())
    }, [])
    return (
        <>
            <div className="">
                <div className="bg-white h-12 w-full flex items-center justify-center text-[24px] font-bold">
                    <h1>Monster Hunter World: Monster List yang baru</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 px-4 py-4">
                {data.map(el => {
                       return <Card key={el.id} data={el} type={'monster_list'} MonsterId={el.id}/>
                })}
                </div>
            </div>
        </>
    )
}