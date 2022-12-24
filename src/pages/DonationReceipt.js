import React from "react";
import logo from "../images/bhsbs.png";
import watermark from "../images/watermark.png";
import moment from "moment";

import "./DonationReceipt.css";
class DonationReceipt extends React.Component {
  render() {
    const { information, forwardRef } = this.props;
    console.log(information);

    return (
      <div className="donation-receipt" ref={forwardRef}>
        <div className="receipt-head">
          <div className="receipt-head-logo">
            <img className="logo-img" src={logo} alt="" />
          </div>
          <div className="receipt-head-title">
            <div className="watermark">
              <img className="watermark-img" src={watermark} alt="" />
            </div>
            <div className="trust-title">
              <h2>BAHUJAN HITAY SAMAJIK BANDHILKI SANSTHA,PUNE</h2>
              <p className="trust-p">
                Regd office : Dr babasaheb ambedkar sanskrutik bhavan,Basement
                floor,Mangalwar peth,Maldhakka Pune 411011
              </p>
            </div>
          </div>
          <div className="receipt-head-footer">
            <p>
              No PNCIT(Exemp)/Tech/12AA/PuneRg/71/345/2016-17/3518 Date
              19-10-2016 Rg No: MH1272/2015-Pune PAN No : AACTB6420H. BHSBS has
              obtained tax exemption u/s80G(5)(VI) of Income Tax Act 1961.
            </p>
          </div>
        </div>
        <div class="line"></div>
        <div className="reg-details">
          <p className="main-p">Registration No: F-46355/P</p>
          <p className="main-p">PAN No: AACTB6420H</p>
        </div>

        <div className="receipt-heading">
          <h1>DONATION RECEIPT</h1>
        </div>
        <div className="receipt-details">
          <div>
            <p className="main-p">Receipt No :{information?.pawti}</p>
            <p className="main-p">Donor Email : {information?.email}</p>
          </div>
          <div>
            <p className="main-p">
              Date:{" "}
              {information.poojaDate
                ? moment(information.poojaDate).format("DD-MM-yyyy")
                : ""}{" "}
            </p>
          </div>
        </div>
        <div className="receipt-message">
          <h4>Received with Thanks From Ayu . {information?.name}</h4>
          <h4>Address: {information?.city}</h4>
        </div>
        <div className="watermark-div">
          <img className="img-watermark" src={watermark} alt="" />
        </div>
        <div className="additional-details">
          <p className="main-p">
            {" "}
            The Sum of Rs. {information?.amount} in donation towards{" "}
            {information?.forWhich}
          </p>
          <p className="main-p">Through {information?.payment} mode</p>
          <p className="main-p">Drawn on bank :</p>
          <p className="main-p">
            Having {information?.uidType}:{information?.uid}
          </p>
        </div>
        <div className="signature">
          <h4>Authorised Signatory</h4>
        </div>
        <div className="about">
          <h3> Bahujan hitay Samajik Bandhiki Sanstha </h3>
          <p>
            All Donations to Bahujan Hitay Samajik Bandhilki Sanstha (BHSBS) are
            exempted from Income Tax (U/s 80G) . Vide Order No.
            AACTB6420HF2022101 dated – 22/09/2022.All DONATIONS are accepted and
            can be credited to Bahujan Hitay Samajik Bandhilki Sanstha account
            in Bank of Maharashtra A/C No. 60234928821 IFCS code MAHB0001431
            *For Credit Card/Debit Card Mobile Donations, use our Website, if
            you are making donations directly through our TRUST or RTGS Please
            intimate us through email& call.
          </p>
        </div>
        <div className="core-activitties">
          <h3>Our Core Activities</h3>
          <p>
            Today Bahujan Hitay Sangh strategically transformed into Bahujan
            Hitay Samajik Bandhilki Sanstha Pune in September 2015. Its been
            great “Panchasutri” programme. It includes- 1. Dhamma Prachar and
            Prasar. <br />
            2. KG to PG Programme.
            <br /> 3. Woman Empowerment. <br />
            4. Banks/Credit Co-operative Societies.
            <br /> 5. Entrepreneurship Development/Industrial Clusters
            Development/Employment generation Programmes.
          </p>
        </div>
      </div>
    );
  }
}
export default DonationReceipt;
