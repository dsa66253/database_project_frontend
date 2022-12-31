import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteCourseByUser } from '../Api/courseByUser';
import { Profile } from '../Hooks/useProfile';
import { useEffect } from 'react';
import { getSchedule } from '../Api/courseByUser';

const DeleteIcon = styled.button`
    cursor:pointer;
    border:none;
    background-color:rgba(0, 0, 0, 0);
`
const TableWrapper = styled.section`
    align: center;
`

const timeTable = [{time: "7:10-8:00", id: '0', index: 0}, {time: "8:10-9:00", id: '1', index: 1},
                   {time: "9:10-10:00", id: '2', index: 2}, {time: "10:20-11:10", id: '3', index: 3},
                   {time: "11:20-12:10", id: '4', index: 4}, {time: "12:20-13:10", id: '5', index: 5},
                   {time: "13:20-14:10", id: '6', index: 6}, {time: "14:20-15:10", id: '7', index: 7},
                   {time: "15:30-16:20", id: '8', index: 8}, {time: "16:30-17:20", id: '9', index: 9},
                   {time: "17:30-18:20", id: '10', index: 10}, {time: "18:25-19:15", id: 'A', index: 11},
                   {time: "19:20-20:10", id: 'B', index: 12}, {time: "20:15-21:05", id: 'C', index: 13},
                   {time: "21:10-22:00", id: 'D', index: 14}]
const column = [0,1,2,3,4,5,6]

const Ta = (cnt) => {
    const { stuID, lessonTable, setSchedule, language } = Profile();
    const querystring = "https://www.google.com/maps/search/?api=1&query="
    const row = cnt.row
    const deleteCourse = async(e) => {
        console.log(e.currentTarget.value);
        const cid = e.currentTarget.value;
        console.log("stu", stuID);
        console.log("cid", cid);
        const del = await deleteCourseByUser(stuID, cid);
        if(del) {
            const tmp = await getSchedule(stuID, language);
            const sch = [...tmp];
            console.log(sch);
            setSchedule(sch);
        }
    }
    // console.log("row", row)
    return(
        column.map(function(index) {
            var num = row*7 + index;
            if(lessonTable[num] !== undefined) {
                return (
                    <td key={index + row} style={{backgroundColor: '#FFFFCE', borderRadius: '10px'}}>
                        <h4 style={{margin:"0", textAlign:"center"}} key={index + row + 'name'} 
                            >{lessonTable[num].name}</h4>
                        <a key={index + row + 'location'}href={querystring + lessonTable[num].google} 
                            target="_blank" rel="noreferrer" style={{margin:"0", textAlign:"center", display:"block"}}>{lessonTable[num].location}</a>
                        <DeleteIcon style={{margin:"auto", display:"block"}} value={lessonTable[num].id} onClick={deleteCourse}><DeleteOutlined /></DeleteIcon>
                    </td>
                )
            } else {
                return (<td key={index + row} style={{backgroundColor: '#FFFFCE', borderRadius: '10px'}}>
                </td>)
            }
    }))
}

const SingleRow = (time) => {
    const row = time.id;
    return (
        <tr height="45" align="left" valign="TOP" key={row}>
            <td align="center" valign="middle" style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>{row}<br/>
                <font size="1">{time.time}</font>
            </td>
            <Ta row={time.index}/>
        </tr>
    )
}

const LessonTable = () => {
    const { stuID, lessonTable, setSchedule, language } = Profile();
    useEffect(()=>{
        //info Don't use asycn function as parameter for useEffect.
        //info Instead, write a async function and call it in the function body passed to useEffect
        const tmp = async () => {
            let sch = await getSchedule(stuID, language)
            setSchedule(sch);
        }
        tmp()
    }, []) // call it at first time redner
    return (
            <TableWrapper>
                <table cellPadding='3' cellSpacing='2' >
                    <tbody>
                        <tr>
                            <td align='center' width='8%' ></td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>一</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>二</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>三</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>四</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>五</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>六</td>
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '15px'}}>日</td>
                        </tr>
                    {
                        timeTable.map(function(time) {
                            return SingleRow(time)
                        })
                    }
                    </tbody>
                </table>
            </TableWrapper>
    );
}

export default LessonTable;