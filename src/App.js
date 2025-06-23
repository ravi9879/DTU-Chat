import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Login from './components/Login';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Bot from './components/Bot';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route> 
          <Route path='/chat' element={<Chat />}></Route> 
          <Route path='/sign-up' element={<SignUp />}></Route> 
          <Route path='/home' element={<Home />}></Route> 
          <Route path='/bot' element={<Bot />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}


export default App;
