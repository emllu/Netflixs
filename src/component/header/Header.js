import React from 'react'
import './header.css';
import Netflixlogo from '../../assests/images/NetflixLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header(){
  return (<>
    <div className='header_outer_container'>
    <div className='header_container'>
    <div className='header_left'>
       <ul>
        <li  id="logo"><img src={Netflixlogo} alt="netflix" width="100"/></li>
        <li>Netflix</li>
        <li> home </li>
        <li>tvshows</li>
        <li>movies</li>
        <li>latest</li>
        <li>my list</li>
        <li>browse by language</li>
       </ul>


</div>
<div className='header_right'>
    <ul>
        <li><SearchIcon/></li>
        <li><NotificationsNoneIcon/></li>
        <li><AccountBoxIcon/></li>
        <li><ArrowDropDownIcon/></li>

    </ul>
</div>
</div>
    </div>
    </>
  )
}

export default Header