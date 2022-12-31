import { useState } from "react";
import { Input, Card, Button, message } from "antd";
import { Profile } from "../Hooks/useProfile"
import styled from 'styled-components';
import getCourseInfo from "../Api/course";
import { addCourseByUser } from "../Api/courseByUser";
import { getSchedule } from "../Api/courseByUser";


const SideBar = styled.section`
    display: flex;
    align: right;
    flex-direction: column;
    
`
const Side = () => {
    const {language} = Profile();
    const [searchLesson, setSearchLesson] = useState("");
    const [courseInfo, setCourseInfo] = useState([]);
    const {stuID, setSchedule} = Profile();
    const [search, setSearch] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type, content, duration=1.5)=>{
        // console.log(type, content, duration)
        messageApi.open({type, content, duration})
    }


    const searchCourse = async (cid) => {
        const course = await getCourseInfo(cid, language);
        if(course.length===0){
            showMessage("error", "Not found course")
        }else{
            setCourseInfo(course);
            setSearch(true);
        }

    }

    const addCourse = async () => {
        const add = await addCourseByUser(stuID, courseInfo[0].CId);
        if (add.length===0) {
            const tmp = await getSchedule(stuID, language);
            const sch = [...tmp];
            console.log(sch);
            setSchedule(sch);
        }else{
            console.log("not found course")
        }
    }
    return (
        <SideBar style={{backgroundColor:'#f5f5f5'}}>
            {contextHolder}
            <Input.Search
                value={searchLesson}
                onChange={(e) => setSearchLesson(e.target.value)}
                enterButton="Search Course"
                placeholder="Enter a lesson ID."
                onSearch={(searchLesson) => {
                    if(!searchLesson) {
                        return;
                    }
                    searchCourse(searchLesson);
                }}
                style={{marginBottom:'1em'}}
            />
            
            {
                search?
                (<Card title={courseInfo[0].CourseName} size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse}>Add</Button>}
                        bodyStyle={{backgroundColor:'#eeeeee'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                    <p>課號：{courseInfo[0].CId}</p>
                    <p>上課時間：{courseInfo.map(function(item) {
                            return item.Day + item.Time;
                        })}</p>
                    <p>地點：{courseInfo[0].Location}</p>
                    <p>教師：{courseInfo[0].TeacherName}</p>
                </Card>):
                <></>
            }

        </SideBar>
        
    )
}

export default Side;