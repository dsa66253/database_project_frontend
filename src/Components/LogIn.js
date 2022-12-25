import { Input } from 'antd'

const LogIn = ({stuID, setID, onLogin}) => {
    return (
        <Input.Search
            defaultValue={stuID}
            onChange={(e) => {  
                setID(e.target.value)
                console.log(e.target.value);
                console.log(stuID);
            }}
            enterButton="Log in"
            placeholder="Enter your student ID."
            onSearch={(stuID) => {
                onLogin(stuID);
            }}
            style={{marginBottom:'1em'}}
        />
    );
}

export default LogIn;