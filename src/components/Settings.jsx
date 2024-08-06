import React from "react";
import ContentType from "./ContentType";
import Platforms from "./Platforms";
import Department from "./Department";
import Focus from "./Focus";

const Settings = () => {
  return (
    <div className="flex gap-2">
      <ContentType />
      <Department />
      <Focus />
      <Platforms />
    </div>
  );
};

export default Settings;
