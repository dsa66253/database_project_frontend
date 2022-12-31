import { Typography, Input, message} from 'antd';
import { Profile } from '../Hooks/useProfile';
import styled from 'styled-components'
import {postUser, getUser} from '../Api/user';

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
    const { setStuID, stuID, setLogIn} = Profile();
    const [messageApi, contextHolder] = message.useMessage();
    const showMessage = (type, content, duration=1.5)=>{
        // console.log(type, content, duration)
        messageApi.open({type, content, duration})
    }
    const onLogin = async (id) => {
        if(!id){
            showMessage("error", 'Empty student ID is not allowed')
            // return;
        } else {
            showMessage("loading", "Logging in...", 0)
            let correct = false
            try{
                correct = await postUser(id)
                messageApi.destroy()
                if (correct){
                    // user exist
                    showMessage("success", "Welcome again")
                }else{
                    // create new user
                    showMessage("success", "Welcome my new friend")
                }
                // always login  
                setLogIn(true)
            }catch (e){
                messageApi.destroy()
                showMessage("error", 'Something went wrong with server', 2)
                console.log("e", e)
            }
            

        }
    }
    return (
        <Wrapper>
            {contextHolder}
            <Title>Log In</Title>
            <Input.Search
                defaultValue={stuID}
                onChange={(e) => {  
                setStuID(e.target.value)
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