import {createContext, useContext, useState} from "react"
const profileContext = createContext({
    setStuID: () => {},
    stuID: "",
    logIn: false,
    setLogIn: () => {},
})

const ProfileProvider = (props) => {
    const [stuID, setStuID] = useState("");
    const [logIn, setLogIn] = useState(false);

    return (
        <profileContext.Provider
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

const  Profile= () => useContext(profileContext);
export {ProfileProvider, Profile}