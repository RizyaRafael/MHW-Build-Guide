import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post_register } from '../store/slicer/dataSlicer';
import { useDispatch } from 'react-redux';
export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: ''
    })
    const changeHandler = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(post_register(form))
        navigate('/login')
    }

    return (
        <>
            <div className='h-full w-full flex items-center justify-center'>
                <div className='container h-[500px] w-[350px] flex flex-col justify-between bg-slate-700 rounded-2xl'>
                    <div className='mx-8 my-8 h-full flex flex-col justify-evenly '>
                        <form action="" className='flex flex-col h-full' onSubmit={submitHandler}>

                            <label className=' text-xl text-white mb-4'>Email</label>
                            <input 
                            type="email" 
                            className='rounded-md h-[30px] mb-8' 
                            name='email'
                            value={form.email}
                            onChange={changeHandler}
                            />
                            <label className=' text-xl text-white mb-4'>Username</label>
                            <input 
                            type="text" 
                            className='rounded-md h-[30px] mb-8' 
                            name='username'
                            value={form.username}
                            onChange={changeHandler}
                            />
                            <label className=' text-xl text-white mb-4'>Password</label>
                            <input 
                            type="password" 
                            className='rounded-md h-[30px] mb-8' 
                            name='password'
                            value={form.password}
                            onChange={changeHandler}
                            />
                            <div className="container w mx-0 min-w-full flex flex-col items-center">
                                <button type='submit' className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded">Register</button>
                            </div>
                            <div className='text-center text-white'>
                                Do you have an account? <Link to={'/login'}>Login</Link> here!
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
