import React, { useState } from 'react'
import AddPeopleModal from './AddPeopleModal';
import EmployeeCard from './EmployeeCard';

const People = () => {
    const [showModal, setShowModal] = useState(false);
    
    const handleAddPeople = () => {
        setShowModal(true);
    }
    const handleClose =()=>{
        setShowModal(false);
    }


  return (
    <div className='w-full bg-gray-100 h-screen p-2'>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className='text-sm font-bold'>People</h1>
                <p className='text-xs'>Here is a list of people</p>
            </div>
            <div className="" onClick={() => handleAddPeople()}>
                <button className=' px-3 py-1 text-white bg-blue-700 rounded-md text-xs'>+Add people</button>
            </div>
            {
                showModal && (
                <AddPeopleModal 
                onClose={handleClose}
                />
                )
            }
        </div>
        <div className="mt-2">
            <EmployeeCard />
        </div>
    </div>
  )
}

export default People