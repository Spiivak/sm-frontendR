import { storageService } from "./async.storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY = 'shiftsDB'

export const shiftService = {
  query,
  save,
  remove,
  getById,
  updateShifts,
  getEmptyShift,
}

_createShifts()

 function query() {
  return storageService.query(STORAGE_KEY)
  // return httpService.get(PRODUCT_URL)
}

async function getById(shiftId: string){
  // return httpService.get(PRODUCT_URL + resourceId)
  return storageService.get(STORAGE_KEY, shiftId)
}

async function remove(shiftId: string) {
  return await storageService.remove(STORAGE_KEY, shiftId)
}

async function save(shift: Shift): Promise<Shift> {
  try {
    if (shift._id) {
      return storageService.put(STORAGE_KEY, shift)
      // await httpService.put(PRODUCT_URL, shift)
    } else {
      return storageService.post(STORAGE_KEY, shift)
      // await httpService.post(PRODUCT_URL, shift)
    }
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while saving the shift')
  }
}

function updateShifts(shifts: Shift[]) {
  return Promise.all(shifts.map(shift => storageService.post(STORAGE_KEY, shift)))
  // return httpService.put(PRODUCT_URL + 'resources/', resources)
}

function getEmptyShift(): Shift {
  return {
    _id: '',
    date: {
      from: 0,
      to: 0,
    },
    time: {
      from: 0,
      to: 0,
    },
    rate: 0,
    hourlyRate: 0,
    tip: 0,
    removal: 0,
    note: '',
  }
}

async function _createShifts() {
  let shifts: Shift[] = utilService.loadFromStorage(STORAGE_KEY);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  if (!shifts || !shifts.length) {
    shifts = [];
    for (let i = 0; i < 10; i++) {
      shifts.push(
        _createShift({
          date: {
            from: _getRandomDate(currentMonth),
            to: _getRandomDate(currentMonth),
          },
          time: {
            from: _getRandomTime(),
            to: _getRandomTime(),
          },
          rate: _getRandomRate(),
          tip: 0,
          removal: 0,
          note: '',
        })
      );
    }

    await utilService.saveToStorage(STORAGE_KEY, shifts);
  }
}

function _createShift(options: Partial<Shift>): Shift {
  
  return {
    _id: options._id || utilService.makeId(),
    date: options.date || { from: 0, to: 0 },
    time: options.time || { from: 0, to: 0 },
    hourlyRate: options.hourlyRate || 29.96,
    rate: options.rate || 100,
    tip: options.tip || 0,
    removal: options.removal || 0,
    note: options.note || '',
  };
}


interface DateRange {
  from: number;
  to: number;
}

interface TimeRange {
  from: number;
  to: number;
}

interface ShiftLeave {
  date: DateRange;
}

interface ShiftSickness {
  date: DateRange;
}

export interface Shift {
  _id: string
  date: DateRange
  time: TimeRange
  rate: number
  hourlyRate: number
  tip: number
  removal: number
  note: string
  shiftOff?: ShiftLeave
  shiftSick?: ShiftSickness
}

interface Job {
  _id: string
  name: string;
  shifts: Shift[];
}


function _getRandomJobName(): string {
  // Define an array of random job names
  const jobNames = ['audi', 'fiat', 'honda', 'suzuki'];
  // Generate a random index to select a job name from the array
  const randomIndex = Math.floor(Math.random() * jobNames.length);
  // Return the randomly selected job name
  return jobNames[randomIndex];
}

function _getRandomRate(): number {
  // Generate a random rate between 50 and 150
  return Math.floor(Math.random() * (150 - 50 + 1)) + 50;
}

function _getRandomDate(month: number): number {
  // Get the current year
  const year = new Date().getFullYear();
  // Generate a random day within the month (1 to 28 for simplicity)
  const day = Math.floor(Math.random() * 28) + 1;
  // Return the date as milliseconds since January 1, 1970
  return new Date(year, month, day).getTime();
}

function _getRandomTime(): number {
  // Generate a random time between 8:00 AM (28800000 milliseconds) and 8:00 PM (72000000 milliseconds)
  return Math.floor(Math.random() * (72000000 - 28800000 + 1)) + 28800000;
}
