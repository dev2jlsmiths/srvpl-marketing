import React from "react";
import ContentType from "./ContentType";
import Platforms from "./Platforms";
import Department from "./Department";
import Focus from "./Focus";
import SubDepartment from "./sub-department/SubDepartments";
import Designation from "./designation/Designation";

const Settings = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <ContentType />
      <Department />
      <Focus />
      <Platforms />
      <SubDepartment />
      <Designation />
    </div>
  );
};

export default Settings;
