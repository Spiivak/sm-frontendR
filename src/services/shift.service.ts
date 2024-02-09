import { storageService } from "./async.storage.service"

const KEY = 'shifts'

export const shiftService = {
    query,
    get,
    remove,
    save,
    getEmptyShift,
}

_createDefaultShifts()

async function query() {
    var shifts: any = await storageService.query(KEY)

    console.log(shifts)
    if (!shifts || !shifts.length) {
        shifts = _createDefaultShifts()
        await storageService.post(KEY, shifts)
    }
    return shifts
}

async function get(id:string) {
    return await storageService.get(KEY, id)
}

async function remove(id:string) {
    return await storageService.remove(KEY, id)
}

async function save(shift: any): Promise<any> {
    if (shift._id) return await storageService.put(KEY, shift)
    else return await storageService.post(KEY, shift)
}

function getEmptyShift() {
    return {
        vendor: '',
        speed: 0,
    }
}

function _createDefaultShifts(): Shift[] {
    const shifts: Shift[] = [];
    const month = new Date().getMonth(); // Get the current month

    // Create 4 random shifts for demonstration purposes
    for (let i = 0; i < 4; i++) {
        // Generate random job name and rate
        const jobName = _getRandomJobName();
        const rate = _getRandomRate();

        // Generate random dates within the same month
        const fromDate = _getRandomDate(month);
        const toDate = _getRandomDate(month);

        const shift: Shift = {
            _id: '',
            date: {
                from: fromDate,
                to: toDate,
            },
            time: {
                from: 0,
                to: 0,
            },
            rate: rate,
            tip: 0,
            removal: 0,
            note: '',
        };

        shifts.push(shift);
    }

    return shifts;
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
    _id: string,
    date: DateRange;
    time: TimeRange;
    rate: number;
    tip: number;
    removal: number;
    note: string;
    shiftOff?: ShiftLeave;
    shiftSick?: ShiftSickness;
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