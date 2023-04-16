import { useEffect, useState } from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import { File } from './components/Files';
import { Error } from './components/Error';
import { getToken } from './helpers/storage';
import { Download } from './components/Download';
import { Summary } from './components/Summary';
import axios from 'axios';

function App() {
  const [teams,setTeams] = useState(null)

  async function fetchTeams(){
    try{
      const response = await axios.get('http://localhost:4000/teams')

      return setTeams(response.data)
    }
    catch(e){
      console.error(e)
    }
  }

  useEffect(()=>{fetchTeams()},[])


  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='admin' element={<Admin />}>
            <Route path='dashboard' element={<Summary teams={teams}/>}/>
            <Route path='files' element={<Download />}/>
        </Route>
        <Route path='send' element={<File />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
