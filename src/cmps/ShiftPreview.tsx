import { Shift } from '../services/shift.service'
import { shiftService } from '../services/shift.service'
import { SickIcon, VacationIcon } from './Icons'

interface ProductPreviewProps {
  shift: Shift
  onRemoveShift: (shiftId: string) => void
  onEditShift: (shift: Shift) => void
}

export function ShiftPreview({ shift }: ProductPreviewProps) {
  const { day: fromDay, month: fromMonth } = shiftService.formatDate(shift.date.from)
  const { day: toDay, month: toMonth, dayName: toDayName } = shiftService.formatDate(shift.date.to)
  const isToday = shiftService.isDateToday(new Date(shift.date.from))
  const { fromHours, fromMinutes, toHours, toMinutes } = shift.time
    ? shiftService.extractTimeComponents([shift.time])
    : { fromHours: [], fromMinutes: [], toHours: [], toMinutes: [] }
  const totalHours = shiftService.calculateTotalHours(shift)
  const totalEarned = shiftService.calculateTotalEarned(shift)

  const renderShiftTypeIcon = () => {
    switch (shift.type) {
      case 'dayoff':
        return <div className="type-icon">
          <VacationIcon />
        </div>
      case 'sickday':
        return (<div className='type-icon'>
          <SickIcon />
        </div>)
      case 'normal':
        return (
          <div className="date-circle flex column align-center justify-center">
            <p>{fromDay}/{fromMonth}</p>
            <span>{toDayName}</span>
          </div>

        )
      default:
        return null
    }
  }

  const renderShiftInfo = () => {
    switch (shift.type) {
      case 'normal':
        return (
          <div className="time flex column">
            <span className='flex gap8'>
              <span className='from'>From - {fromHours}:{fromMinutes}</span>
              <span className='to'>To - {toHours}:{toMinutes}</span>
            </span>
          </div>
        )
      case 'dayoff':
      case 'sickday':
        return (
          <div className={`${shift.type}-info flex gap8`}>
            <span>{shift.type === 'dayoff' ? 'Day off' : 'Sick day'}</span>
            <span>From {fromDay}/{fromMonth} To {toDay}/{toMonth}</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`shift-preview flex align-center ${isToday ? 'highlight' : ''}`}>
      <div className="type">{renderShiftTypeIcon()}</div>
      <div className="shift-information flex column">
        {renderShiftInfo()}
        <div className="more-info flex gap16">
          {shift.type === 'normal' && <span className="total-hours">{totalHours} hours</span>}
          <span className="total-earned">₪{totalEarned?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
