import { async } from "q";
import {createContext, useContext, useState, useEffect} from "react"
import instance from '../api';
import {course} from '../db/db'

const lessonContext = createContext({
    lessonTable: [],
    getSchedule: () => {},
    addCourse: () => {},
    DeleteCourse: () => {},
    getCourseInfo: () => {},
    courseInfo: {},
    setStuID: () => {},
    stuID: "",
    logIn: false,
    setLogIn: () => {},
})

const LessonProvider = (props) => {
    const [schedule, setSchedule] = useState([course]);
    const [lessonTable, setLessonTable] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const [stuID, setStuID] = useState("");
    const [logIn, setLogIn] = useState(false);

    setCourseInfo([
    {
        CId: "13088",
        Content: "C.S.I.E. BLDG. ROOM NO.104",
        Day: "一",
        Time: "3",
        LId: 274,
        GoogleName: "台大德田館"
    }])
    console.log(schedule);
    const getSchedule = async (stuID) => {
        const {
            data: { messages, data },
        } = await instance.get('/courseByUser', {
            body: {
                SId: stuID, 
            },
        });
        if(messages) {
            setSchedule(data);
        }
    }
    const addCourse = async () => {
        const {
            data: { messages, data },
        } = await instance.post('/courseByUser',{
            body: {
                SId: stuID,
                CId: courseInfo.CId,
            }
        });
        if(messages) {
            setSchedule([...courseInfo]);
        }
    }
    const getCourseInfo = async (courseID) => {
        const {
            data: { messages, data },
        } = await instance.get('/course',{
            body: {
                CId: courseID,
            }
        });
        if(messages) {
            setCourseInfo(data);
        }
    }
    
    const DeleteCourse = async(cid) => {
        const {
            data: { messages, data },
        } = await instance.delete('/courseByUser',{
            body: {
                SId: stuID,
                CId: cid,
            }
        });
        setSchedule((prev) => {
            prev = prev.filter(function(course) {
                return course.CId !== cid;
            })
        })
    }
    const printLessonTable = () => {
        var newTable = new Array(15*7);
        for(var i = 0; i < schedule.length(); i++) {
            var time = schedule[i].Time;
            switch (schedule[i].Day) {
                case "一":
                    newTable[time*7] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId}
                    break;
                case "二":
                    newTable[time*7+1] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                case "三":
                    newTable[time*7+2] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                case "四":
                    newTable[time*7+3] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                case "五":
                    newTable[time*7+4] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                case "六":
                    newTable[time*7+5] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                case "日":
                    newTable[time*7+6] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId }
                    break;
                default:
                    break;
            }
        }
        for(var j = 0; j < 15; j++) {
            for(var k = 0; k < 7; k++) {
                if(newTable[j*7 + k] === null) {
                    newTable[j*7 + k] = "0";
                }
            }
        }
        setLessonTable(newTable);
        console.log(newTable);
    }
    
    useEffect(() => {
       printLessonTable();
    }, [schedule]);

    return (
        <lessonContext.Provider
            value={{
                lessonTable,
                getSchedule,
                addCourse,
                DeleteCourse,
                getCourseInfo,
                courseInfo,
                stuID,
                logIn,
                setStuID,
                setLogIn,
            }}
            {...props}
        />
    )
}

const Lesson = () => useContext(lessonContext);
export { LessonProvider, Lesson}