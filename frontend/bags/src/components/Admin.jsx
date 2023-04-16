import { useEffect, useState } from "react"
import Form from './Form'
import axios from "axios"
import {getToken, removeToken, setToken} from "../helpers/storage"
import {File} from './Files'
import {Fab} from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom'
import "./admin.css"
import { Snack } from "./Snack"

const defaults = {
    login: "",
    password: ""
}

export default function Admin(){
    const navigate = useNavigate()

    const [open,setOpen] = useState(false)
    const [error,setError] = useState('')

    const [credentials,setCredentials] = useState(defaults)

    const [isAuth,setisAuth] = useState(getToken())
    
    async function handleSubmit(e){
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:4000/login',{
            login: credentials.login,
            password: credentials.password
        })

        if(!response?.data?.token){
            setError(response.data.message)
            return setOpen(true)
        }
        setToken(response?.data?.token)
        setisAuth(true)
        setCredentials(defaults)
        }
        catch(e){
            console.log(e)
        }
    }

    const handleLogout = ()=>{
        removeToken()
        setisAuth(false)
        //navigate('/')
    }


    return(
        <>
        {isAuth ? (
            <>
            <div className="container">
                <div className="leftCont">
                    <div className="header" style={{backgroundColor:"#2B3C48"}}>
                        <h1>Mój zapis</h1>
                    </div>
                    <div className="content">
                        <a href="/admin/files">
                            <DriveFileMoveIcon />Files
                        </a>
                    </div>
                    <div className="content">
                        <a href="/admin/dashboard">
                            <DashboardIcon />Dashboard
                        </a>
                    </div>

                    
                    <div className="content">
                        <a href="/admin/dashboard"><p>New users</p></a>
                    </div>
                   
                    <div className="content">
                        <Fab onClick={handleLogout}>
                            <PowerSettingsNewIcon />
                        </Fab>
                    </div>

                </div>

                
                <Outlet />
                
            </div>
            </>
        ) : (

            <Form setCredentials={setCredentials} onSubmit={handleSubmit}></Form>
        )}
        <Snack error={error} isOpen={open} setOpen={()=>setOpen(false)} message="blahbla"/>
        </>
    )
}