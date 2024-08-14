import React from "react";
import TeamMembersTable from "./TeamMembersTable";
import BrandTable from "./BrandTable";

const TeamManager = () => {
  return (
    <div className="bg-gray-50 h-full pb-4">
        <div className="flex justify-between px-4">
            <div className="flex items-center">
            <h1 className="text-sm font-semibold">Team Name</h1>
            </div>
            <div className="">
                <button className="text-xs text-white bg-blue-800 px-4 py-1 rounded-sm">+Add Member</button>
            </div>
        </div>
        <div className="flex mx-4 gap-x-4">
            <div className="flex items-center">
                <h1 className="text-sm font-semibold">Team Manager</h1> 
            </div>
            <div className="max-w-xs rounded-lg shadow-lg p-4 bg-white flex flex-1 flex-col justify-start">
            <div className="text-start ">
              <h2 className="text-xs font-semibold text-gray-800">
                Lindsey Stroud
              </h2>
              <p className="text-xs text-gray-500">lindsey.stroud@gmail.com</p>
              <div className="flex">
                <span className="text-xs font-medium">Mobile No :</span>
                <span className="text-xs">+91 8250911714</span>
              </div>
            </div>
            </div>
        </div>
      <div className="mx-auto mt-2">
        <TeamMembersTable />
      </div>
      <div className="mx-auto mt-2 mb-4">
        <BrandTable />
      </div>
    </div>
  );
};

export default TeamManager;
