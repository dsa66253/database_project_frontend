import './App.css';
import { Lesson } from './Containers/Lesson';
import HomePage from './Containers/HomePage';
import LoginPage from './Containers/LoginPage';


function App() {
  const { logIn } = Lesson();
  console.log(logIn);
  return (
    <div>{logIn? <HomePage/> : <LoginPage/>}</div>
  );
}

export default App;
