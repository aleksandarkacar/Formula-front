import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router';
import Drivers from './components/pages/Drivers';
import DriverDetails from './components/pages/DriverDetails';
import Teams from './components/pages/Teams';
import Races from './components/pages/Races';
import TeamDetails from './components/pages/TeamDetails';

export default function App() {
  return (
    <Router>
      {/* Navigacija */}
      <nav className='top-navigation'>
        <ul>
          <li>
            <NavLink to='/'>Drivers</NavLink>
          </li>
          <li>
            <NavLink to='/teams'>Teams</NavLink>
          </li>
          <li>
            <NavLink to='/races'>Races</NavLink>
          </li>
        </ul>
      </nav>

      {/* Rute */}
      <div style={{backgroundColor: '#ccc'}}>
      <Routes>
        <Route path='/' element={<Drivers />}/>
        <Route path='/:id' element={<DriverDetails />}/>
        <Route path='/teams' element={<Teams />}/>
        <Route path='/races' element={<Races />}/>
        <Route path='/teams/:id' element={<TeamDetails />}/>
      </Routes>
      </div>
    </Router>
  )
}
