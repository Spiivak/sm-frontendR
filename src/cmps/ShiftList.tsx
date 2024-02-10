import { Shift } from "../services/shift.service"
import { ShiftPreview } from "./ShiftPreview"

interface ShiftListProps {
  shifts: Shift[]
  onRemoveShift: (shiftId: string) => void
  onEditShift: (shift: Shift) => void
}

export function ShiftList({ shifts, onRemoveShift, onEditShift }: ShiftListProps) {


  return (
    <section className='shifts-list'>
      {shifts.map((shift: Shift) => (
        <ShiftPreview
          key={shift._id}
          shift={shift}
          onRemoveShift={onRemoveShift}
          onEditShift={onEditShift}
        />
      ))}
    </section>
  )
}
