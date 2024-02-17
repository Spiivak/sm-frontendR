import { useNavigate } from "react-router-dom"
import { Shift } from "../services/shift.service"
import { ShiftPreview } from "./ShiftPreview"

interface ShiftListProps {
  shifts: Shift[]
  onRemoveShift: (shiftId: string) => void
  onEditShift: (shift: Shift) => void
}

export function ShiftList({ shifts, onRemoveShift, onEditShift }: ShiftListProps) {
  const navigate = useNavigate()
  const handleShiftEdit = (shift: Shift) => {
    navigate(`${shift._id}/edit`)
  }

  return (
    <section className='shifts-list'>
      {shifts.map((shift: Shift) => (
        <div className="item" key={shift._id} onClick={() => handleShiftEdit(shift)}>
        <ShiftPreview
          key={shift._id}
          shift={shift}
          onRemoveShift={onRemoveShift}
          onEditShift={onEditShift}
          />
          </div>
      ))}
    </section>
  )
}
