import './App.css';
// import { Lesson } from './Containers/Lesson';
import {Profile} from "./Hooks/useProfile"
import HomePage from './Containers/HomePage';
import LoginPage from './Containers/LoginPage';


function App() {
  const { logIn } = Profile();
  // const {logIn} = Lesson();
  // console.log("logIn", logIn);
  return (
    // <LoginPage/>
    <div>{logIn? <HomePage/> : <LoginPage/>}</div>
  );
}

export default App;
