import "../App.css";
import logo from "../../public/dilFoods-logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <img src={logo} alt="DilFood Logo" />
        <div >
          <p>DilFoods</p>
        </div>
      </div>
    </>
  );
}
export default Navbar;
