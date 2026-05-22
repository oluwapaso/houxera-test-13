import React from 'react'
import { FaCheck } from 'react-icons/fa6';

const FilterTypes = ({ onFilterUpdates, selectClass, activeClass, curr_value }: any) => {
  const handleChange = (kind: string) => {
    if (onFilterUpdates) {
      onFilterUpdates(kind);
    }
  };

  return (
    ["All", "5 Star Review", "4 Star Review", "3 Star Review", "2 Star Review", "1 Star Review"].map((kind, index) => {
      return (
        <div key={index} className={`${selectClass} flex justify-between items-center`} onClick={() => handleChange(kind)}>
          <span>{kind}</span> {curr_value == kind && <span className='text-green-600'><FaCheck size={16} /></span>}
        </div>
      );
    })
  );
};

export default FilterTypes