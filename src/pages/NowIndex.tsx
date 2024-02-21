import React from 'react'
import AppBottomNav from '../cmps/AppBottomNav'
import { CiCircleMore } from 'react-icons/ci'
import { FaAngleDown } from 'react-icons/fa'

type Props = {}

const NowIndex = (props: Props) => {
  return (
    <section className="now-index index">
      <div className="header">
        <div className="title flex align-center gap8">
          <FaAngleDown size={20} />
          <h3>Job 1</h3>
        </div>
      </div>
      <main>
        <div className='shift-circle'>
          <div className="circle">

          </div>
        </div>
        <div className="information flex column align-center">
          <span>Not on shift</span>
          <span>long press on the button below to entery</span>
        </div>
      </main>
      <div className="bottom-nav flex align-center justify-center">
        <button></button>
      </div>
      <AppBottomNav />
    </section>
  )
}

export default NowIndex