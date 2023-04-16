import { useState } from 'react'
import './form.css'
import { Button } from '@mui/material'
import {FormControl, TextField} from '@mui/material'


export default function Form({setCredentials, onSubmit}){
    

    function setForm(e){

        setCredentials((v)=>({...v,
            [e.target.name]:  e.target.value
        }))
    }


    return(
        <>
            <div className="login-form">
                    {/* <div className="input-form">
                        <p>Podaj login</p>
                        <input type="text" name="login" placeholder="Login" onChange={setForm}/>
                    </div>
                    <div className="input-form">
                        <p>Podaj hasło</p>
                        <input type="password" name="password" placeholder="Password" onChange={setForm}/>
                    </div> */}
                    <h1>Logowanie do zarządzania systemem</h1>
                    <FormControl sx={{display:"flex",gap:5,alignItems:"center"}}>
                        <TextField  name="login" onChange={setForm} variant='outlined' label="Login"/>
                        <TextField  name="password" onChange={setForm} variant='outlined' label="Hasło"/>

                        <Button variant='contained' onClick={onSubmit}>Zaloguj się</Button>
                    </FormControl>

                    
                    
            </div>
            
        </>
        

    )
}