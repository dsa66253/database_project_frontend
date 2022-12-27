import LessonTable from './Table';
import { useState } from 'react';
import { Button, Layout } from 'antd';
import Side from './Side';
import { Profile } from '../Hooks/useProfile';
import { getSchedule } from '../Api/courseByUser';
import { async } from 'q';
const { Header, Content, Sider } = Layout;


const HomePage = () => {
    const { setLogIn, language, setLanguage} = Profile();
    const LogOut = () => {
        setLogIn(false);
    }

    function changeLan() {
        if(language === "ch") {
            setLanguage("en");
        } else {
            setLanguage("ch");
        }
    }


    return (
        <Layout>
            <Header style={{color:'white', fontSize: '40px',  backgroundColor:'#91d5ff', display: 'flex', justifyContent:'space-between'}}>
                <div className='logo'>Lesson Table</div>
                <Button style={{position: 'relative', top:'25%', left:'33%'}} onClick={changeLan}>{language}</Button>
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