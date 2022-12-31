import {createContext, useContext, useState, useEffect} from "react"

const lessonContext = createContext({
    lessonTable: [],
    setSchedule: () => {},
})

const LessonProvider = (props) => {
    const [schedule, setSchedule] = useState([]);
    const [lessonTable, setLessonTable] = useState([]);
    
    function printLessonTable() {
        var newTable = new Array(15*7);
        for(var i = 0; i < schedule.length; i++) {
            var time = schedule[i].Time;
            switch (schedule[i].Day) {
                case "一":
                    newTable[time*7] = { name: schedule[i].Content, location: schedule[i].Location, id: schedule[i].CId, }
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
    }, [schedule])

    return (
        <lessonContext.Provider
            value={{
                lessonTable,
                setSchedule,
            }}
            {...props}
        />
    )
}

const Lesson = () => useContext(lessonContext);
export { LessonProvider, Lesson}