import axios from "axios"
import { useEffect, useState } from "react"
import {Outlet} from 'react-router-dom'
import {FormControl,Input,Button} from '@mui/material'
import "./files.css"

export function File(){
    const [file,setFile] = useState(null)
    const [disable,setDisable] = useState(localStorage.getItem('send'))
    
    async function handleSend(){
        const formData = new FormData()
        formData.append('file',file)
        try{
           
            const response = await axios({
                method:"post",
                url:"http://localhost:4000/testpost",
                data:formData,
                headers: { "Content-Type": "multipart/form-data" }
            })
            
            if(response.ok){
                setDisable(true)
                localStorage.setItem('send',true)
                console.log(disable)
                
            }
        }
        catch(e){
            console.log(e)
        }
        
       

    }

    

    localStorage.removeItem('send')

    return(
        <>
            
            <div className="filesContainer">
            <h1>Tutaj możesz wysłać swój plik</h1>
                <FormControl sx={{width:"75%"}}>
                    <Input type='file' accept=".zip,.rar,.7zip" onChange={(e)=>setFile(e.target.files[0])}/>
                    <Button variant="outlined" onClick={handleSend}  disabled={disable}>Wyślij plik</Button>
                </FormControl>
                {/* Wpisz swoją nazwę<input type="text" onChange={e => setName(e.target.value)}/><br />
                <input type="file" accept=".zip,.rar,.7zip" onChange={(e)=>setFile(e.target.files[0])}  />
                <input type="button" disabled={!file} value="Wyślij plik" onClick={handleSend} /> */}
            </div>
        </>
    )
}