import './table.css'
import { TableContainer,Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function Tabela({values}){
    return(
        <div style={{width:"100%"}}>
            {/* <table>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                        <th>Q4</th>
                        <th>Suma</th>
                    </tr>
                </thead>
               <tbody>
                {values?.map(v=>(
                        <tr key={v._id}>
                            <td>{v.name}</td>
                            <td>{v.q1}</td>
                            <td>{v.q2}</td>
                            <td>{v.q3}</td>
                            <td>{v.q4}</td>
                            <td>{v.sum}</td>
                        </tr>
                    ))}
               </tbody>
                
            </table> */}

            <TableContainer >
                <Table stickyHeader={true} sx={{padding:10,maxWidth:"100%",height:500,'td,th':{fontSize:16}}}>
                    <TableHead>
                        <TableRow  selected={true} sx={{'td,th':{fontWeight:800}}}>
                            <TableCell  align='justify'>Nazwa</TableCell>
                            <TableCell align='justify'>Q1</TableCell>
                            <TableCell align='justify'>Q2</TableCell>
                            <TableCell align='justify'>Q3</TableCell>
                            <TableCell align='justify'>Q4</TableCell>
                            <TableCell align='justify'>Suma</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values?.map((v)=>(
                            <TableRow key={v._id} sx={{'td,th':{borderBottom:1}}}>
                                <TableCell component='th' align='justify'>{v.name}</TableCell>
                                <TableCell align='justify'>{v.q1}</TableCell>
                                <TableCell align='justify'>{v.q2}</TableCell>
                                <TableCell align='justify'>{v.q3}</TableCell>
                                <TableCell align='justify'>{v.q4}</TableCell>
                                <TableCell align='justify'>{v.sum}</TableCell>
                            </TableRow>
                        ))
                            
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}