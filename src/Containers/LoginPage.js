import { Typography, Input, message, Spin, Popover} from 'antd';
import { Profile } from '../Hooks/useProfile';
import {postUser} from '../Api/user';
import styles from "./LoginPage.module.css"
import { useState } from 'react';
const { Title } = Typography;



const LoginPage = () => {
    const { setStuID, stuID, setLogIn} = Profile();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const showMessage = (type, content, duration=1.5)=>{
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
                setLoading(true)
                correct = await postUser(id)
                setLoading(false)
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
    let content = <div>
        <p>You can use any student ID to log in for Demo purpose.</p>
        <p>(eg. r09525126)</p>
    </div>
    return (
        <div className={styles.Wrapper}>
            <Spin tip="Loading" spinning={loading}>
                {contextHolder}
                <Title className={styles.title}>Log In</Title>
                <Popover content={content} placement="bottom">
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
                style={{marginBottom:'1em'}}/>
                </Popover>
            </Spin>
        </div>
    )

}

export default LoginPage