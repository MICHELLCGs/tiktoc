import { useState } from 'react';
import Header from '../Header/Header';
import ElementLeft from '../Left/ElementLeft';
import ElementRight from '../Right/ElementRight';

const DisplayUserInvalidate = () => {
  const [verify, setVerify] = useState(true);
  return verify ? (
    <>
      <Header />
      <div className="wrap-index-element container">
        <ElementLeft />
        <ElementRight />
      </div>
    </>
  ) : (
    <div>no</div>
  );
};

export const LayoutDisplayUserInvalidate = ({ children }) => {
  return <>{children}</>;
};

export default DisplayUserInvalidate;
