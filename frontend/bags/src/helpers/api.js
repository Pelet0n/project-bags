import axios from "axios";

export async function api(url,method,data={},additionals={}){
    try{
        const response = await axios({
            method:method,
            url: url,
            data: data,
            ...additionals
        })

        return response.data
    }

    catch(e){
        console.log(e)
    }
}