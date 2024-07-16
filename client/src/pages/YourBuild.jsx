import { useDispatch, useSelector } from "react-redux";
import BuildCard from "../components/BuildCard";
import { useEffect } from "react";
import { get_user_build } from "../store/slicer/dataSlicer";

export default function YourBuild () {
    const build = useSelector((state) => state.items.user_build)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_user_build())
    }, [])
    return (
        <>
        {build.map((el) => {
            return <BuildCard key={el.id} data={el} type="yourBuild"/>

        })}
        </>
    )
}