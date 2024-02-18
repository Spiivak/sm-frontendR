import React from 'react'
import { CaseIcon, GeneralIcon, NowIcon, ShiftsIcon } from './Icons'
import { NavLink } from 'react-router-dom'

type Props = {}

const AppBottomNav = (props: Props) => {
  return (
    <nav className='app-bottom-nav flex justify-center'>
      <ul className='flex align-center justify-center'>
        <NavLink to='/general' className='flex column align-center'>
          <GeneralIcon />
          <span>General</span>
        </NavLink>
        <NavLink to='/work' className='flex column align-center'>
          <CaseIcon/>
          <span>Work</span>
          </NavLink>
          <NavLink to='/now' className='flex column align-center'>
            <NowIcon/>
          <span>Now</span>
          </NavLink>
          <NavLink to='/' className='flex column align-center'>
            <ShiftsIcon/>
          <span>Shifts</span>
          </NavLink>
      </ul>
    </nav>
  )
}

export default AppBottomNav