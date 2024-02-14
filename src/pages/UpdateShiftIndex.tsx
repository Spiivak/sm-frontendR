import { useEffect, useState } from 'react';
import NewShift from '../cmps/UpdateShift/NewShift'
import UpdateShiftHeader from '../cmps/UpdateShift/UpdateShiftHeader'
import DayOff from '../cmps/UpdateShift/DayOff';
import SickDay from '../cmps/UpdateShift/SickDay';
import { Shift, shiftService } from '../services/shift.service';
import { useParams } from 'react-router-dom';

type SetActiveTabFunction = (tabName: string) => void;


export default function UpdateShift() {
  const [activeTab, setActiveTab] = useState<string>('NewShift')
  const { shiftId } = useParams()
  const [shift, setShift] = useState<Shift | null>(null)

  useEffect(() => {
    loadShift()

  }, [shiftId]);


  const loadShift = async () => {
    if (!shiftId) return;
    try {
      const shiftData = await shiftService.getById(shiftId);
      setShift(shiftData);
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
