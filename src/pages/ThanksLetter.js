import React from "react";
import moment from "moment";
import logo from "../images/bhsbs.png";
import watermark from "../images/watermark.png";
import "./ThanksLetter.css";

class ThanksLetter extends React.Component {
  render() {
    const { information, forwardRef } = this.props;
    console.log(information);

    return (
      <div className="thanks-letter" ref={forwardRef}>
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
          <div className="line-thanks"></div>
        </div>
        <div className="thanks-reg-details">
          <p className="main-p">
            Ref - BHSBS/{" "}
            {information.poojaDate
              ? moment(information.poojaDate).format("DD-MM-yyyy")
              : ""}{" "}
          </p>
          <p className="main-p">
            Date :{" "}
            {information.poojaDate
              ? moment(information.poojaDate).format("DD-MM-yyyy")
              : ""}{" "}
          </p>
        </div>
        <div className="letter-content">
          <p>To,</p>
          <p className="main-p">{information?.name}</p>
          <p className="main-p">{information?.city}</p>
          <p className="main-p">{information?.email}</p>
          <h3>Sub : Donation to BHSBS Pune for {information?.forWhich}</h3>
          <p>Dear Sir/Madam,</p>
          <p>
            Bahujan Hitay Samajik Bandhilki Santha, Pune’s vision is to fulfill
            Bharat Ratna Dr. Bhimrao Ramji Ambedkar (Babasaheb) envision of a
            Prabuddha Samaj (Enlightened Society) based on the principles of
            dignity, justice, equality, freedom. Bahujan Hitay Samajik Bandhilki
            Sanstha is a national platform for the Bahujan of India. BHSBS is
            committed to an inclusive, progressive, secular, democratic, and
            non-sectarian society. BHSBS is a membership-based platform. Its
            membership is open to all persons working for the Scheduled Castes,
            Scheduled Tribes, Minorities, and other socially excluded sections
            of Indian society. Thanking your valuable donation of Rs.{" "}
            {information?.amount} for DVMP PROJECT/ SOVENIOR / DHAMMAPADA/ DVR
            Any number of suitable installments for Souvenir Pages or Dhammapada
            pages would be fine as long as dana is offered with pious volition.
            No goods or services of any value were or will be transferred to you
            in connection to this donation. Please keep this written
            acknowledgment of your donation for your tax records.{" "}
          </p>
          <h4>Once again thank you for your generous donation.</h4>
          <h4>Thanks and Regards </h4>
          <h4>Mr.M.T.KAMBLE</h4>
        </div>
        <br></br>
        <div className="chairman-details">
          <h4>Chairman</h4>
          <p>
            Encl: 1. Original Receipt, 2. 80 G / 35 AC Certificate Note:
            Donations to BHSBS are eligible for 50 % tax rebate (U/S 80 G) / 100
            % tax rebate (U/S 35 AC) *Please Mention your Donor ID for further
            Communication *Please note this is computer generated print
          </p>
        </div>
      </div>
    );
  }
}

export default ThanksLetter;
