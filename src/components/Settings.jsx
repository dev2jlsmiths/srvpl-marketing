import React from "react";
import ContentType from "./ContentType";
import Platforms from "./Platforms";
import Department from "./Department";

const Settings = () => {
  return (
    <div className="flex gap-2">
      <ContentType />
      <Platforms />
      <Department />
    </div>
  );
};

export default Settings;
