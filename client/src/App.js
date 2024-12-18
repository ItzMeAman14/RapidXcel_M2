import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Home'
import AddStock from './Components/AddStock';
import UpdateStock from './Components/UpdateStock';
import DashboardMetrics from './Components/DashboardMetrics';
import Sidebar from './Components/Sidebar';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
    <div className="App">
      <Sidebar/>
        <Routes>
          <Route path='/' element={
            <Fragment>
              <DashboardMetrics/>
              <Home/>
            </Fragment>
          } />
          <Route path='/addStock' element={<AddStock/>} />
          <Route path='/update/:id' element={<UpdateStock/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
