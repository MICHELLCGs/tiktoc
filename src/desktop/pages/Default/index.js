import Header from "./Header/Header";
import ElementRight from "./Right/ElementRight";
import ElementLeft from "./Left/ElementLeft";

import "./index.scss";

function Default({ children }) {
  return (
    <>
      <Header />
      <div className="wrap-index-element">
        <ElementLeft className="left" />
        <ElementRight className="right" />
      </div>
      {children}
    </>
  );
}

export default Default;
