
import {
    FaChartLine,
    FaChartBar,
    FaStar,
    FaQuestion, FaBarcode, FaCross
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon: <FaChartBar/>

        },
        {
            path:"/Achievements",
            name:"Achievements",
            icon:<FaStar/>
        },
        {
            path:"/FAQ",
            name:"FAQ",
            icon:<FaQuestion/>
        },
        {
            path:"/TrackProgress",
            name:"TrackProgress",
            icon:<FaBarcode/>
        },
        {
            path:"/History",
            name:"History",
            icon:<FaChartLine/>
        },
        {
            path:"/Merge",
            name:"Merge",
            icon:<FaCross/>
        }
    ]
    return (
        <div className="container">
            <div style={{width:"200px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: "block"}} className="logo">GRAPHIUM</h1>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display:"block"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;