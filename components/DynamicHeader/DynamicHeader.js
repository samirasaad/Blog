import { useState } from "react";
import { headerInfo } from "../../utils/dataSource";
import DynamicHeaderStyles from "./DynamicHeader.module.scss";

const DynamicHeader = () => {
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * (4 - 0 + 1)) + 0
  );

  return (
    <section className=" row align-items-center">
      <div className={`col-lg-12 px-0 ${DynamicHeaderStyles.background}`}></div>
      <div className="col-lg-12 px-3 my-3 text-center">
        <h1>
          <q>{`${headerInfo[randomIndex].text}`}</q>
        </h1>
        <h3 className="font-weight-bold">{`--${headerInfo[randomIndex].author}`}</h3>
      </div>
    </section>
  );
};

export default DynamicHeader;
