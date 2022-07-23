import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
export const Header = () => {
    const [menuTab, setmenuTab] =useState(true)
    const handlerMenu =()=>{
        setmenuTab(!menuTab)
    }
    const handlerMenu1 =()=>{
        setmenuTab(!menuTab)
    }
  return (
    <header>
        <div className='HeaderContainer none'>
            <Icon icon="clarity:menu-line" className='menuIcon' onClick={handlerMenu} />
            <div className={menuTab?"sideMenu":"sideMenu active"}> 
                <p className='menu'>
                    <Link to="/">Home</Link>
                </p>
                <p className='setting'>
                    <Link to="/setting">Setting</Link>
                </p>
                <p className='setting'>
                <Link to="/setting">Setting</Link>

                </p>
            </div>
            <div className={menuTab?"sideMenu1":"sideMenu1 active1"} onClick={handlerMenu1}> </div>
            <div className='desktopMenu'>
                <p>Home</p>
                <p>Setting</p>
            </div>
        </div>

        {/* } */}
    </header>
  )
}
