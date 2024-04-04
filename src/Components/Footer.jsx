import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const companyName = "DilFoods";

  return (
    <footer className=" f-component">
      <div>
        <div className="">
          <div>
            <p >
              &copy; {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
          <div>
            <ul className="ul-items">
              <li>
                <a href="#" >
                  Home
                </a>
              </li>
              <li>
                <a href="#" >
                  About
                </a>
              </li>
              <li>
                <a href="#" >
                  Services
                </a>
              </li>
              <li>
                <a href="#" >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
