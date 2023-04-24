import { useEffect, useState,useRef } from 'react'
import { Button } from '@mui/material'
import {FormControl, TextField} from '@mui/material'
import axios from 'axios'
import { Snack } from '../Snack'
import '../Form/form.css'

export function Createform(){
    const [credentials,setCredentials] = useState({
        login:"",
        password:""
    })
    const [error,setError] = useState(null)
    const [open,setOpen] = useState(false)


    const initialRender = useRef(true)

    function setForm(e){

        setCredentials((v)=>({...v,
            [e.target.name]:  e.target.value
        }))
    }

    async function onSubmit(){
        setError(null)
        try{
            const response = await axios.post('http://localhost:4000/createuser',{
                login:credentials.login,
                password:credentials.password
            },{
                headers:{
                    Authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
            if(response?.data?.error){
                return setError(response.data.error)
            }

            setOpen(true)
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        if(initialRender.current){
            initialRender.current = false
        }
        else{
            setOpen(true)
        }
    },[error])

    return(
        <>
        <div className='login-form'>
            <h2>Dodaj nowego użytkownika</h2>
            <FormControl sx={{display:"flex",gap:5,alignItems:"center"}}>
                <TextField  name="login" onChange={setForm} variant='outlined' label="Login"/>
                <TextField  name="password" onChange={setForm} variant='outlined' label="Hasło"/>

                <Button variant='contained' onClick={onSubmit}>Utwórz użytkownika</Button>
            </FormControl>
            
        </div>
        <Snack error={error} isOpen={open} setOpen={()=>setOpen(false)} message='Prawidłowo utworzono użytkownika' />
        </>
    )
}