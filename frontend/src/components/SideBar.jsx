import React, { useState } from "react";
import './SideBar.css';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';


function SideBar(){
    const [isHover, setIsHover]=useState(false)
    const handleMouseEnter=()=>{
        setIsHover(true)
    }
    const handleMouseLeave=()=>{
        setIsHover(false)
    }
    return(
        <div className="sidebar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="org">
                <div className="orgName">
                    <MenuIcon fontSize="large"></MenuIcon>
                    {isHover?<h2>FinGrow</h2>:<></>
                    }
                </div>
            </div>
            <hr style={{borderColor:'rgba(255, 255, 255, 0.477)'}}/>
            <div className="option">
                <div className="profile optionss">
                    <PersonIcon fontSize='large' />
                    {isHover?<h2>Profile</h2>:<></>
                    }
                </div>
                <div className="notifications optionss">
                    <NotificationsIcon fontSize='large' />
                    {isHover?<h2>Notifications</h2>:<></>
                    }
                </div>
                <div className="assessment optionss">
                    <AssessmentIcon fontSize='large' />
                    {isHover?<h2>Assess</h2>:<></>
                    }
                </div>
                <div className="blogs optionss">
                    <BookIcon fontSize='large' />
                    {isHover?<h2>Blogs</h2>:<></>
                    }
                </div>
            </div>
            <hr style={{borderColor:'rgba(255, 255, 255, 0.477)'}}/>
            <div className="controller">
                <div className="settings optionss">
                    <SettingsIcon  fontSize="large" />
                    {isHover?<h2>Settings</h2>:<></>
                    }
                </div>
                <div className="logout optionss">
                    <LogoutIcon fontSize="large" />
                    {isHover?<h2>LogOut</h2>:<></>
                    }
                </div>
            </div>
        </div>
    );
}
export default SideBar;