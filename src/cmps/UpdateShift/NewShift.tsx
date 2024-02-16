import { useEffect, useState } from 'react'
import { EnteryIcon, ExitIcon, RatesIcon, RemovalIcon, TipIcon } from '../Icons'
import { Shift, shiftService } from '../../services/shift.service'
import { useForm } from '../../customHooks/useForm'

interface Props {
  shift: Shift
}

export default function NewShift({ shift }: Props) {
  const [editedField, setEditedField] = useState<string | null>(null)
  const [fields, setFields, handleChange] = useForm(shiftService.getEmptyShift())


  async function handleUpdateShift() {
    if (!shift) return

    const updatedShift = {
      ...shift!,
      time: fields.time,
      type: 'normal',
      date: fields.date,
      tip: +fields.tip,
      removal: +fields.removal,
      rate: +fields.time.rate || 100,
      note: fields.note
    }
    
    console.log('handleUpdateShift  updatedShift:', updatedShift)
    try {
      setEditedField(null)
      return await shiftService.save(updatedShift)
    } catch (error) {
      console.error('Error saving shift:', error)
    }
  }

  const handleEditField = (field: string) => {
    setEditedField(field)
  }

  if (!shift) return <div>Loading...</div>

  const { fromHours, fromMinutes, toHours, toMinutes } = fields.time
  ? shiftService.extractTimeComponents([fields.time])
  : { fromHours: [], fromMinutes: [], toHours: [], toMinutes: [] }


  const { day: fromDay, month: fromMonth } = shiftService.formatDate(fields.date.from)
  const { day: toDay, month: toMonth } = shiftService.formatDate(fields.date.to)

  return (
    <section className='new-shift' >
      <div className="actions">
        <div className="action entery flex align-center space-between shift-card">
          <div className="placeholder flex align-center gap8">
            <EnteryIcon />
            <span>Entery</span>
          </div>
          <form className="entery-edit" onSubmit={() => handleUpdateShift()} >
            {editedField === 'entry' ? (
              <div className="flex gap8">
                <input
                  type="time"
                  name="from"
                  defaultValue={`${fromHours}:${fromMinutes}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
                <input
                  type="date"
                  name="from"
                  defaultValue={`${new Date().getFullYear()}-${fromMonth}-${fromDay}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
              </div>
            ) : (
              <div className='flex column align-center' onClick={() => handleEditField('entry')}>
                <span className='time'>{`${fromHours}:${fromMinutes}`}</span>
                <span className='date'>{fromDay}/{fromMonth}</span>
              </div>
            )}
          </form>
        </div>
        <div className="action exit flex space-between align-center shift-card">
          <div className="placeholder flex align-center gap8">
            <ExitIcon />
            <span>Exit</span>
          </div>
          <form>
            {editedField === 'exit' ? (
              <div className="flex gap8">
                <input
                  type="time"
                  name="to"
                  defaultValue={`${toHours}:${toMinutes}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
                <input
                  type="date"
                  name="to"
                  defaultValue={`${new Date().getFullYear()}-${toMonth}-${toDay}`}
                  onChange={handleChange}
                  onBlur={handleUpdateShift}
                />
              </div>
            ) : (
              <div className='flex column align-center' onClick={() => handleEditField('exit')}>
                <span className='time'>{`${toHours}:${toMinutes}`}</span>
                <span className='date'>{toDay}/{toMonth}</span>
              </div>
            )}
          </form>
        </div>
        <div className="action rates flex space-between align-center shift-card">
          <div className="placeholder flex align-center gap8">
            <RatesIcon />
            <span>Rates</span>
          </div>
          {editedField === 'rates' ? (
            <input
              type="number"
              defaultValue={shift.time?.rate || 0}
              name="rate"
              onChange={handleChange}
              onBlur={handleUpdateShift}
            />
          ) : (
            <span onClick={() => handleEditField('rates')}>{fields.time?.rate}%</span>
          )}
        </div>
        <div className="action tips flex space-between align-center shift-card">
          <div className="placeholder flex align-center gap8 ">
            <TipIcon />
            <span>Tip</span>
          </div>
          {editedField === 'tip' ? (
            <input
              type="number"
              defaultValue={fields.tip || 0}
              name="tip"
              onChange={handleChange}
              onBlur={handleUpdateShift}
            />
          ) : (
            <span onClick={() => handleEditField('tip')}>{fields.tip}</span>
          )}
        </div>
        <div className="action removal flex space-between align-center shift-card">
          <div className="placeholder flex align-center gap8">
            <RemovalIcon />
            <span>Removal</span>
          </div>
          {editedField === 'removal' ? (
            <input
              type="number"
              defaultValue={fields.removal}
              name="removal"
              onChange={handleChange}
              onBlur={handleUpdateShift}
            />
          ) : (
            <span onClick={() => handleEditField('removal')}>{fields.removal}</span>
          )}
        </div>
      </div>
      <div className="note">
        <textarea name="note" id="note" cols={30} rows={10} defaultValue={fields.note || ''} onChange={handleChange} onBlur={handleUpdateShift} placeholder='Something that important to remember?' />
      </div>
    </section>
  )
}
