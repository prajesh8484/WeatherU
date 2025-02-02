import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="foo">
        <div className="bottom-text">
          <p>Made by </p>
          <a
            href="https://github.com/prajesh8484"
            target="_blank"
            className="made-with"
          >
            <p>
              <b>Prajesh Gaikwad </b>
            </p>
          </a>
          <p>
            <b> · </b> Open sourced on
          </p>
          <a
            href="https://github.com/prajesh8484/WeatherU"
            target="_blank"
            className="made-with"
          >
            <p>
              <b>Gituhb</b>
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
