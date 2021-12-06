import React from 'react';
import { Loader } from "@progress/kendo-react-indicators";

const LoaderComponent = () => {

  return (
    <div>
      <Loader type={"converging-spinner"} />
    </div>
  );
};
export default LoaderComponent;
