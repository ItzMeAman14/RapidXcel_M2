import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Home'
import AddStock from './Components/AddStock';
import Navbar from './Components/Navbar';
import UpdateStock from './Components/UpdateStock';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/addStock' element={<AddStock/>} />
          <Route path='/update/:id' element={<UpdateStock/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
