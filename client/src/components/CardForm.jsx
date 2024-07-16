import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { all_armors, get_all_armors, get_all_weapons, get_armors_chest, get_armors_gloves, get_armors_head, get_armors_legs, get_armors_waist, post_add_build } from '../store/slicer/dataSlicer';
import { useParams } from 'react-router';
import Swal from 'sweetalert2'

const CardForm = () => {
    const dispatch = useDispatch()
    const { MonsterId, MonsterName } = useParams()
    const [form, setForm] = useState({
        head: {},
        chest: {},
        legs: {},
        waist: {},
        gloves: {},
        weapon: {},
        MonsterName: MonsterName
    })
    const allArmors = useSelector((state) => state.items.all_armors)
    const head = useSelector((state) => state.items.armor_head)
    const chest = useSelector((state) => state.items.armor_chest)
    const legs = useSelector((state) => state.items.armor_legs)
    const waist = useSelector((state) => state.items.armor_waist)
    const gloves = useSelector((state) => state.items.armor_gloves)
    const weapon = useSelector((state) => state.items.all_weapon)
    const message = useSelector((state) => state.items.gpt_rating)
    console.log(message, 'ini message');
    const changeHandler = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(post_add_build(form))
        // navigate(`/MonsterBuild/${MonsterName}/${MonsterId}`)
    }


    useEffect(() => {
        if (allArmors.length === 0) {
            dispatch(get_all_armors())
        }
    }, [])
    useEffect(() => {
        if (allArmors.length > 1676) {
            dispatch(get_armors_head(allArmors))
            dispatch(get_armors_chest(allArmors))
            dispatch(get_armors_legs(allArmors))
            dispatch(get_armors_waist(allArmors))
            dispatch(get_armors_gloves(allArmors))
            dispatch(get_all_weapons())
        }
    }, [allArmors.length])
    useEffect(() => {
        if (message) {
            Swal.fire(`${message.result}`);
        }
    }, [message])
    return (
        <>
            <div className='h-full w-full flex items-center justify-center'>
                <div className='container h-[500px] w-[350px] flex flex-col justify-between bg-slate-700 rounded-2xl'>
                    <div className='mx-8 my-8 h-full flex flex-col justify-evenly '>
                        <form action="" className='flex flex-col h-full ' onSubmit={submitHandler}>

                            <label className=' text-xl text-white mb-1'>Head Armor</label>
                            <select name="head" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select Head Armor--</option>
                                {head.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <label className=' text-xl text-white mb-1 mt-2'>Chest Armor</label>
                            <select name="chest" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select chest Armor--</option>
                                {chest.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <label className=' text-xl text-white mb-1 mt-2'>Legs Armor</label>
                            <select name="legs" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select legs Armor--</option>
                                {legs.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <label className=' text-xl text-white mb-1 mt-2'>Waist Armor</label>
                            <select name="waist" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select waist Armor--</option>
                                {waist.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <label className=' text-xl text-white mb-1 mt-2'>Gloves Armor</label>
                            <select name="gloves" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select gloves Armor--</option>
                                {gloves.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <label className=' text-xl text-white mb-1 mt-2'>Weapon</label>
                            <select name="weapon" className='appearance-none row-start-1 col-start-1 text-black' onChange={changeHandler}>
                                <option value=''>--Select weapon--</option>
                                {weapon.map(el => {
                                    return <option value={el.id}>{el.name}</option>
                                })}
                            </select>
                            <div className="container w mx-0 min-w-full flex flex-col items-center">
                                <button type='submit' className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded">Submit</button>
                            </div>
                        </form>
                        <div className='flex items-center justify-center' id="buttonDiv">
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CardForm;
