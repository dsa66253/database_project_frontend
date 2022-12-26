import LessonTable from './Table';
import { useState } from 'react';
import { Lesson } from './Lesson';
import { Button, Layout } from 'antd';
import Side from './Side';
const { Header, Content, Sider } = Layout;

const HomePage = () => {
    const [language, setLanguage] = useState("ch");
    const { setLogIn } = Lesson();
    const LogOut = () => {
        setLogIn(false);
    }
    return (
        <Layout>
            <Header style={{color:'white', fontSize: '40px',  backgroundColor:'#91d5ff', display: 'flex', justifyContent:'space-between'}}>
                <div className='logo'>Lesson Table</div>
                <Button style={{position: 'relative', top:'25%'}} >{language}</Button>
                <Button style={{position: 'relative', top:'25%'}} onClick={LogOut}>Log Out</Button>
            </Header>
            <Layout style={{backgroundColor: 'white'}}>
                <Sider width={300} theme='light'><Side/></Sider>
                <Content theme='light' backgroundColor='white'>
                    <LessonTable/>
                </Content>
            </Layout>
        </Layout>
    )
}
export default HomePage;