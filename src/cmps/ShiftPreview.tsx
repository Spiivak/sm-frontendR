import { Shift } from '../services/shift.service'
import { shiftService } from '../services/shift.service'

interface ProductPreviewProps {
  shift: Shift
  onRemoveShift: (shiftId: string) => void
  onEditShift: (shift: Shift) => void
}

export function ShiftPreview({ shift }: ProductPreviewProps) {


  const { day: fromDay, month: fromMonth, dayName: toDayName } = shiftService.formatDate(shift.date.from)


  const isToday = shiftService.isDateToday(new Date(shift.date.from))


  const { fromHours, fromMinutes, toHours, toMinutes } = shiftService.extractTimeComponents(shift.times)


  const totalHours = shiftService.calculateTotalHours(shift)
  const totalEarned = shiftService.calculateTotalEarned(shift)
  
  return (
    <div className={`shift-preview flex align-center ${isToday ? 'highlight' : ''}`}>
      <div className="date-circle flex column align-center justify-center">
        <p>{fromDay}/{fromMonth}</p>
        <span>{toDayName}</span>
      </div>
      <div className="shift-information flex column">
        <div className="time flex column">
          {shift.times.map((timeEntry, index) => (
            <span key={index} className='flex gap8'>
              <span className='from'>From - {fromHours[index]}:{fromMinutes[index]}</span>
              <span className='to'>To - {toHours[index]}:{toMinutes[index]}</span>
            </span>
          ))}
        </div>
        <div className="more-info flex gap16">
          <span className="total-hours">{totalHours.toFixed(2)} hours</span>
          <span className="total-earned">₪{totalEarned.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
