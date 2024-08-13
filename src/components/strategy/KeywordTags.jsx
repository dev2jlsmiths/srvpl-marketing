import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const KeywordTags = () => {
  const [tags, setTags] = useState([{ id: 1 }]); // Initialize with one tag input

  const addTag = () => {
    setTags([...tags, { id: tags.length + 1 }]); // Add a new tag input to the list
  };

  return (
    <div className="bg-gray-50 h-screen">
      {/* Other sections remain unchanged */}
      <div className="">
        <div className="bg-white p-2 mx-2">
          <div className="flex justify-center items-center bg-white p-2 mt-2">
            <label className="text-xs w-1/6 uppercase font-semibold">
              Google Search
            </label>
            <input
              type="text"
              className="border w-5/6 p-1 rounded bg-gray-50 placeholder:text-xs"
              placeholder="Google Search"
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-white p-2 mx-2">
          <div className="flex justify-center items-center bg-white p-2 mt-2">
            <label className="text-xs w-1/6 uppercase font-semibold">
              3rd Party
            </label>
            <input
              type="text"
              className="border w-5/6 p-1 rounded bg-gray-50 placeholder:text-xs"
              placeholder="3rd Party"
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-white p-2 mx-2">
          <div className="flex justify-center items-center bg-white p-2 mt-2">
            <label className="text-xs w-1/6 uppercase font-semibold">
              Marketplace Keywords
            </label>
            <input
              type="text"
              className="border w-5/6 p-1 rounded bg-gray-50 placeholder:text-xs"
              placeholder="Marketplace Keywords"
            />
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="bg-white mx-2 mt-2">
          <div className="flex justify-between border-b p-2">
            <h1 className="text-sm font-semibold">Tags</h1>
          </div>
          <div className="bg-white p-2 mx-2">
            {tags.map((tag, index) => (
              <div key={tag.id} className="flex bg-white p-2 mt-2 gap-x-2">
                <label className="text-xs w-1/6 uppercase font-semibold flex items-center">
                  Tag#{index + 1}
                </label>
                <div className="w-2/5 flex flex-col">
                  <label htmlFor="" className="text-xs italic ">
                    Target Audience
                  </label>
                  <input
                    className="border h-12 p-1 rounded bg-gray-50"
                    type="text"
                  />
                </div>
                <div className="w-5/6 flex flex-col">
                  <label
                    className="text-xs w-1/6 uppercase  flex items-center italic"
                    htmlFor=""
                  >
                    #Tags
                  </label>
                  <textarea
                    type="text"
                    className="border w-full p-1 rounded bg-gray-50 resize-none h-12"
                    placeholder=""
                  />
                </div>
                <div className="flex items-center">
                  <PlusCircle onClick={addTag} className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordTags;
