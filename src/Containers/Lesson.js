import {createContext, useContext, useState, useEffect} from "react"
import instance from '../api';

const lessonContext = createContext({
    lessonTable: [],
})

const LessonProvider = (props) => {
    const [schedule, setSchedule] = useState([]);
    const [lessonTable, setLessonTable] = useState([]);
    setLessonTable(["aaa", "bbb", 0])

    const getSchedule = async () => {
        const {
            data: { messages, data },
        } = await instance.get({
            body: {
                SId: 'r09525126', 
                password: null
            },
        });
        if(messages) setSchedule(data)
    }
    useEffect(() => {
       
    }, [schedule]);

    return (
        <lessonContext.Provider
            value={{
                lessonTable
            }}
            {...props}
        />
    )
}

const Lesson = () => useContext(lessonContext);
export { LessonProvider, Lesson}