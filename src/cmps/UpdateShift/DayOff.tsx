import { Shift, shiftService } from '../../services/shift.service';
import { useForm } from '../../customHooks/useForm';
import { EnteryIcon, ExitIcon } from '../Icons';
import { useState } from 'react';
interface Props {
  shift: Shift
}

export default function DayOff({ shift }: Props) {
  const [fields, setFields, handleChange] = useForm(shift)
  const [editedField, setEditedField] = useState<string | null>(null)

  async function handleUpdateShift() {
    if (!shift) return;
  
    const fromDate = new Date(fields.date.from);
    const toDate = new Date(fields.date.to);
  
    // Calculate the duration in milliseconds
    const durationInMilliseconds = toDate.getTime() - fromDate.getTime();
  
    // Calculate the total hours
    const totalHours = durationInMilliseconds / (1000 * 60 * 60);
  
    const updatedShift = {
      ...shift!,
      type: 'dayoff',
      time: {
        from: 8 * 60 * 60 * 1000, // Start time (in milliseconds)
        to: (8 + totalHours) * 60 * 60 * 1000, // End time (in milliseconds)
        rate: 0
      },
      date: fields.date,
    };
  
    try {
      return await shiftService.save(updatedShift);
    } catch (error) {
      console.error('Error saving shift:', error);
    }
  }
  

  const { day: fromDay, month: fromMonth } = shiftService.formatDate(fields.date.from);
  const { day: toDay, month: toMonth } = shiftService.formatDate(fields.date.to);

  return (
    <section className='new-shift' >
      <div className="actions">
        <div className="action entery flex align-center space-between shift-card">
          <div className="placeholder flex align-center gap8">
            <EnteryIcon />
            <span>Entery</span>
          </div>
          <form className="entery-edit" onSubmit={() => handleUpdateShift()} >
          {editedField === 'entry' ? (
              <div className="flex gap8">
                <input
                  type="date"
                  name="from"
                  defaultValue={`${new Date().getFullYear()}-${fromMonth}-${fromDay}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
              </div>
            ) : (
              <div className='flex column align-center' onClick={() => setEditedField('entry')}>
                <span className='date'>{fromDay}/{fromMonth}</span>
              </div>
            )}
          </form>
        </div>
        <div className="action exit flex space-between align-center shift-card">
          <div className="placeholder flex align-center gap8">
            <ExitIcon />
            <span>Exit</span>
          </div>
          <form>
          {editedField === 'exit' ? (
              <div className="flex gap8">
                <input
                  type="date"
                  name="to"
                  defaultValue={`${new Date().getFullYear()}-${toMonth}-${toDay}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
              </div>
            ) : (
              <div className='flex column align-center' onClick={() => setEditedField('exit')}>
                <span className='date'>{toDay}/{toMonth}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>

  )
}
