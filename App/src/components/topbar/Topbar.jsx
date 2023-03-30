import "./topbar.css";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const logOut = () =>{
    localStorage.removeItem("user");
    window.location.reload(true);
   }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Meet you</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
          </Dropdown.Toggle >
            <Dropdown.Menu className="topbar_dropdown">
              <Dropdown.Item className="topbar_dropdown">
                <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                    Profile
                </Link>
              </Dropdown.Item>

              <Dropdown.Item >
                <p onClick={logOut}>Logout</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </div>
  );
}