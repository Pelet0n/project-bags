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
            
            console.log(response.statusText)

            if(response.statusText==="OK"){
                setDisable(true)
                localStorage.setItem('send',true)

                
            }
        }
        catch(e){
            console.error(e)
        }
        
       

    }

    return(
        <>
            
            <div className="filesContainer">
            <h1>Tutaj możesz wysłać swój plik</h1>
                <FormControl sx={{width:"75%"}}>
                    <Input type='file' accept=".zip,.rar,.7zip" onChange={(e)=>setFile(e.target.files[0])}/>
                    <Button variant="outlined" onClick={handleSend} disabled={!file || disable}>Wyślij plik</Button>
                </FormControl>
                <p>Pamiętaj plik możesz wysłać tylko raz!</p>
            </div>
        </>
    )
}