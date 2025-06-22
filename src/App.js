import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Login from './components/Login';
import Chat from './components/Chat';
import SignUp from './components/SignUp';

function App() {

  return (
    <div>
      <Router>

        <Routes>
          <Route path='/' element={<Login />}></Route> 
          <Route path='/chat' element={<Chat />}></Route> 
          <Route path='/sign-up' element={<SignUp />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}


export default App;
