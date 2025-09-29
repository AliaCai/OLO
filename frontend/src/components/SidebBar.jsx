import React,{useState} from 'react'
import '../styles/SideBar.css'
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SvgIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';


const tabs=[
  {
    key:'/events',
    title:"events",
    logo:EventIcon

  },
    {
    key:'/schedule',
    title:"schedule",
    logo:CalendarMonthIcon

  },
    {
    key:'/map',
    title:"map",
    logo:MapIcon

  },
    {
    key:'/friends',
    title:"friends",
    logo:PeopleIcon

  },
]
function SidebBar() {
    let navigate=useNavigate();

    const [which_tab, set_which_tab]=useState(null)

  function handelClick(e,tab){
    set_which_tab(tab.title)
    e.preventDefault();
    navigate(tab.key)
  }
  return (
    <div className='sideBar'>
      
     <div>
      {
      tabs.map(tab=>
        (<div className={`sideBar_tab ${which_tab==tab.title?`sideBar_tab_active`:null} `} name={tab.key} onClick={e=>handelClick(e,tab)}> 
             <SvgIcon className='sideBar_tab_logo' component={tab.logo}></SvgIcon>
             {tab.title.toUpperCase()}
          </div>
     
        )
      )
      
      }
     </div>
    </div>
  )
}

export default SidebBar
