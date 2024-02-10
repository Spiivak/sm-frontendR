import { Shift } from '../services/shift.service';

interface ProductPreviewProps {
  shift: Shift;
  onRemoveShift: (shiftId: string) => void;
  onEditShift: (shift: Shift) => void;
}

export function ShiftPreview({ shift }: ProductPreviewProps) {
  console.log('ShiftPreview  shift:', shift)

  // Convert timestamp to a Date object
  const fromDate = new Date(shift?.date?.from);
  const toDate = new Date(shift?.date?.to);

  // Get day and month
  const fromDay = fromDate.getDate();
  const fromMonth = fromDate.getMonth() + 1; // Month is zero-indexed

  const toDayName = toDate.toLocaleDateString('en-US', { weekday: 'short' }); // Get the day name, e.g., "Wed"




  return (
    <section className='shift-preview'>
      <div className="date-circle flex column justify-center">
        <p>{fromDay}/{fromMonth}</p>
        <span>{toDayName}</span>
      </div>
      <div className="shift-information">
        <div className="time"></div>
        <div className="more-info">
          <span className="total-hours"></span>
          <span className="total-earned"></span>
        </div>
      </div>
    </section>
  );
}
