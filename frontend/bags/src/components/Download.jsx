import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"

export function Download(){
    const [data, setData] = useState(null)

    const fetchFiles = async ()=>{
        const response = await axios.get("http://localhost:4000/download")
        if(response?.data?.length){
            setData(response.data)
        }
        
    }

    
    useEffect(()=>{
        fetchFiles()
    },[])

    return(
        <div style={{height:"100%",maxWidth:"80%",display:"flex",flexDirection:"row",overflowX:"auto"}}>
            {data ? data.map((v)=>(
                <div key={v} style={{minWidth:280,height:300,textAlign:"center",wordBreak:"break-all"}}>
                    <h3>{v}</h3>
                    <Button variant="contained" href={`http://localhost:4000/download?filename=${v}`} color="success">Pobierz</Button>
                </div>
            )) : (
                <h2>Nie znaleźliśmy żadnych plików</h2>
            )}
        </div>
    )
}