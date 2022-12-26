import { useState } from "react";
import { Input, Card, Button } from "antd";
import { Lesson } from "./Lesson";
import styled from 'styled-components';
import { func } from "prop-types";
import getCourseInfo from "../Api/course";

const SideBar = styled.section`
    display: flex;
    align: right;
    flex-direction: column;
    
`

const Side = () => {
    // const [addLesson, setaddLesson] = useState();
    const [searchLesson, setSearchLesson] = useState("");
    const {addCourse, courseInfo} = Lesson();
    const [search, setSearch] = useState(false)
    return (
        <SideBar style={{margin:'1em', backgroundColor: 'white'}}>
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
            {/* <Card title="資料庫" size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse()}>Add</Button>}
                    bodyStyle={{backgroundColor:'#f5f5f5'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                <p>課號：12345</p>
                <p>上課時間：123</p>
                <p>地點：管111</p>
                <p>教師：李瑞庭</p>
            </Card> */}
            {() => {
                if (search) {
                    return (
                        <Card title={courseInfo[0].CourseName} size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse(courseInfo[0].CId)}>Add</Button>}
                                bodyStyle={{backgroundColor:'#f5f5f5'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                            <p>課號：{courseInfo[0].CId}</p>
                            <p>上課時間：{courseInfo[0].Day},
                                {courseInfo.map(function(item) {
                                    return item.Time;
                                })}</p>
                            <p>地點：{courseInfo[0].Location}</p>
                            <p>教師：{courseInfo[0].TeacherName}</p>
                        </Card>
                    )
                } else {
                    return (<></>)
                }
            }}
        </SideBar>
        
    )
}

export default Side;