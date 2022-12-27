import { async } from "q";
import {createContext, useContext, useState, useEffect} from "react"
import { getSchedule } from "../Api/courseByUser";

const profileContext = createContext({
    setStuID: () => {},
    stuID: "",
    logIn: false,
    setLogIn: () => {},
    lessonTable: [],
    setSchedule: () => {},
    language: "",
    setLanguage: () => {},
})

const ProfileProvider = (props) => {
    const [stuID, setStuID] = useState("");
    const [logIn, setLogIn] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [lessonTable, setLessonTable] = useState([]);
    const [language, setLanguage] = useState("ch");

    async function changeSchedule() {
        console.log(language)
        const tmp = await getSchedule(stuID, language);
        const sch = [...tmp];
        console.log(sch);
        setSchedule(sch);
    }

    function printLessonTable() {
        var newTable = new Array(15*7);
        if(schedule === undefined) {
            return;
        }
        for(var i = 0; i < schedule.length; i++) {
            var time = schedule[i].Time;
            switch (schedule[i].Day) {
                case "一":
                    newTable[time*7] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName}
                    break;
                case "二":
                    newTable[time*7+1] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
                    break;
                case "三":
                    newTable[time*7+2] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
                    break;
                case "四":
                    newTable[time*7+3] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
                    break;
                case "五":
                    newTable[time*7+4] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
                    break;
                case "六":
                    newTable[time*7+5] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
                    break;
                case "日":
                    newTable[time*7+6] = { name: schedule[i].CourseName, location: schedule[i].Location, id: schedule[i].CId, google: schedule[i].GoogleName }
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
        // console.log(newTable);
    }

    useEffect(() => {
        printLessonTable();
    }, [schedule])

    useEffect(() => {
        console.log(language);
        changeSchedule();
    }, [language])

    return (
        <profileContext.Provider
            value={{
                stuID,
                logIn,
                setStuID,
                setLogIn,
                lessonTable,
                setSchedule,
                language,
                setLanguage,
            }}
            {...props}
        />
    )
}

const  Profile= () => useContext(profileContext);
export {ProfileProvider, Profile}