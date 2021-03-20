import React, { useEffect, useState } from "react";
import { headerInfo } from "../../utils/dataSource";

const DynamicHeader = () => {
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * (4 - 0 + 1)) + 0
  );

  return (
    <section className=" row align-items-center">
      <div className="col-lg-8 px-0 ">
        <img
          src="/assets/images/headers.jpg"
          alt="header"
          style={{ width: "100%", borderRadius:'10em' }}
        />
      </div>
      <div className="col-lg-4 px-3 my-3">
        <h1>
          <q>{`${headerInfo[randomIndex].text}`}</q>
        </h1>
        <h3 className="font-weight-bold">{`--${headerInfo[randomIndex].author}`}</h3>
      </div>
    </section>
  );
};

export default DynamicHeader;
