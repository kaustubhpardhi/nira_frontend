import React, { useContext, useEffect, useState } from "react";
import Barchart from "./Barchart";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import {
  blue,
  blueGrey,
  deepOrange,
  green,
  grey,
  yellow,
} from "@mui/material/colors";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import "./Dashboard.css";
import axios from "axios";
import { CSVLink } from "react-csv";

function Dashboard() {
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [total, setTotal] = useState(0);
  const [averageAmount, setAverageAmount] = useState(0);
  const [originalReceipts, setOriginalReceipts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [poojaReceipts, setPoojaReceipts] = useState([]);
  const [shashwatReceipts, setShashwatReceipts] = useState([]);
  const [ornamentTotalValue, setOrnamentTotalValue] = useState([]);
  useEffect(() => {
    axios.get("/ornament/get-totalvalue").then((res) => {
      setOrnamentTotalValue(res.data.Total_Value);
    });
  }, []);
  useEffect(() => {
    axios.post("/receipt/get-receipt", {}).then((res) => {
      setOriginalReceipts(res.data.packages);
      setReceipts(res.data.packages);
    });
  }, []);
  useEffect(() => {
    axios.get("receipt/download-receipts").then((res) => {
      console.log(res.data);
      setPoojaReceipts(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/receipt/receipts-count").then((res) => {
      if (res.data) {
        const total = res.data.totalReceipts;
        setTotalReceipts(total);
      }
    });
  });
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    const filteredReceipts = poojaReceipts.filter(
      (receipt) =>
        receipt.purpose === "शाश्वत पूजा" &&
        receipt.poojaDate.slice(0, 10) === today
    );
    console.log(filteredReceipts);
    setShashwatReceipts(filteredReceipts);
  }, [poojaReceipts]);
  useEffect(() => {
    axios.get("/receipt/get-total-amount").then((res) => {
      setTotal(res.data.Total_Amount);
    });
  }, []);
  useEffect(() => {
    axios.get("/receipt/average-amount").then((res) => {
      const amount = Math.trunc(res.data.averageAmount);
      setAverageAmount(amount);
    });
  }, []);
  const today = new Date().toLocaleDateString();
  const dateArray = today.split("/");
  const day = dateArray[0].padStart(2, "0");
  const month = dateArray[1].padStart(2, "0");
  const year = new Date(dateArray[2]).getFullYear();

  const convertedDate = `${month}-${day}-${year}`;
  const dailyCollection = receipts
    .filter((obj) => obj.receiptDate === convertedDate)
    .reduce((total, obj) => total + obj.amount, 0);

  const headers = [
    { label: "Pre Acknowledge Number", key: "pawatiNumber" },
    { label: "Date", key: "receiptDate" },
    { label: "ID Code", key: "uidType" },
    { label: "Unique Identification Number ", key: "uid" },
    { label: "Section Code", key: "section" },
    { label: "Unique Registration Number", key: "urn" },
    { label: "Date of Issuance of Unique Registration Number", key: "urnDate" },
    { label: "Name of donor", key: "Name" },
    { label: "Address of donor", key: "address.city" },
    { label: "Donation Type", key: "donationType" },
    { label: "Mode of Receipt", key: "modeOfPayment.mode" },
    { label: "Amount of Donation(Indian Rupees)", key: "amount" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "mobileNumber " },
    { label: "Purpose of donation", key: "purpose" },
  ];
  const filename = "shashwatpooja";
  return (
    <div
      className="dashboard"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Total Receipts
          </Typography>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color={green[600]}
            gutterBottom
          >
            {totalReceipts}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Total Amount
          </Typography>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color={green[600]}
            gutterBottom
          >
            &#8377; {total}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Average Receipt Amount
          </Typography>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color={green[600]}
            gutterBottom
          >
            &#8377; {averageAmount}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Today's Collection Amount
          </Typography>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color={green[600]}
            gutterBottom
          >
            &#8377; {dailyCollection}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Today's Shashwat Pooja
          </Typography>
          <Button variant="contained" color="eighth" sx={{ height: "2rem" }}>
            <CSVLink
              headers={headers}
              data={shashwatReceipts}
              filename={filename}
              style={{ textDecoration: "#bc4749 ", color: "white" }}
            >
              Download
            </CSVLink>
          </Button>
        </CardContent>
      </Card>
      {/* <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
          mt: 2,
          width: "15rem",
          height: "10rem",
          className: "totalReceipts",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            Ornament's Total Value
          </Typography>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color={green[600]}
            gutterBottom
          >
            &#8377; {ornamentTotalValue}
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  );
}
export default Dashboard;
