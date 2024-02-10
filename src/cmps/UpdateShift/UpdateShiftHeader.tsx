import { useNavigate } from 'react-router-dom'
import { Shift } from '../../services/shift.service';

export default function UpdateShiftHeader() {
  const navigate = useNavigate()

  const handleCancel = async () => {
    try {
      // const shift = await shiftService.getTempShift()
      // const savedShift = await shiftService.clearTempShift(shift)
      navigate(`/`);
    } catch (error) {
      console.error('Error occurred while getting shift ID:', error);
    }
  }

  const handleSave = async () => {
    try {
      // const shift: Shift = await shiftService.getTempShift()
      // await shiftService.save(shift)
      navigate(`/`)
    } catch (error) {
      console.error('Error occurred while getting shift ID:', error)
    }
  }

  return (
    <header className='app-header update-shift-header'>
      <nav className="flex align-center space-between">

          <button className='btn-txt medium-primary' onClick={handleCancel}>
            Cancel
          </button>

          <h4>Edit Shift</h4>

          <button className="btn-txt medium-primary"
          onClick={handleSave}>
            Save
            </button>
      </nav>
      <div className="tabs flex space-between gap8">
        <div className="tab">
          <span>New Shift</span>
        </div>
        <div className="tab">
          <span>Day off</span>
        </div>
        <div className="tab">
          <span>Sick day</span>
        </div>
      </div>
    </header>
  )
}
