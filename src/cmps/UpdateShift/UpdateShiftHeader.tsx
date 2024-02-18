import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Shift, shiftService } from '../../services/shift.service';


interface Props {
  setActiveTab: (tabName: string) => void;
  activeTab: string;

}

export default function UpdateShiftHeader({ setActiveTab, activeTab }: Props) {
  const navigate = useNavigate()
  const { shiftId } = useParams<{ shiftId?: string }>()
  const [shift, setShift] = useState<Shift | null>(null)



  useEffect(() => {
    if (shiftId) {
      loadShift();
    }
  }, [shiftId]);


  const loadShift = async () => {
    if (!shiftId) return;
    try {
      const shiftData = await shiftService.getById(shiftId)
      setShift(shiftData)
    } catch (error) {
      console.error('Error loading shift:', error);
    }
  }


  const handleCancel = async () => {
    try {
      if (shiftId) {
        await shiftService.remove(shiftId);
        navigate(`/`);
      }
    } catch (error) {
      console.error('Error occurred while getting shift ID:', error);
    }
  }

  const handleSave = async () => {
    try {
      // const shift: Shift = await shiftService.getTempShift()
      if(!shift) return
      await shiftService.save(shift)
      navigate(`/`)
    } catch (error) {
      console.error('Error occurred while getting shift ID:', error)
    }
  }

  return (
    <header className='app-header update-shift-header'>
      <nav className="flex align-center space-between">

          <button className='btn-txt medium-transparent' onClick={handleCancel}>
            Cancel
          </button>

          <h4>Edit Shift</h4>

          <button className="btn-txt medium-transparent"
          onClick={handleSave}>
            Save
            </button>
      </nav>
      
      <div className="tabs flex space-between gap8">
        <div className={`tab ${activeTab === 'NewShift' ? 'tab-active' : ''}`} onClick={() => setActiveTab('NewShift')}>
          <span>New Shift</span>
        </div>
        <div className={`tab ${activeTab === 'DayOff' ? 'tab-active' : ''}`} onClick={() => setActiveTab('DayOff')}>
        {activeTab !== 'NewShift' && activeTab !== 'DayOff' && <div className="divider"></div>}
          <span>Day off</span>
        </div>
        <div className={`tab ${activeTab === 'SickDay' ? 'tab-active' : ''}`} onClick={() => setActiveTab('SickDay')}>
        {activeTab !== 'DayOff' && activeTab !== 'SickDay' && <div className="divider"></div>}
          <span>Sick day</span>
        </div>
      </div>

    </header>
  )
}
