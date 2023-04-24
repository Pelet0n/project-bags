import { useEffect, useState } from 'react';
import './dashboard.css';
import {Fab} from '@mui/material'
import {AddAlert} from '@mui/icons-material'
import axios from 'axios'
import Tabela from '../Table/Table';
import { removeToken, setToken } from '../../helpers/storage';
import { Loader } from '../Loader/Loader';

function Dashboard() {
  const [teams,setTeams] = useState({
    data: [],
    isLoading: true
  })

  async function fetchTeams(){
    try{
      const response = await axios.get('http://localhost:4000/teams')

      return setTeams({
        data: response.data,
        isLoading: false
      })
    }
    catch(e){
      console.error(e)
    }
     
  } 

  

  useEffect(()=>{
    fetchTeams()
    setInterval(()=>{fetchTeams()},5000)
  },[])



  return (
    <div className='containerDash'>
      {teams.isLoading ? (
        <Loader />
      ) : (
        <Tabela values={teams.data}></Tabela>
      )}
    </div>

  );
}

export default Dashboard;
