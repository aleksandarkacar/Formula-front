import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";
import Drivers from "./components/pages/Drivers";
import DriverDetails from "./components/pages/DriverDetails";
import Teams from "./components/pages/Teams";
import Races from "./components/pages/Races";
import TeamDetails from "./components/pages/TeamDetails";
import RaceDetails from "./components/pages/RaceDetails";
import Landing from "./components/pages/Landing";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import { Trophy } from "lucide-react";
import { Search } from "lucide-react";

export default function App() {
  // console.log(currentYear);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [countryList, setCountryList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  console.log("searchInput", searchInput);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
    getCountryList();
  }, [showInput]);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

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
      <nav className="top-navigation icons icon">
        <div className="nav-links">
          {/* <div className="seasons">
            <Trophy />
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
          </div> */}
          <div className="li-el">
            <NavLink to="/drivers">
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
          <div className="li-el search-button" onClick={handleShowInput}>
            <Search className="icons largeIcon" />
          </div>
          {showInput && (
            <input
              className="search-input li-el"
              type="text"
              placeholder="Enter text"
              value={searchInput}
              ref={inputRef}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div className="F1">
          <Flag className="flag" />
          <NavLink to="/">
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
            path="/drivers"
            element={
              <Drivers
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                countryList={countryList}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/drivers/:id"
            element={
              <DriverDetails
                selectedYear={selectedYear}
                countryList={countryList}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/teams"
            element={
              <Teams
                selectedYear={selectedYear}
                countryList={countryList}
                setSelectedYear={setSelectedYear}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/races"
            element={
              <Races
                selectedYear={selectedYear}
                countryList={countryList}
                setSelectedYear={setSelectedYear}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/races/:id"
            element={
              <RaceDetails
                selectedYear={selectedYear}
                countryList={countryList}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/teams/:id"
            element={
              <TeamDetails
                selectedYear={selectedYear}
                countryList={countryList}
                searchInput={searchInput}
              />
            }
          />
          <Route path="/" element={<Landing to="/" />} />
          {/* {window.location.pathname !== "/landing" ? <Footer /> : null} */}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
