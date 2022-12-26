import { Lesson } from './Lesson'
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteCourse } from '../Api/courseByUser';
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

const SingleRow = (time) => {
    const { lessonTable } = Lesson();
    const row = time.id;
    return (
        <tr height="45" align="left" valign="TOP" key={row}>
            <td align="center" valign="middle" >{row}<br/>
                <font size="1">{time.time}</font>
            </td>
            {column.map(function(column) {
                if(lessonTable[row*7 + column] !== undefined) {
                    return (
                        <div>
                            <td key={column + row + 'name'}>{lessonTable[row*7 + column].name}</td>\
                            <td key={column + row + 'location'}>{lessonTable[row*7 + column].location}</td>
                            <DeleteIcon onClick={deleteCourse(lessonTable[row*7 + column].CId)}><DeleteOutlined /></DeleteIcon>
                        </div>
                    )
                } else {
                    return (<td key={column + row}>
                        <h1 align="center">dkdkdkdkdk</h1>
                        <h1 align="center">dkdkdkdkdk</h1>
                        <DeleteIcon><DeleteOutlined /></DeleteIcon>
                    </td>)
                }
            })}
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
                            <td align='center' width='12%' style={{backgroundColor: '#D2E9FF', borderRadius: '10px'}}>一</td>
                            <td align='center' width='12%'>二</td>
                            <td align='center' width='12%'>三</td>
                            <td align='center' width='12%'>四</td>
                            <td align='center' width='12%'>五</td>
                            <td align='center' width='12%'>六</td>
                            <td align='center' width='12%'>日</td>
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