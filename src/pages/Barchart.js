import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

const Barchart = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonationsData();
  }, []);

  const getDonationsData = () => {
    axios
      .get("/receipt/donations")
      .then((res) => {
        console.log(res);
        setDonations(res);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return <div>{donations}</div>;
};

export default Barchart;
