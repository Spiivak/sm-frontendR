import { Shift } from '../services/shift.service'
import { shiftService } from '../services/shift.service'

interface ProductPreviewProps {
  shift: Shift
  onRemoveShift: (shiftId: string) => void
  onEditShift: (shift: Shift) => void
}

export function ShiftPreview({ shift }: ProductPreviewProps) {


  const { day: fromDay, month: fromMonth, dayName: fromDayName } = shiftService.formatDate(shift.date.from)
  const { day: toDay, month: toMonth, dayName: toDayName } = shiftService.formatDate(shift.date.to)


  const isToday = shiftService.isDateToday(new Date(shift.date.from))


  const { fromHours, fromMinutes, toHours, toMinutes } = shift.time
    ? shiftService.extractTimeComponents([shift.time])
    : { fromHours: [], fromMinutes: [], toHours: [], toMinutes: [] };


  const totalHours = shiftService.calculateTotalHours(shift)
  const totalEarned = shiftService.calculateTotalEarned(shift)

  return (
    <div className={`shift-preview flex align-center ${isToday ? 'highlight' : ''}`}>
      {shift.type === 'normal' &&
        <div className="date-circle flex column align-center justify-center">
          <p>{fromDay}/{fromMonth}</p>
          <span>{toDayName}</span>
        </div>
      }
      <div className="shift-information flex column">
        {shift.type === 'normal' &&
          <div className="time flex column">
            <span className='flex gap8'>
              <span className='from'>From - {fromHours}:{fromMinutes}</span>
              <span className='to'>To - {toHours}:{toMinutes}</span>
            </span>
          </div>
        }
        {shift.type === 'dayoff' && <div>
          <span>Day off</span>
          <span>From {fromDay}/{fromMonth} To {toDay}/{toMonth}</span>
        </div>}
        {shift.type === 'sickday' && <div>
          <span>Sick day</span>
          <span>From {fromDay}/{fromMonth} To {toDay}/{toMonth}</span>
        </div>}
        <div className="more-info flex gap16">
          <span className="total-hours">{totalHours} hours</span>
          <span className="total-earned">₪{totalEarned?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
