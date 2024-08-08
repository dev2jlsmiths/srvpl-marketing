import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AddStrategy = () => {
    const {brandid} = useParams();
    const [contentTypes, setContentTypes] = useState([]);
    const navigate = useNavigate()

    const accessToken = localStorage.getItem("access_token");
  
  return (
    <div className="w-72 h-72 bg-white rounded-xl overflow-hidden border border-gray-300 relative">
    <div className="relative h-full">
      <div className="absolute top-0 w-full h-15 bg-white rounded-t-xl border-b border-gray-300"></div>
      <div className="absolute top-4 left-4 font-semibold text-sm text-gray-800">
        Strategy
      </div>
      <button
        className="absolute top-3 right-4 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs"
        onClick={() => navigate(`/strategy/${brandid}`)}
       
      >
        + Add Strategy
      </button>
      <div className="flex flex-col gap-1 absolute top-16 left-0 w-full px-4">
      
       
          <div className="text-center text-gray-500">No Strategy available.</div>
       
      </div>
    </div>
  </div>
  )
}

export default AddStrategy