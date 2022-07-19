import React, { useState } from 'react'
import { Icon } from '@iconify/react';
export const Header = () => {
    const [menuTab, setmenuTab] =useState(true)
    const handlerMenu =()=>{
        setmenuTab(!menuTab)
    }
  return (
    <header>
        <div className='HeaderContainer'>
            <Icon icon="clarity:menu-line" className='menuIcon' onClick={handlerMenu} />
        </div>
        {/* {menuTab && */}
            <div className={menuTab?"sideMenu":"sideMenu active"}> 
                <p className='menu'>Home</p>
                <p className='setting'>Setting</p>
                <p className='setting'>Setting</p>
            </div>
        {/* } */}
    </header>
  )
}
