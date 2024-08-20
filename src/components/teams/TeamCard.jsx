import React, { useState } from "react";
import AvatarGroup from "./AvatarGroup";
import AddMemberModal from "./AddMemberModal";
import { useNavigate } from "react-router-dom";

const TeamCard = ({team}) => {
  const {team_name, team_desc} = team
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
    
  const handleAddTeams = () => {
      setShowModal(true);
  }
  const handleClose =()=>{
      setShowModal(false);
  }
  return (
    <div>
      <div className="max-w-xs rounded-lg shadow-lg p-4 bg-white flex flex-col justify-start ">
        {/* Image Section */}
        <div className="flex justify-between" >
          <div className="flex flex-col" onClick={() => router(`/team/teams/team-profile`)}>
            <h1 className="text-sm font-semibold">{team_name}</h1>
            <p className="text-xs font-medium text-gray-400">23 Employees</p>
          </div>
          <div className="flex space-x-2 items-center">
            <AvatarGroup />
            <button
              type="button"
              className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-100 bg-gray-100 text-blue-500 hover:bg-gray-100 focus:outline-none"
              onClick={handleAddTeams}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <AddMemberModal 
          onClose={handleClose}
        />
      )}

      {/* Divider */}
    </div>
  );
};

export default TeamCard;
