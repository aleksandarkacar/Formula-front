import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";
import Drivers from "./components/pages/Drivers";
import DriverDetails from "./components/pages/DriverDetails";
import Teams from "./components/pages/Teams";
import Races from "./components/pages/Races";
import TeamDetails from "./components/pages/TeamDetails";
import RaceDetails from "./components/pages/RaceDetails";
import Landing from "./components/pages/Landing";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
// import "./styles/reset.css";
// import "./styles/App.scss";
// import "./styles/components/nav.scss";
// import "./styles/components/tables.scss";

// import { FlagOutlined } from '@ant-design/icons';
import { Flag } from "lucide-react";
// import { TeamOutlined } from '@ant-design/icons';
import { UsersRound } from "lucide-react";
// import { CalendarOutlined } from '@ant-design/icons';
import { Calendar } from "lucide-react";
// import { FontSizeOutlined } from '@ant-design/icons';
import { Building2 } from "lucide-react";

export default function App() {
  const currentYear = new Date().getFullYear() - 1;
  // console.log(currentYear);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [countryList, setCountryList] = useState([]);

  const allYears = Array.from({ length: 25 }, (_, i) => currentYear - i);

  // console.log(allYears);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const url =
      "https://raw.githubusercontent.com/Imagin-io/country-nationality-list/refs/heads/master/countries.json";
    const response = await axios.get(url);

    console.log("GetCountryList", response.data);
    setCountryList(response.data);
  };
  console.log("selectedYear", selectedYear);

  return (
    <Router>
      {/* Navigacija */}
      <nav className="top-navigation">
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          {allYears.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <div className="nav-links">
          <div className="li-el">
            <NavLink to="/">
              <UsersRound className="icons icon" /> Drivers
            </NavLink>
          </div>
          <div className="li-el">
            <NavLink to="/teams">
              <Building2 className="icons icon" /> Teams
            </NavLink>
          </div>
          <div className="li-el">
            <NavLink to="/races">
              <Calendar className="icons icon" /> Races
            </NavLink>
          </div>
        </div>
        <div className="F1">
          <Flag className="flag" />
          <NavLink to="/landing">
            <div>F1Dashboard</div>
          </NavLink>
        </div>
      </nav>

      {/* Rute */}
      <div className="page">
        {/* <div style={{backgroundColor: '#ccc'}}> */}
        <Routes className="page">
          {/* <Route path="/" element={<Navigate to="/drivers"></Navigate>} /> */}
          <Route
            path="/"
            element={
              <Drivers selectedYear={selectedYear} countryList={countryList} />
            }
          />
          <Route
            path="/:id"
            element={
              <DriverDetails
                selectedYear={selectedYear}
                countryList={countryList}
              />
            }
          />
          <Route
            path="/teams"
            element={
              <Teams selectedYear={selectedYear} countryList={countryList} />
            }
          />
          <Route
            path="/races"
            element={
              <Races selectedYear={selectedYear} countryList={countryList} />
            }
          />
          <Route
            path="/races/:id"
            element={
              <RaceDetails
                selectedYear={selectedYear}
                countryList={countryList}
              />
            }
          />
          <Route
            path="/teams/:id"
            element={
              <TeamDetails
                selectedYear={selectedYear}
                countryList={countryList}
              />
            }
          />
          <Route path="/landing" element={<Landing to="/landing" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
