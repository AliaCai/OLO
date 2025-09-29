import React from 'react'
import '../styles/Header.css'
import company_logo_black from '../assets/company_logo_black.png'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Header() {
  return (
    <div className="header">
      <div className="header_company">
   
            <img className="header_company_logo" src={company_logo_black} alt="company logo" />
            <div className="header_company_name">OLO</div>
 
      </div>
      <div className="header_right">
      <div className="header_right_setting">
        <SettingsIcon />
      </div>
      <div className="header_right_profile">
        <AccountCircleOutlinedIcon  />
      </div>
      </div>

    </div>
  )
}

export default Header
