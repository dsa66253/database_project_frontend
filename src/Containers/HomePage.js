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
        setIsModalOpen(true)
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
            <Modal footer={null} title="INSTRUCTIONS" open={isModalOpen} onCancel={handleCancel}>
                <p>You can use any student ID to log in for Demo purpose.</p>
                <p>If it doesn't exit in system, we create one for you.</p>
                <p>Search course and add course to your class schedule.</p>
                <p>For deleting the course, click trash icon below corresponding course.</p>
                <p className={styles.highlight}>click classroom to bring you there by Google map</p>

            </Modal>
            <div className={styles.header}>
                <div className={styles.titleWrapper} onClick={()=>{setIsModalOpen(true);}}>
                    <h1 className={styles}>{stuID}'s</h1>
                    <h1 className={styles}> class schedule</h1>
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