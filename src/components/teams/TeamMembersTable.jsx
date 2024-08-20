import React from "react";

const TeamMembersTable = ({ members }) => {
  return (
    <div>
      <div className="relative px-4">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-200 text-xs font-normal rounded-xl">
            <tr>
              <th scope="col" className="px-2 py-3 whitespace-nowrap rounded-tl-xl">
                Sl No
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Employee ID
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Employee's Name
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Department
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Sub Department
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Designation
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Email
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap">
                Reporting To
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap rounded-tr-xl">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((item, index) => (
                <tr key={item.member._id} className="border-b">
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{index + 1}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{item.member.emp_id}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{item.member.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {item.member.department}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {item.member.sub_department}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {item.member.designation}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{item.member.email}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{item.reporting.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {item.member.phone}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  No team members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMembersTable;
