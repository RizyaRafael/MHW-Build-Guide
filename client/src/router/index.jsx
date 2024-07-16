import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout";
import MonsterBuild from "../pages/MonsterBuild";
import Armors from "../pages/Armors";
import MonsterList from "../pages/MonsterList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CardForm from "../components/CardForm";
import YourBuild from "../pages/YourBuild";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <MonsterList/>
            },
            {
                path: '/MonsterBuild/:MonsterName/:MonsterId',
                element: <MonsterBuild/>
            },
            {
                path: '/MonsterBuild/:MonsterName/:MonsterId/add',
                element: <CardForm/>
            },
            {
                path: '/armors',
                element: <Armors/>
            },
            {
                path: '/MonsterList',
                element: <MonsterList/>
            },
            {
                path: '/YourBuild',
                element: <YourBuild/>,
            },
            {
                path: '/login',
                element: <Login/>,
                loader() {
                    if (localStorage.access_token) {
                        return redirect('/')
                    } else {
                        return null
                    }
                }
            },
            {
                path: '/register',
                element: <Register/>,
                loader() {
                    if (localStorage.access_token) {
                        return redirect('/')
                    } else {
                        return null
                    }
                }
            }
       ]
    }
    
])

export default router