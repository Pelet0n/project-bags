import { Fab, Modal,Fade,ButtonGroup,Button,FormControl } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from "react";
import axios from "axios";
import './summary.css'
import EditIcon from '@mui/icons-material/Edit';
import { Snack } from "../Snack";
import  Dashboard  from "../Dashboard/Dashboard";
import { Loader } from "../Loader/Loader";
import DeleteIcon from '@mui/icons-material/Delete';

export function Summary({teams}){
    const [open,setOpen] = useState({
        modal:false,
        snackbar:false
    })
    const [form,setForm] = useState({})

    const [question,setQuestion] = useState(`q${1}`)

    const [error,setError] = useState(null)



    const updateForm = (e)=>{
        
        return setForm(v=>({
            ...v,
            [e.target.name]: +e.target.value
        }))
    }

    const handleUpdate = async ()=>{
        let error = ""

        console.log(form)

        if(Object.keys(form).length < 1){
            error = "Zaktualizuj conajmniej jedną drużynę"
            
        }

        if(Object.values(form).some(v=>v<0)){
            error = "Wynik nie może być minusowy"
        }

        if(error === ""){

            try{
                const response = await axios({
                    method:"post",
                    url:'http://localhost:4000/update',
                    data:{
                        points: form,
                        question: question
                    }, 
                    headers: {
                        "Authorization": `bearer ${localStorage.getItem('token')}`
                    }
                })
            }
            catch(e){
                console.log(e)
            }
        }   
        
        setError(error)

        setOpen(v=>({
            ...v,
            snackbar:true
        }))

        
        
    }
    
    return(
        <>
            <div className="summContainer" style={{display:"flex",border:"1px solid black",width:"85%",justifyContent:"center"}}>
            <Dashboard />
                <Fab variant="success"  sx={{position:"absolute",top:150}} aria-label="add" onClick={()=>setOpen(v =>({
                    ...v,
                    modal:true
                }))}>
                    <AddIcon />
                </Fab>
            </div>
            
            <Modal open={open.modal} onClose={()=>setOpen(v => ({
                ...v,
                modal:false
            }))} sx={{transition:1000}}>
                <Fade in={open.modal}>
                    <div className="modalContainer">
                        <h2>Edytowanie dla zadania {question[1]}</h2>
                        <FormControl sx={{margin:5}}>
                            {teams ? teams.map(team=>(
                                <div className="form" key={team.name}>
                                    <p>{team.name}</p>
                                    
                                    <input id="my-input" name={team.name} type="number" onChange={updateForm} style={{width:70,height:20}}/>
                                </div>
                            )) : (
                                <Loader />
                            )} 
                        </FormControl>
                        <Fab sx={{marginBottom:4}} onClick={handleUpdate}>
                            <EditIcon />
                        </Fab>
                        <ButtonGroup variant="contained" sx={{width:"60%"}} fullWidth={true}>
                            <Button color={1=== +question[1] ? "error" : "info"} onClick={()=>setQuestion(`q${1}`)}>1</Button>
                            <Button color={2=== +question[1] ? "error" : "info"} onClick={()=>setQuestion(`q${2}`)}>2</Button>
                            <Button color={3=== +question[1] ? "error" : "info"} onClick={()=>setQuestion(`q${3}`)}>3</Button>
                            <Button color={4=== +question[1] ? "error" : "info"} onClick={()=>setQuestion(`q${4}`)}>4</Button> 
                        </ButtonGroup>
                    </div>
                </Fade>
                
            </Modal>

            <Snack isOpen={open.snackbar} error={error} setOpen={()=>setOpen(v=>({...v,snackbar:false}))} message="Udało się zaktualizować dane"/>
            

        </>
    )
}