import { useState } from "react";
import { Input, Card, Button, message, Popover } from "antd";
import { Profile } from "../Hooks/useProfile"
import styled from 'styled-components';
import getCourseInfo from "../Api/course";
import { addCourseByUser } from "../Api/courseByUser";
import { getSchedule } from "../Api/courseByUser";


const SideBar = styled.section`
    display: flex;
    // align: right;
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
        messageApi.open({type, content, duration})
    }


    const searchCourse = async (cid) => {
        const course = await getCourseInfo(cid, language);
        if(course.length===0){
            showMessage("error", "Not found course")
            setSearch(false);
        }else{
            setCourseInfo(course);
            setSearch(true);
        }
    }

    const addCourse = async () => {
        const addSuccess = await addCourseByUser(stuID, courseInfo[0].CId);
        console.log("addSuccess", addSuccess)
        if (addSuccess) {
            const tmp = await getSchedule(stuID, language);
            setSchedule(tmp);
            showMessage("success", "successfully add the course")
        }else{
            showMessage("error", "fail to add the course")
        }
    }
    let content = <div >
        <h3>INSTRUCTIONS</h3>
        <p>You can add courses of NTU EE and IM department in 111-1.</p>
        <p>(eg. 11173, 30966, 20775)</p>
        <p>For more course info, you can refer to official NTU course search website.</p>
    </div>
    return (
        <SideBar>
            {contextHolder}
            <Popover content={content}>
            <Input.Search
                style={{padding:"5px"}}
                value={searchLesson}
                onChange={(e) => setSearchLesson(e.target.value)}
                enterButton="Search Course"
                placeholder={"hover me"}
                onSearch={(searchLesson) => {
                    if(!searchLesson) {
                        return;
                    }
                    searchCourse(searchLesson);
                }}
            />
            </Popover>

            
            {
                search?
                (<Card title={courseInfo[0].CourseName} size='default' extra={<Button style={{color:'#40a9ff'}} onClick={addCourse}>Add</Button>}
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