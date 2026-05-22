import React from 'react'
import { FaCheck } from 'react-icons/fa6';

const StatusFilter = ({ onFilterUpdates, selectClass, curr_value }: any) => {
  const handleChange = (kind: string) => {
    if (onFilterUpdates) {
      onFilterUpdates(kind);
    }
  };

  return (
    ["Upcoming", "Past"].map((kind, index) => {
      return (
        <div key={index} className={`${selectClass} flex justify-between items-center`} onClick={() => handleChange(kind)}>
          <span>{kind}</span> {curr_value == kind && <span className='text-green-600'><FaCheck size={16} /></span>}
        </div>
      );
    })
  );
};

export default StatusFilter