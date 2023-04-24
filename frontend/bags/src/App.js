import { useEffect, useState } from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import { File } from './components/Files/Files';
import { Error } from './components/Error';
import { Download } from './components/Download/Download';
import { Summary } from './components/Summary/Summary';
import { Createform } from './components/CreateForm/Createform';
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
            <Route path='create' element={<Createform />}/>
        </Route>
        <Route path='send' element={<File />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
