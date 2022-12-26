import { Typography, Input } from 'antd';
import { Profile } from '../Hooks/useProfile';
import styled from 'styled-components'
// import LogIn from '../Components/LogIn'

const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;`;

const LoginPage = () => {
    const { setStuID, stuID, setLogIn, logIn } = Profile();
    // console.log(logIn)
    const onLogin = (id) => {
        console.log("onLogin", id)
        if(!id){
            console.log(" upper id", id)
            return;
        } else {
            console.log("id", id)
            // getSchedule();
            setLogIn( ()=>{console.log("setLogIn"); return true;});
            console.log("else end", id)
        }
    }
    return (
        <Wrapper>
            <Title>Log In</Title>
            <Input.Search
                defaultValue={stuID}
                onChange={(e) => {  
                setStuID(e.target.value)
                // console.log(e.target.value);
                // console.log(stuID);
            }}
            enterButton="Log in"
            placeholder="Enter your student ID."
            onSearch={(stuID) => {
                onLogin(stuID);
            }}
            style={{marginBottom:'1em'}}
        />
        </Wrapper>
    )

}

export default LoginPage