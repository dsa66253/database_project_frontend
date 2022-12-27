import LessonTable from './Table';
import { useState } from 'react';
import { Button, Layout } from 'antd';
import Side from './Side';
import { Profile } from '../Hooks/useProfile';
import { getSchedule } from '../Api/courseByUser';
import { async } from 'q';
const { Header, Content, Sider } = Layout;


const HomePage = () => {
    const { setLogIn, setLanguage, language, setSchedule, stuID} = Profile();
    const LogOut = () => {
        setLogIn(false);
    }

    const changeLan = async () => {
        if(language === "ch") {
            setLanguage("en")
            const tmp = await getSchedule(stuID, language);
            const sch = [...tmp];
            console.log(sch);
            setSchedule(sch);
        } else {
            setLanguage("ch")
            const tmp = await getSchedule(stuID, language);
            const sch = [...tmp];
            console.log(sch);
            setSchedule(sch);
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