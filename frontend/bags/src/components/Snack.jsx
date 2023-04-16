import {Snackbar,Alert } from "@mui/material"

export function Snack({error,isOpen,setOpen,message=""}){
    return(
        <>
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={setOpen}>
            <Alert severity={error ? "error" : "success"} variant="filled">
                {error || message}
            </Alert>
        </Snackbar>
        </>
        
    )
}