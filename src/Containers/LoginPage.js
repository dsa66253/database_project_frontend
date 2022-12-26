import { Typography, Input } from 'antd';
import { Profile } from '../Hooks/useProfile';
import styled from 'styled-components'
import { getSchedule } from '../Api/courseByUser';
import getUser from '../Api/user';

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
    const { setStuID, stuID, setLogIn, setSchedule} = Profile();
    const onLogin = async (id) => {
        console.log("onLogin", id)
        if(!id){
            console.log(" upper id", id)
            return;
        } else {
            console.log("id", id)
            await getUser(id);
            const sch = await getSchedule(id);
            // console.log(sch);
            const tmp = [...sch];
            console.log(tmp);
            setSchedule(tmp);
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