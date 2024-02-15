import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, ShareIcon } from './Icons'
import { shiftService } from '../services/shift.service'

export default function AppHeader() {
  const navigate = useNavigate()

  const handleNavigate = async () => {
    try {
      const shift = await shiftService.getEmptyShift();
      const savedShift = await shiftService.save(shift)
      const shiftId = savedShift._id;
      navigate(`/${shiftId}/edit`);
    } catch (error) {
      console.error('Error occurred while getting shift ID:', error);
    }
  }

  return (
    <header className='app-header'>
      <nav className="flex space-between">
        <div className="flex align-center gap16">

          <button className='btn-icon medium-transparent share-icon'><ShareIcon /></button>
          <button className="btn-txt medium-transparent">Edit</button>
        </div>

        <div className="flex align-center">
          <button
            // to={`/${shiftId}/edit`}
            className='btn-icon medium-sec add-shift'
            onClick={handleNavigate}
          >
            <PlusIcon />
          </button>
        </div>

      </nav>

      <div className="job-preview flex align-center space-between">
        <button className="btn-icon medium-primary"><ArrowLeftIcon /></button>
        <div className="job-details flex column align-center">
          <h2>Job 1</h2>
          <p>February 2024</p>
        </div>
        <button className="btn-icon medium-sec"><ArrowRightIcon /></button>
      </div>
    </header>
  )
}
