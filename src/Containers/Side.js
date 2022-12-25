import { useState } from "react";
import { Input, Card, Button } from "antd";
import { Lesson } from "./Lesson";
import styled from 'styled-components';

const SideBar = styled.section`
    display: flex;
    align: right;
    flex-direction: column
`

const Side = () => {
    // const [addLesson, setaddLesson] = useState();
    const [searchLesson, setSearchLesson] = useState("");
    const {addCourse, getCourseInfo, courseInfo} = Lesson();
    const [search, setSearch] = useState(false)
    return (
        <SideBar style={{margin:'1em'}}>
            <Input.Search
                value={searchLesson}
                onChange={(e) => setSearchLesson(e.target.value)}
                enterButton="Search Course"
                placeholder="Enter a lesson ID."
                onSearch={(searchLesson) => {
                    if(!searchLesson) {
                        return;
                    }
                    getCourseInfo(searchLesson);
                    setSearch(true);
                }}
                style={{marginBottom:'1em'}}
            />
            {
                // courseInfo.map(function (course) {
                //     return (
                //         <Card title={course.CourseName} size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse(course.LId)}>Add</Button>}
                //                 bodyStyle={{backgroundColor:'#f5f5f5'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                //             <p>課號：{course.CId}</p>
                //             <p>上課時間：{course.time}</p>
                //             <p>地點：{course.Location}</p>
                //             <p>教師：{course.TeacherName}</p>
                //         </Card>
                //     )
                // })
            }
            {/* {() => {
                if (search) {
                    return (
                        courseInfo.map(function (course) {
                            return (
                                <Card title={course.name} size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse(course.LId)}>Add</Button>}
                                        bodyStyle={{backgroundColor:'#f5f5f5'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                                    <p>課號：{course.CId}</p>
                                    <p>上課時間：{course.time}</p>
                                    <p>地點：{course.Content}</p>
                                    <p>教師：{course.TeacherName}</p>
                                </Card>
                            )}))
                } else {
                    return (<></>)
                }
            }} */}
        </SideBar>
        
    )
}

export default Side;