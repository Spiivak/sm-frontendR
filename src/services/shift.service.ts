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

async function query() {
  const shifts = await storageService.query(STORAGE_KEY);
  if (!shifts) return [];

  // Sort shifts by date in descending order
  shifts.sort((a, b) => b.date.from - a.date.from);

  return shifts;
}
async function getById(shiftId: string) {
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
    } else {
      return storageService.post(STORAGE_KEY, shift)
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
  const now = Date.now();
  const eightHoursLater = now + 8 * 60 * 60 * 1000; // 8 hours later

  return {
    _id: '',
    type: '',
    date: {
      from: now,
      to: eightHoursLater,
    },
    time: {
      from: now,
      to: eightHoursLater,
      rate: 100,
    },
    hourlyRate: 29.96,
    tip: 0,
    removal: 0,
    note: '',
  }
}

async function _createShifts() {
  let shifts: Shift[] = utilService.loadFromStorage(STORAGE_KEY)
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()

  if (!shifts || !shifts.length) {
    shifts = []
    for (let i = 0; i < 10; i++) {
      shifts.push(
        _createShift({
          date: {
            from: _getRandomDate(currentMonth),
            to: _getRandomDate(currentMonth),
          },
          time:
          {
            from: _getRandomTime(),
            to: _getRandomTime(),
            rate: 100,
          }
          ,
          hourlyRate: 29.96,
          tip: 0,
          removal: 0,
          note: '',
        })
      )
    }

    await utilService.saveToStorage(STORAGE_KEY, shifts)
  }
}

function _createShift(options: Partial<Shift>): Shift {

  return {
    _id: options._id || utilService.makeId(),
    type: options.type || 'normal',
    date: options.date || { from: 0, to: 0 },
    time: options.time || { from: 0, to: 0, rate: 100 },
    hourlyRate: 29.96,
    tip: options.tip || 0,
    removal: options.removal || 0,
    note: options.note || '',
  }
}


interface DateRange {
  from: number
  to: number
}

interface TimeEntery {
  from: number
  to: number
  rate: number
}

export interface Shift {
  date: DateRange
  hourlyRate: number // ! MOVE TO JOB IN FUTURE
  type: string
  removal?: number
  time?: TimeEntery | undefined
  tip?: number
  _id?: string
  note?: string
}

interface Job {
  _id: string
  name: string
  description?: string
  shifts: Shift[]
}

function formatDate(timestamp: number): { day: string; month: string ;dayName: string } {
  const date = new Date(timestamp)
  const day = String(date.getDate()).padStart(2, '0') // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0') // Add leading zero if necessary
  return {
    day,
    month,
    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}


function extractTimeComponents(timeEntries: { from: number; to: number }[]): { fromHours: string[]; fromMinutes: string[]; toHours: string[]; toMinutes: string[] } {
  const fromHoursArr: string[] = []
  const fromMinutesArr: string[] = []
  const toHoursArr: string[] = []
  const toMinutesArr: string[] = []

  timeEntries.forEach(timeEntry => {
    let fromTime = new Date(timeEntry.from)
    let toTime = new Date(timeEntry.to)

    // Check if 'to' time is before 'from' time (for overnight shifts)
    if (toTime.getTime() < fromTime.getTime()) {
      // Adjust 'to' time to the next day
      toTime.setDate(toTime.getDate() + 1)
    }

    fromHoursArr.push(fromTime.getHours().toString().padStart(2, '0'))
    fromMinutesArr.push(fromTime.getMinutes().toString().padStart(2, '0'))
    toHoursArr.push(toTime.getHours().toString().padStart(2, '0'))
    toMinutesArr.push(toTime.getMinutes().toString().padStart(2, '0'))
  })

  return { fromHours: fromHoursArr, fromMinutes: fromMinutesArr, toHours: toHoursArr, toMinutes: toMinutesArr }
}


function isDateToday(date: Date): boolean {
  const today = new Date()
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

function calculateTotalHours(shift: Shift): string | undefined {
  if (!shift.time) return

  const fromTime = new Date(shift.time.from)
  const toTime = new Date(shift.time.to)

  // Check if 'to' time is before 'from' time (for overnight shifts)
  if (toTime.getTime() < fromTime.getTime()) {
    // Adjust 'to' time to the next day
    toTime.setDate(toTime.getDate() + 1)
  }

  const millisecondsDifference = toTime.getTime() - fromTime.getTime()
  const totalHours = Math.floor(millisecondsDifference / (1000 * 60 * 60)) // Total hours
  const totalMinutes = Math.floor((millisecondsDifference % (1000 * 60 * 60)) / (1000 * 60)) // Total minutes

  return `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`
}

function calculateTotalEarned(shift: Shift): number | undefined {
  if (!shift.time) return

  const fromTime = new Date(shift.time.from)
  const toTime = new Date(shift.time.to)

  // Check if 'to' time is before 'from' time (for overnight shifts)
  if (toTime.getTime() < fromTime.getTime()) {
    // Adjust 'to' time to the next day
    toTime.setDate(toTime.getDate() + 1)
  }

  const hoursWorked = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60)
  return hoursWorked * shift.hourlyRate
}


function _getRandomDate(month: number): number {
  // Get the current year
  const year = new Date().getFullYear()
  // Get the current month
  const currentMonth = new Date().getMonth()
  // Generate a random day within the month (1 to 28 for simplicity)
  let day = Math.floor(Math.random() * 28) + 1
  // If the current month is the provided month, ensure the day is not in the past
  if (month === currentMonth && day < new Date().getDate()) {
    day = new Date().getDate()
  }
  // Return the date as milliseconds since January 1, 1970
  return new Date(year, month, day).getTime()
}

function _getRandomTime(): number {
  // Generate a random time between 8:00 AM (28800000 milliseconds) and 8:00 PM (72000000 milliseconds)
  const startTime = 8 * 60 * 60 * 1000 // 8:00 AM in milliseconds
  const endTime = 20 * 60 * 60 * 1000 // 8:00 PM in milliseconds
  return Math.floor(Math.random() * (endTime - startTime + 1)) + startTime
}
