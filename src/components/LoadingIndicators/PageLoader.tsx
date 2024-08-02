import React from "react";
import Spinner from "./Spinner";
const PageLoader: React.FC = () => (
  <div className="flex justify-center w-full min-h-[50vh] items-center">
    <Spinner width={80} textColorClassName="text-coinage-blue" />
  </div>
);

export default PageLoader;
