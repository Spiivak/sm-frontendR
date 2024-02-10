import React, { useEffect, useState } from 'react';
import { EnteryIcon, ExitIcon, RatesIcon, RemovalIcon, TipIcon } from '../Icons';
import { useParams } from 'react-router-dom';
import { Shift, shiftService } from '../../services/shift.service';

export default function NewShift() {
  const { shiftId } = useParams<{ shiftId: string }>();
  const [shift, setShift] = useState<Shift | null>(null);
  const [isEditingEntry, setIsEditingEntry] = useState(false);
  const [isEditingExit, setIsEditingExit] = useState(false);

  useEffect(() => {
    loadShift();
  }, [shiftId]);

  const loadShift = async () => {
    if (!shiftId) return;
    try {
      const shiftData = await shiftService.getById(shiftId);
      // Check if shiftData.times is undefined and set it to an array containing the current time if it is
      if (!shiftData.times) {
        shiftData.times = [{ from: Date.now(), to: Date.now() }];
      }
      setShift(shiftData);
    } catch (error) {
      console.error('Error loading shift:', error);
    }
  };

  const handleEditEntry = () => {
    setIsEditingEntry(true);
  };

  const handleEditExit = () => {
    setIsEditingExit(true);
  };

  const handleSaveEntry = (newTime: string) => {
    // Perform save operation for entry time
    setIsEditingEntry(false);
  };

  const handleSaveExit = (newTime: string) => {
    // Perform save operation for exit time
    setIsEditingExit(false);
  };

  if (!shift) return <div>Loading...</div>;

  const { fromHours, fromMinutes, toHours, toMinutes } = shiftService.extractTimeComponents(shift.times);

  return (
    <section className='new-shift'>
      <div className="actions">
        <div className="action entery flex align-center space-between">
          <div className="placeholder flex align-center gap8">
            <EnteryIcon />
            <span>
              Entery
            </span>
          </div>
          <div className="entery-edit">
            {isEditingEntry ? (
              <TimePicker initialValue={`${fromHours[0]}:${fromMinutes[0]}`} onSave={handleSaveEntry} onCancel={() => setIsEditingEntry(false)} />
              ) : (
                <span className='time' onClick={handleEditEntry}>{`${fromHours[0]}:${fromMinutes[0]}`}</span>
                )}
          </div>
        </div>
        <div className="action exit flex space-between align-center">
          <div className="placeholder flex align-center gap8">
            <ExitIcon />
            <span>Exit</span>
          </div>
          <div className="exit-edit">
            {isEditingExit ? (
              <TimePicker initialValue={`${toHours[0]}:${toMinutes[0]}`} onSave={handleSaveExit} onCancel={() => setIsEditingExit(false)} />
              ) : (
                <span className='time' onClick={handleEditExit}>{`${toHours[0]}:${toMinutes[0]}`}</span>
              )}
          </div>
        </div>
        <div className="action rates flex space-between align-center">
          <div className="placeholder flex align-center gap8">
            <RatesIcon />
            <span>Rates</span>
          </div>
          <div className="rates">
            <span>{shift.rate}</span>
          </div>
        </div>
        <div className="action tips flex space-between align-center">
          <div className="placeholder flex align-center gap8">
            <TipIcon />
            <span>Tip</span>
          </div>
          <div className="tip">
            <span>{shift.tip}</span>
          </div>
        </div>
        <div className="action removal flex space-between align-center">
          <div className="placeholder flex align-center gap8">
            <RemovalIcon />
            <span>Removal</span>
          </div>
          <div className="exit-edit">
            <span>{shift.removal}</span>
          </div>
        </div>
      </div>
      <div className="note">
        <textarea name="" id="" cols={30} rows={10} placeholder='Something that important to remember?'></textarea>
      </div>
    </section>
  );
}

interface TimePickerProps {
  initialValue: string;
  onSave: (newTime: string) => void;
  onCancel: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ initialValue, onSave, onCancel }) => {
  const [time, setTime] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleSave = () => {
    onSave(time);
  };

  return (
    <div>
      <input type="time" value={time} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
