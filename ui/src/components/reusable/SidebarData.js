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
    Help
} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, Link} from "react-router-dom";


const Sidebar = ({ children, removeCookie }) => {
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
            name: "Rewards",
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
            path: "/profile",
            name: "Profile",
            icon: <AccountCircleIcon />,
        }        {
            path: "/management/ManagerHelp",
            name: "ManagerHelp",
            icon: <Help />,
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
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeclassName="active"
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
                    activeclassName="active"
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
