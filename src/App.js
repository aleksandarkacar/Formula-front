import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router';
import Drivers from './components/pages/Drivers';
import DriverDetails from './components/pages/DriverDetails';
import Teams from './components/pages/Teams';
import Races from './components/pages/Races';
import TeamDetails from './components/pages/TeamDetails';
import RaceDetails from './components/pages/RaceDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./styles/reset.css";
import "./styles/App.scss";
import "./styles/components/nav.scss";
import "./styles/components/driverDetailsCard.scss";
import "./styles/components/tables.scss";
// import { FlagOutlined } from '@ant-design/icons';
import { Flag } from 'lucide-react';
// import { TeamOutlined } from '@ant-design/icons';
import { UsersRound } from 'lucide-react';
// import { CalendarOutlined } from '@ant-design/icons';
import { Calendar } from 'lucide-react';
// import { FontSizeOutlined } from '@ant-design/icons';
import { Building2 } from 'lucide-react';


export default function App() {

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getCountryList();
  }, [])

  const getCountryList = async () => {
    const url = "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);

    console.log("GetCountryList", response.data);
    setCountryList(response.data);
  }

  return (
    <Router>
      {/* Navigacija */}
      <nav className='top-navigation'>
        <ul>
          <li className='F1'>
            <Flag className='flag' /> F1Dashboard
          </li>
          <li>
            <NavLink to='/drivers'><UsersRound /> Drivers</NavLink>
          </li>
          <li>
            <NavLink to='/teams'><Building2 /> Teams</NavLink>
          </li>
          <li>
            <NavLink to='/races'><Calendar /> Races</NavLink>
          </li>

        </ul>
      </nav>

      {/* Rute */}
      <div className='page'>
        {/* <div style={{backgroundColor: '#ccc'}}> */}
        <Routes className='page'>
          {/* <Route path='/' element={<Drivers countryList={countryList} />} /> */}
          <Route path='/' element={<Navigate to="/drivers"></Navigate>} />
          <Route path='/drivers' element={<Drivers countryList={countryList} />} />
          <Route path='/drivers/:id' element={<DriverDetails countryList={countryList} />} />
          <Route path='/teams' element={<Teams countryList={countryList} />} />
          <Route path='/races' element={<Races countryList={countryList} />} />
          <Route path='/races/:id' element={<RaceDetails countryList={countryList} />} />
          <Route path='/teams/:id' element={<TeamDetails countryList={countryList} />} />
        </Routes>
      </div>
    </Router>
  )
}
