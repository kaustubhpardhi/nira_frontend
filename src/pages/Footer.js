import "./Footer.css";
import skitech from "../images/skitech.png";
function Footer() {
  return (
    <div className="footer">
      <p>Powered by </p>
      <img src={skitech} className="skitech" alt="logo" />
      <p>SKITECH NETCORP</p>
    </div>
  );
}
export default Footer;
