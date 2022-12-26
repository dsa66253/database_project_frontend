import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteCourseByUser } from '../Api/courseByUser';
import { Profile } from '../Hooks/useProfile';
// import Icon from '@ant-design/icons/lib/components/Icon';

const DeleteIcon = styled.section`
    display: flex;
    position: relative;
    left: 85%
    // top: 85%
`
const TableWrapper = styled.section`
    align: center;
`

const timeTable = [{time: "7:10-8:00", id: '0'}, {time: "8:10-9:00", id: '1'},
                   {time: "9:10-10:00", id: '2'}, {time: "10:20-11:10", id: '3'},
                   {time: "11:20-12:10", id: '4'}, {time: "12:20-13:10", id: '5'},
                   {time: "13:20-14:10", id: '6'}, {time: "14:20-15:10", id: '7'},
                   {time: "15:30-16:20", id: '8'}, {time: "16:30-17:20", id: '9'},
                   {time: "17:30-18:20", id: '10'}, {time: "18:25-19:15", id: 'A'},
                   {time: "19:20-20:10", id: 'B'}, {time: "20:15-21:05", id: 'C'},
                   {time: "21:10-22:00", id: 'D'}]
const column = ['0','1','2','3','4','5','6']

const Ta = (row) => {
    const { stuID, lessonTable, setSchedule  } = Profile();

    const deleteCourse= async(stuID, cid) => {
        const del = await deleteCourseByUser(stuID, cid);
        if(del) {
            setSchedule((prev) => {
                prev = prev.filter(function(item)  {
                    return item.CId !== cid;
                })
            })
        }
    }
    return(
        column.map(function(index) {
            console.log(lessonTable[row*7 + index])
        if(lessonTable[row*7 + index] !== undefined) {
            console.log(row , index)
            return (
                <td key={index + row} style={{backgroundColor: '#FFFFCE', borderRadius: '10px'}}>
                    <h1 key={index + row + 'name'}>{lessonTable[row*7 + index].name}</h1>
                    <h1 key={index + row + 'location'}>{lessonTable[row*7 + index].location}</h1>
                    <DeleteIcon onClick={deleteCourse(stuID, lessonTable[row*7 + index].CId)}><DeleteOutlined /></DeleteIcon>
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
            <Ta row={row}/>
        </tr>
    )
}

const LessonTable = () => {
    return (
            <TableWrapper>
                <table cellPadding='3' cellSpacing='0' >
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