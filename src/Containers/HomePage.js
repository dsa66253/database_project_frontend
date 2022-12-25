import LessonTable from './Table';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Side from './Side';
const { Header, Content, Sider } = Layout;

const HomePage = () => {
    return (
        <Layout backgroundcolor='#e6f7ff'>
            <Header style={{color:'white', fontSize: '40px',  backgroundColor:'#91d5ff'}}>
                <div className='logo'>Lesson Table</div>
            </Header>
            <Layout>
                <Sider width={300} theme='light'><Side/></Sider>
                <Content style={{backgroundcolor:'white'}}>
                    <LessonTable/>
                </Content>
            </Layout>
        </Layout>
    )
}
export default HomePage;