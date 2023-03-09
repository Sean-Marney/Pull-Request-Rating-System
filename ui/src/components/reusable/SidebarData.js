import {
    AccessAlarm,
    Assessment,
    Star,
    QuestionMark,
    DeveloperBoard,
    History,
    Leaderboard,
    Stars,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NavLink, Link} from "react-router-dom";


const Sidebar = ({ children, removeCookie }) => {
    const navigate = useNavigate();

    function logout() {
        removeCookie("token", {path: "/"});
        removeCookie("role", { path: "/" });
        navigate("/login");
    }
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <AccessAlarm />,
        },
        {
            path: "/rewards",
            name: "Rewards",
            icon: <Star />,
        },
        {
            path: "/faq",
            name: "FAQ",
            icon: <QuestionMark />,
        },
        {
            path: "/trackprogress",
            name: "TrackProgress",
            icon: <DeveloperBoard />,
        },
        {
            path: "/history",
            name: "History",
            icon: <Assessment />,
        },
        {
            path: "/merge",
            name: "Merge",
            icon: <History />,
        },
        {
            path: "/myrewards",
            name: "My Rewards",
            icon: <Stars />,
        },
        {
            path: "/Leaderboard",
            name: "Leaderboard",
            icon: <Leaderboard />,
        },
    ];
    return (
        <div className="container">
            <div style={{ width: "200px" }} className="sidebar">
                <div className="top_section">
                <Link to="/"
                    className="link">
                    <h1 style={{ display: "block" }} className="logo">GRAPHIUM</h1>
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
                <button onClick={logout}>Logout</button>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
