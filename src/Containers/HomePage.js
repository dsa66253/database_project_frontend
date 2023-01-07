import LessonTable from './Table';
import {Layout, Switch, Modal } from 'antd';
import {LogoutOutlined} from "@ant-design/icons";
import Side from './Side';
import { Profile } from '../Hooks/useProfile';
import { useEffect, useState } from 'react';
import styles from "./HomePage.module.css"

const { Header, Content, Sider } = Layout;


const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setLogIn, language, setLanguage, stuID} = Profile();
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])
    const LogOut = () => {
        setLogIn(false);
    }
    const onChange = (checked) => {
        if (checked){
            setLanguage("ch");
        }else{
            setLanguage("en");
        }
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };
    
    return (
        <div className={styles.entireWrapper}>
            <Modal title="Use direction" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>You can use any student ID to log in\n if it doesn't exit in system, we create one for you\n You can add courses we selected from NTU EE and IM department(eg. 11173)</p>
            </Modal>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles}>{stuID}'s</h1>
                    <h1 className={styles}> Lesson Table</h1>
                </div>
                
                <div>
                    <Switch style={{margin:"auto"}} defaultChecked checkedChildren="ch" unCheckedChildren="en" onChange={onChange} />
                    <LogoutOutlined style={{margin:"auto"}} onClick={LogOut}/>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.search}><Side /></div>
                <div  className={styles.lessnTable}><LessonTable/></div>
            </div>
        </div>
    )
}
export default HomePage;