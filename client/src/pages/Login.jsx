import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { post_login, post_login_google } from '../store/slicer/dataSlicer';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    function onChange(value) {
        console.log("Captcha value:", value);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(post_login(form))
        navigate('/')
    }

    function handleCredentialResponse(response) {
        dispatch(post_login_google(response.credential))
        // navigate('/')
    }

    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "1073277442116-tokk7948c35ktfdjd07jpplfs6np8r4f.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [])
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
                            <label className=' text-xl text-white mb-4'>Password</label>
                            <input
                                type="password"
                                className='rounded-md h-[30px] mb-8'
                                name='password'
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <ReCAPTCHA
                                sitekey="6LeOePgpAAAAANMyPKEnDEFPHBpcKs50GW7qJ6wt"
                                onChange={onChange}
                            />
                            <div className="container w mx-0 min-w-full flex flex-col items-center">
                                <button className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-12 mt-3 rounded">Login</button>
                            </div>
                            <div className='text-center text-white'>
                                Dont have an account? <Link to={'/register'}>Register</Link> here!
                            </div>
                        </form>
                        <div className='flex items-center justify-center' id="buttonDiv">
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
