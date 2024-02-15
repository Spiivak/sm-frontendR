import { useSelector } from "react-redux";
import AppHeader from "../cmps/AppHeader";
import { ShiftList } from "../cmps/ShiftList";
import { Shift } from "../services/shift.service";
import { loadShifts, removeShift, saveShift } from "../store/actions/shift.action";
import { useEffect } from "react";

export function ShiftIndex() {
  const shifts = useSelector((storeState: any) => storeState.shiftModule.shifts)

  useEffect(() => {
    onLoadShifts()
  }, [])

  async function onLoadShifts() {
    try {
      await loadShifts()
    } catch (error) {
      console.error('Shift Index: Cannot load shifts =>', error)
    }
  }

  async function onRemoveShift(shiftId: string) {
    try {
      await removeShift(shiftId)
      // showSuccessMsg('Shift removed')
    } catch (err) {
      console.error('Shift Index: Cannot remove Shift =>', err)
      // showErrorMsg('Cannot remove Shift')
    }
  }

  async function onEditShift(shift: Shift) {
    const price = +prompt('New price?')!
    const shiftToSave = { ...shift, price }

    try {
      const savedShift = await saveShift(shiftToSave)
      // showSuccessMsg(`Shift updated to price: $${savedShift?.payment?.price}`)
    } catch (err) {
      console.error('Shift Index: Cannot update Shift =>', err)
      // showErrorMsg('Cannot update Shift')
    }
  }



  return (
    <section className="shifts-index main-layout index">
      <AppHeader />
      <main>
        <ShiftList shifts={shifts} onRemoveShift={onRemoveShift} onEditShift={onEditShift} />
      </main>
    </section>
  )
}
