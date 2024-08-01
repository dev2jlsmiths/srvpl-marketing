import React from "react";
import ContentType from "./ContentType";
import Platforms from "./Platforms";

const Settings = () => {
  return (
    <div className="flex gap-2">
      <ContentType />
      <Platforms />
    </div>
  );
};

export default Settings;
