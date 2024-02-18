import { useEffect, useState } from 'react';
import NewShift from '../cmps/UpdateShift/NewShift'
import UpdateShiftHeader from '../cmps/UpdateShift/UpdateShiftHeader'
import DayOff from '../cmps/UpdateShift/DayOff';
import SickDay from '../cmps/UpdateShift/SickDay';
import { Shift, shiftService } from '../services/shift.service';
import { useParams } from 'react-router-dom';



export default function UpdateShift() {
  const [activeTab, setActiveTab] = useState<string>('NewShift')
  const { shiftId } = useParams()
  const [shift, setShift] = useState<Shift | null>(null)

  useEffect(() => {
    loadShift()

  }, [shiftId])


  const loadShift = async () => {
    if (!shiftId) return
    try {
      const shiftData = await shiftService.getById(shiftId)
      setShift(shiftData)
      
      // Determine the initial active tab based on the shift type
      if (shiftData.type === 'dayoff') {
        setActiveTab('DayOff')
      } else if (shiftData.type === 'sickday') {
        setActiveTab('SickDay')
      } else {
        setActiveTab('NewShift')
      }
    } catch (error) {
      console.error('Error loading shift:', error);
    }
  }

  return (
    <section className='update-shift-index index'>
      <UpdateShiftHeader setActiveTab={setActiveTab} activeTab={activeTab}/>
      <main>
      {shift && (
          <>
            {activeTab === 'NewShift' && <NewShift shift={shift} />}
            {activeTab === 'DayOff' && <DayOff shift={shift} />}
            {activeTab === 'SickDay' && <SickDay shift={shift} />}
          </>
        )}
        </main>
    </section>
  )
}
