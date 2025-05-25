import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Ame from './files/Ame'
import Sample from './files/Sample'  
import './files/Style.css'


function App() {
  return ( 
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Ame />} />
            <Route path="/server" element={<Sample />} />   
          </Routes>   
        </div>
      </Router>
    </>
  );
}

export default App;
