import AppBottomNav from '../cmps/AppBottomNav'
import { IoIosCash } from 'react-icons/io'
import { LuBellRing } from 'react-icons/lu'
import { FaAngleDown, FaBus } from 'react-icons/fa'
import { PiClockCountdown } from 'react-icons/pi'
import { SlCalender } from 'react-icons/sl'
import { MdFreeBreakfast } from 'react-icons/md'
import { MdSick } from 'react-icons/md'
import { CiPercent } from 'react-icons/ci'
import { CiCircleMore } from 'react-icons/ci'

type Props = {}

const WorkIndex = (props: Props) => {
	return (
		<section className="work-index index">
			<div className="header flex space-between">
				<div className="actions">
					<CiCircleMore size={24} />
				</div>
				<div className="title flex align-center gap8">
					<FaAngleDown size={20}/>
					<h3>Job 1</h3>
				</div>
			</div>
			<main>
				<div className="cards">
					<div className="card">
						<div className="icon flex column">
							<div>
								<LuBellRing size={24} />
							</div>

							<span>Reminder</span>
						</div>
						<span className="label">Not active</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<IoIosCash size={24} />
							</div>
							<span>Hourly rate</span>
						</div>
						<span className="label">hourlyRate/hour</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<FaBus size={24} />
							</div>
							<span>Driving</span>
						</div>
						<span className="label">Not calculate</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<PiClockCountdown size={24} />
							</div>
							<span>Extra hours</span>
						</div>
						<span className="label">After 08:00 hours</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<SlCalender size={24} />
							</div>
							<span>Start of</span>
						</div>
						<span className="label">Start of month</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<MdFreeBreakfast size={24} />
							</div>
							<span>Breaks</span>
						</div>
						<span className="label">Not calculate</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<MdSick size={24} />
							</div>
							<span>Sick days</span>
						</div>
						<span className="label">50% of the second day</span>
					</div>
					<div className="card">
						<div className="icon">
							<div>
								<CiPercent size={24} />
							</div>
							<span>Rates</span>
						</div>
						{/* <span>Not active</span> */}
					</div>
				</div>
			</main>
			<AppBottomNav />
		</section>
	)
}

export default WorkIndex
