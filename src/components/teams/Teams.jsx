import React, { useState } from 'react'
import AddTeamModal from './AddTeamModal';
import TeamCard from './TeamCard';


const Teams = () => {
    const [showModal, setShowModal] = useState(false);
    
    const handleAddTeams = () => {
        setShowModal(true);
    }
    const handleClose =()=>{
        setShowModal(false);
    }


  return (
    <div className='w-full bg-gray-100 h-screen p-2'>
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h1 className='text-sm font-bold'>Teams</h1>
                <p className='text-xs'>Here is a list of Teams</p>
            </div>
            <div className="" onClick={() => handleAddTeams()}>
                <button className=' px-3 py-1 text-white bg-blue-700 rounded-md text-xs'>+Add Teams</button>
            </div>
            {
                showModal && (
                <AddTeamModal 
                onClose={handleClose}
                />
                )
            }
        </div>
        <div className="mt-2">
        <TeamCard />
        </div>
    </div>
  )
}

export default Teams