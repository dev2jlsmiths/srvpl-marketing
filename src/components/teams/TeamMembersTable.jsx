import React from "react";

const TeamMembersTable = () => {
  // Dummy data for the table
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      department: "Engineering",
      subDepartment: "Frontend",
      designation: "Senior Developer",
      email: "johndoe@example.com",
      mobile: "+1 234 567 8901",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Marketing",
      subDepartment: "Content",
      designation: "Content Writer",
      email: "janesmith@example.com",
      mobile: "+1 987 654 3210",
    },
    {
      id: 3,
      name: "Alice Johnson",
      department: "HR",
      subDepartment: "Recruitment",
      designation: "HR Manager",
      email: "alicejohnson@example.com",
      mobile: "+1 555 123 4567",
    },
  ];

  return (
    <div>
      <div className="relative px-4">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-200 text-xs font-normal  rounded-xl">
            <tr>
              <th scope="col" className="px-2 py-3 whitespace-nowrap rounded-tl-xl">
                Sl No
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
              <th scope="col" className="px-2 py-3 whitespace-nowrap rounded-tr-xl">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <tr key={member.id} className="border-b">
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{index + 1}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{member.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {member.department}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {member.subDepartment}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {member.designation}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">{member.email}</td>
                  <td className="px-2 py-3 whitespace-nowrap bg-white">
                    {member.mobile}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  No customers found
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
