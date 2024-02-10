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
  calculateTotalHours,
  calculateTotalEarned,
  isDateToday,
  extractTimeComponents,
  formatDate
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
      from: Date.now(),
      to: Date.now(),
    },
    times: [
     { from: Date.now(),
      to: Date.now(),
      rate: 100,}
    ],
    rate: 100,
    hourlyRate: 29.96,
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
          times: [
            {
            from: _getRandomTime(),
            to: _getRandomTime(),
            rate: 100,
          }
        ],
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
    times: options.times || [],
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

interface TimeEntery {
  from: number;
  to: number;
  rate: number;
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
  times: TimeEntery[]
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

function formatDate(timestamp: number): { day: number; month: number; dayName: string } {
  const date = new Date(timestamp);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
  };
}

function extractTimeComponents(timeEntries: { from: number; to: number }[]): { fromHours: string[]; fromMinutes: string[]; toHours: string[]; toMinutes: string[] } {
  const fromHoursArr: string[] = [];
  const fromMinutesArr: string[] = [];
  const toHoursArr: string[] = [];
  const toMinutesArr: string[] = [];

  timeEntries.forEach(timeEntry => {
    let fromTime = new Date(timeEntry.from);
    let toTime = new Date(timeEntry.to);

    if (toTime.getTime() < fromTime.getTime()) {
      const tempTime = fromTime;
      fromTime = toTime;
      toTime = tempTime;
    }

    fromHoursArr.push(fromTime.getHours().toString().padStart(2, '0'));
    fromMinutesArr.push(fromTime.getMinutes().toString().padStart(2, '0'));
    toHoursArr.push(toTime.getHours().toString().padStart(2, '0'));
    toMinutesArr.push(toTime.getMinutes().toString().padStart(2, '0'));
  });

  return { fromHours: fromHoursArr, fromMinutes: fromMinutesArr, toHours: toHoursArr, toMinutes: toMinutesArr };
}

function isDateToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

function calculateTotalHours(shift: Shift): number {
  let totalHours = 0;
  shift.times.forEach(timeEntry => {
    let fromTime = new Date(timeEntry.from);
    let toTime = new Date(timeEntry.to);
    if (toTime.getTime() < fromTime.getTime()) {
      const tempTime = fromTime;
      fromTime = toTime;
      toTime = tempTime;
    }
    totalHours += (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);
  });
  return totalHours;
}

function calculateTotalEarned(shift: Shift): number {
  return shift.times.reduce((total, timeEntry) => {
    let fromTime = new Date(timeEntry.from);
    let toTime = new Date(timeEntry.to);
    if (toTime.getTime() < fromTime.getTime()) {
      const tempTime = fromTime;
      fromTime = toTime;
      toTime = tempTime;
    }
    const hoursWorked = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60);
    return total + hoursWorked * shift.hourlyRate;
  }, 0);
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
  // Get the current month
  const currentMonth = new Date().getMonth();
  // Generate a random day within the month (1 to 28 for simplicity)
  let day = Math.floor(Math.random() * 28) + 1;
  // If the current month is the provided month, ensure the day is not in the past
  if (month === currentMonth && day < new Date().getDate()) {
    day = new Date().getDate();
  }
  // Return the date as milliseconds since January 1, 1970
  return new Date(year, month, day).getTime();
}

function _getRandomTime(): number {
  // Generate a random time between 8:00 AM (28800000 milliseconds) and 8:00 PM (72000000 milliseconds)
  const startTime = 8 * 60 * 60 * 1000; // 8:00 AM in milliseconds
  const endTime = 20 * 60 * 60 * 1000; // 8:00 PM in milliseconds
  return Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
}
