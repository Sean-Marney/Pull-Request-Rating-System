import {
    AccessAlarm,
    Star,
    QuestionMark,
    DeveloperBoard,
    History,
    Leaderboard,
    Logout,
    Dashboard,
    LiveHelp,
    Help,
    Forum,
} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { NavLink, Link} from "react-router-dom";



const Sidebar = ({ children, removeCookie, role }) => {
    function logout() {
        removeCookie("token", {path: "/"});
        removeCookie("role", { path: "/" });
        removeCookie("user", { path: "/" });
    }
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <Dashboard />,
        },
        {
            path: "/rewards",
            name: "Achievements",
            icon: <Star />,
        },
        {
            path: "/history",
            name: "History",
            icon: <History />,
        },
        {
            path: "/faq",
            name: "FAQ",
            icon: <LiveHelp />,
        },
        {
            path: "/ChatBot",
            name: "PullBot",
            icon: <Forum />,
        },
        {
            path: "/profile",
            name: "Profile",
            icon: <AccountCircleIcon />,
        },       
   ];

   const mangerMenuItem =[
    {
        path: "/management",
        name: "Dashboard",
        icon: <Dashboard />,
    },
    {
        path: "/management/trackers",
        name: "Trackers",
        icon: <GpsFixedIcon />,
    },
    {
        path: "/management/rewards",
        name: "Rewards",
        icon: <Star />,
    },
    {
        path: "/management/users",
        name: "Developers",
        icon: <PeopleIcon />,
    }, 
    {
        path: "/management/repositories",
        name: "Pull Requests",
        icon: <CallMergeIcon />,
    },
    {
        path: "/management/badges",
        name: "Badges",
        icon: <MilitaryTechIcon />,
    }, 
    {
        path: "/management/Leaderboard",
        name: "Leaderboard",
        icon: <LeaderboardIcon />,
    }, 
    {
        path: "/management/faqs",
        name: "FAQ",
        icon: <LiveHelp />,
    }, 
    {
        path: "/management/ManagerHelp",
        name: "Help",
        icon: <Help />,
    },
    {
        path: "/ChatBot",
        name: "PullBot",
        icon: <Forum />,
    },
    {
        path: "/profile",
        name: "Profile",
        icon: <AccountCircleIcon />,
    },   
   ];
    return (
        <div className="container">
            <div style={{ width: "200px", position:"fixed"}} className="sidebar">
                <div className="top_section">
                <Link to="/"
                    className="link">
                    <h1 style={{ display: "block" }} className="logo">PullMaster.io</h1>
                </Link>
                </div>
                {role !== 'Manager'
                ? menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeclassname="active"
                    >
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: "block" }} className="link_text">
                            {item.name}
                        </div>
                    </NavLink>
                    ))
                : mangerMenuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeclassName="active2"
                    >
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: "block" }} className="link_text">
                        {item.name}
                        </div>
                    </NavLink>
                ))}
                <Link
                    onClick={logout}
                    to="/login"
                    key="logout"
                    className="link"
                    activeclassname="active"
                >
                <div className="icon"><Logout/></div>
                <div style={{ display: "block" }} className="link_text">Logout</div>  
                </Link>
            </div>
            <main style={{ marginLeft: "200px" }}>{children}</main>
        </div>
    );
};

export default Sidebar;
