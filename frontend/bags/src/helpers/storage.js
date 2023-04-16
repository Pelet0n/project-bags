import jwt from 'jwt-decode'

const setToken = (token)=>{

    localStorage.setItem('token',token)
}

const getToken = ()=>{
    const token = localStorage.getItem('token')
    // if(Date.now() >= token?.exp * 1000){
    //     removeToken()
    //     return false
    // }

    return token
}

const removeToken = ()=>{
    localStorage.removeItem('token')
}

export {setToken,getToken,removeToken}