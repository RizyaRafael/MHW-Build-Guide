import { useEffect } from 'react';
import {Link} from 'react-router-dom'
export default function Card({data, type, MonsterId, armorId}) {
    function converter() {
        let name
        let image
        let link
        if (type === "monster_list") {
            name = data.name
            image = data.imageUrl
            link = `/MonsterBuild/${name}/${MonsterId}`
        } else if (type === "armors") {
            if (data?.assets?.imageMale && data?.name) {
                name = data.name
                image = data.assets.imageMale
                MonsterId = 0
            link = `/armors/${armorId}}`

            } 
        }
        return {name, image, link}
    }
    if (!data?.assets?.imageMale && type === "armors") {
        return <></>
    }
    return (
        <>
            
            <Link to={converter().link} className="container h-[29rem] w-full " >
                <div className="border-4 border-indigo-500/100 rounded-3xl py-3 px-3 h-full">
                    <div className="container h-[80%]">
                        <img className="object-scale-down h-full w-full" src={converter().image} />
                    </div>
                    <div className="container h-[20%] flex justify-center align-middle text-white font-medium text-xl">
                        <h1>{converter().name}</h1>
                    </div>
                </div>
            </Link>
        </>
    )
}