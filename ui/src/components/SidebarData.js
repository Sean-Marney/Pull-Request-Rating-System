import { AccessAlarm, Assessment, Star, QuestionMark, DeveloperBoard, History, Help, Stars  } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children, removeCookie}) => {
    const navigate = useNavigate();
    
    function logout() {
        removeCookie("token");
        navigate("/login");
    }
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon: <AccessAlarm/>

        },
        {
            path:"/Achievements",
            name:"Achievements",
            icon:<Star/>
        },
        {
            path:"/FAQ",
            name:"FAQ",
            icon:<QuestionMark/>
        },
        {
            path:"/TrackProgress",
            name:"TrackProgress",
            icon:<DeveloperBoard/>
        },
        {
            path:"/History",
            name:"History",
            icon:<Assessment/>
        },
        {
            path:"/Merge",
            name:"Merge",
            icon:<History/>
        },
        {
            path:"/MRewards",
            name:"MRewards",
            icon:<Stars/>
        },
        {
        path:"/ManagerHelp",
        name:"ManagerHelp",
        icon:<Help/>
}
    ]
    return (
        <div className="container">
            <div style={{ width: "200px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: "block" }} className="logo">
                        GRAPHIUM
                    </h1>
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