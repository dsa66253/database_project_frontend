import LessonTable from './Table';
import { Button, Layout, Switch } from 'antd';
import {LogoutOutlined} from "@ant-design/icons";
import Side from './Side';
import { Profile } from '../Hooks/useProfile';

const { Header, Content, Sider } = Layout;


const HomePage = () => {
    const { setLogIn, language, setLanguage, stuID} = Profile();
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

    return (
        <Layout>
            <Header style={{color:'white', fontSize: '40px',  backgroundColor:'#91d5ff', display: 'flex', justifyContent:'space-between'}}>
                <div className='logo'>{stuID}'s Lesson Table</div>
                <div style={{float:"right"}}>
                    <Switch style={{margin:"auto"}} defaultChecked checkedChildren="ch" unCheckedChildren="en" onChange={onChange} />
                    <LogoutOutlined style={{margin:"auto"}} onClick={LogOut}/>
                </div>

            </Header>
            <Layout>
                <Sider width={300} theme='light' style={{margin:'1em', backgroundColor:"#f5f5f5"}}><Side/></Sider>
                <Content theme='light' style={{margin:'1em'}}>
                    <LessonTable/>
                </Content>
            </Layout>
        </Layout>
    )
}
export default HomePage;