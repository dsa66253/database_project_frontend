import { Lesson } from './Lesson'

const time = ["7:10-8:00", "8:10-9:00", "9:10-10:00", "10:20-11:10", "11:20-12:10", "12:20-13:10", "13:20-14:10", "14:20-15:10", "15:30-16:20", "16:30-17:20", "17:30-18:20", "18:25-19:15", "19:20-20:10", "20:15-21:05", "21:10-22:00"]
const timeID = ['0','1','2','3','4','5','6','7','8','9','10','A','B','C','D']
const column = ['0','1','2','3','4','5','6']

const SingleRow = (row) => {
    const { lessonTable } = Lesson();
    console.log()
    return (
        <tr height="45" align="left" valign="TOP" key={row}>
            <td align="center" valign="middle" >{timeID[row]}<br/>
                <font size="1">{time[row]}</font>
            </td>
            {column.map(function(column) {
                if(lessonTable[row*7 + column] !== 0) {
                    return (
                        <td key={column + row}>{lessonTable[row*7 + column]}</td>
                    )
                } else {
                    return (<td key={column + row}></td>)
                }
            })}
        </tr>
    )
}

const LessonTable = () => {
    return (
        <table align='center' width='80%' border='1' cellPadding='3' cellSpacing='0' >
            <tbody>
                <tr align='center'>
                    <td width='12%'></td>
                    <td width='12%'>一</td>
                    <td width='12%'>二</td>
                    <td width='12%'>三</td>
                    <td width='12%'>四</td>
                    <td width='12%'>五</td>
                    <td width='12%'>六</td>
                    <td width='12%'>日</td>
                </tr>
                {
                    timeID.map(function(row, index) {
                        return SingleRow(index)
                    })
                }
            </tbody>
        </table>
      );
}

export default LessonTable;


// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Tab } from '@material-ui/core';

// <TableContainer component={Paper}>
        //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //     <TableHead>
        //       <TableRow>
        //         <TableCell>Time</TableCell>
        //         <TableCell align="right">7:10-8:00</TableCell>
        //         <TableCell align="right">8:10-9:00</TableCell>
        //         <TableCell align="right">9:10-10:00</TableCell>
        //         <TableCell align="right">10:20-11:00</TableCell>
        //         <TableCell align="right">11:20-12:10</TableCell>
        //         <TableCell align="right">11:20-12:10</TableCell>
        //         <TableCell align="right">12:20-13:10</TableCell>
        //         <TableCell align="right">13:20-14:10</TableCell>
        //         <TableCell align="right">14:20-15:10</TableCell>
        //         <TableCell align="right">15:30-16:20</TableCell>
        //         <TableCell align="right">16:30-17:20</TableCell>
        //         <TableCell align="right">17:30-18:20</TableCell>
        //         <TableCell align="right">18:25-19:15</TableCell>
        //         <TableCell align="right">19:20-20:10</TableCell>
        //         <TableCell align="right">20:15:21:05</TableCell>
        //         <TableCell align="right">20:15:21:05</TableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {rows.map((row) => (
        //         <TableRow
        //           key={row.name}
        //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //         >
        //           <TableCell component="th" scope="row">
        //             {row.name}
        //           </TableCell>
        //           <TableCell align="right">{row.calories}</TableCell>
        //           <TableCell align="right">{row.fat}</TableCell>
        //           <TableCell align="right">{row.carbs}</TableCell>
        //           <TableCell align="right">{row.protein}</TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>