import { useState } from "react";
import { Input, Card, Button } from "antd";
import { Profile } from "../Hooks/useProfile"
import styled from 'styled-components';
import getCourseInfo from "../Api/course";
import { addCourseByUser } from "../Api/courseByUser";

const SideBar = styled.section`
    display: flex;
    align: right;
    flex-direction: column;
    
`
const Side = () => {
    const [searchLesson, setSearchLesson] = useState("");
    const [courseInfo, setCourseInfo] = useState([]);
    const {stuID, setSchedule} = Profile();
    const [search, setSearch] = useState(false)

    const searchCourse = async (cid) => {
        const course = await getCourseInfo(cid);
        let tmp = [...course]
        console.log("tmp", tmp)
        setCourseInfo(tmp);
        setSearch(true);
    }

    const addCourse = async () => {
        const add = await addCourseByUser(stuID, courseInfo[0].CId);
        console.log(add)
        if (add) {
            setSchedule([...courseInfo]);
        }
    }
    return (
        // <>{()=>{return (<>heloo</>)}}</>
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
                    searchCourse(searchLesson);
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
            {(() => {
                console.log(courseInfo);
                if (search) {
                    return (
                        <Card title={courseInfo[0].CourseName} size='default' extra={<Button style={{color:'#0050b3'}} onClick={addCourse}>Add</Button>}
                                bodyStyle={{backgroundColor:'#f5f5f5'}} headStyle={{backgroundColor:'#40a9ff', color:'white'}}>
                            <p>課號：{courseInfo[0].CId}</p>
                            <p>上課時間：{courseInfo.map(function(item) {
                                    return item.Day + item.Time;
                                })}</p>
                            <p>地點：{courseInfo[0].Location}</p>
                            <p>教師：{courseInfo[0].TeacherName}</p>
                        </Card>
                    )
                } else {
                    return (<></>)
                }
            })()}
            {/* {()=>{return <p>helo11</p>}} */}
        </SideBar>
        
    )
}

export default Side;