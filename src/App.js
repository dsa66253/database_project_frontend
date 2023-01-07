import './App.css';
// import { Lesson } from './Containers/Lesson';
import {Profile} from "./Hooks/useProfile"
import HomePage from './Containers/HomePage';
import LoginPage from './Containers/LoginPage';


function App() {
  const { logIn } = Profile();
  return (
    <div style={{maxWidth:"100vw"}}>{logIn? <HomePage/> : <LoginPage/>}</div>
    // <HomePage/>
  );
}

export default App;
