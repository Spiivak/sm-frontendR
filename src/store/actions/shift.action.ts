import { Shift, shiftService } from '../../services/shift.service'
import { ADD_SHIFT, REMOVE_SHIFT, SET_SHIFT, SET_SHIFTS, SetShiftsAction, UPDATE_SHIFT } from '../reducers/shift.reducer'
import { store } from '../store'


export async function loadShifts(){
  try {
    const shifts = await shiftService.query()
    store.dispatch({ type: SET_SHIFTS, shifts } as SetShiftsAction)
    return shifts
  } catch (err) {
    console.error('Shifts Actions: Cannot load Shifts =>', err)
    throw err
  }
}

export async function loadShift(shiftId: string): Promise<void>{
  // ! When moving to MongoDB, I need to update type string to type ObjectId
  try {
    const shift = await shiftService.getById(shiftId)
    store.dispatch({ type: SET_SHIFT, shift })
  } catch (err) {
    console.error('Shifts Actions: Cannot load Shift =>', err)
  }
}

export async function saveShift(shift: Shift): Promise<Shift>{
  const type = shift._id ? UPDATE_SHIFT : ADD_SHIFT;
  const errType = shift._id ? 'Update' : 'Add';
  try {
    const shiftToSave: Shift = await shiftService.save(shift);
    store.dispatch({ type, shift: shiftToSave });
    return shiftToSave;
  } catch (err) {
    console.error(`Shifts Actions: Cannot ${errType} Shift =>`, err);
    throw err;
  }
}

export async function removeShift(shiftId: string): Promise<void> {
  try {
    await shiftService.remove(shiftId)
    store.dispatch({ type: REMOVE_SHIFT, shiftId })
  } catch (err) {
    console.error('Shifts Actions: Cannot remove shift =>', err)
    throw err
  } finally {
  }
}

export async function updateShifts(shifts: Shift[]): Promise<void> {
  try {
    const updateShifts = await shiftService.updateShifts(shifts)
    store.dispatch({ type: SET_SHIFTS, shifts: updateShifts })
  } catch (err) {
    console.error('Shifts Actions: Cannot Update Shifts =>', err)
    throw err
  }
}