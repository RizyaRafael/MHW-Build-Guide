import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { get_monster_by_id, get_monster_by_name, get_user_build } from "../store/slicer/dataSlicer"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import BuildCard from "../components/BuildCard";
export default function MonsterBuild() {
    const { MonsterName, MonsterId  } = useParams()
    console.log(MonsterId);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.items.monster_by_id)
    const picture = useSelector((state) => state.items.monster_by_name)
    const build = useSelector((state) => state.items.user_build)

    const weakness = (type) => {

        let weaknes = data.weaknesses.find((item) => item.element === type)
        if (!weaknes) {
            return <h1 className="text-white">Resistance</h1>
        }
        let count = weaknes.stars
        return Array.from({ length: count }, (_, index) => (
            <FaStar key={index} color="yellow" fontSize="1.5em" />
        ));
    }

    const location = () => {
        let newPlace = data.locations.map(el => {
            return el.name
        })
        return newPlace.join(', ')
    }

    useEffect(() => {
        dispatch(get_monster_by_name(MonsterName))
    }, [MonsterName])
    useEffect(() => {
        dispatch(get_monster_by_id(picture.monsterId))
    }, [picture])
    useEffect(() => {
        dispatch(get_user_build(MonsterName))
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="bg-white h-12 w-full flex items-center justify-center text-[24px] font-bold">
                    <h1>Monster: {MonsterName}</h1>
                </div>
                <div className="container bg-black h-[400px] flex align-self">
                    <div className="flex items-center w-1/2">
                        <div className="container h-[80%]">
                            <img className="object-scale-down h-full w-full" src={picture.imageUrl} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col mx-8 mt-8 justify-evenly">
                        <div className="text-center text-white italic ">
                            <h1>"{data.description}"</h1>
                        </div>
                        <div className=" text-white">
                            <div className="">

                                <h1 className="flex-none w-full h-14">Location: {data.locations ? location() : null} </h1>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <div className="w-1/2">

                                    <h1 className="flex-none w-30 text-center">Element Weaknes</h1>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Thunder:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("thunder") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Fire:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("fire") : null}
                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Water:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("water") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Ice:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("ice") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Dragon:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("dragon") : null}

                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2">

                                    <div className="flex-none w-30 text-center">Status Weaknes</div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Poison:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("poison") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Sleep:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("sleep") : null}
                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Blast:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("blast") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Paralysis:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("paralysis") : null}

                                        </div>
                                    </div>
                                    <div className="flex item-center">
                                        <div className="w-1/3">
                                            Stun:
                                        </div>
                                        <div className="flex flex-row" id="bintang">
                                            {data.weaknesses ? weakness("stun") : null}

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Link to={`/MonsterBuild/${MonsterName}/${MonsterId}/add`} className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded">Tambahkan Build</Link>
            {build.map(el => {
               return <BuildCard data={el} key={el.id} type={'MonsterBuild'} Monster={MonsterName}/>
            })}
            </div>
        </>
    )
}