import {createContext, useContext, useState} from "react"
const lessonContext = createContext({
    setStuID: () => {},
    stuID: "",
    logIn: false,
    setLogIn: () => {},
})

const LessonProvider = (props) => {
    const [stuID, setStuID] = useState("");
    const [logIn, setLogIn] = useState(false);

    return (
        <lessonContext.Provider
            value={{
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
export {LessonProvider, Lesson}