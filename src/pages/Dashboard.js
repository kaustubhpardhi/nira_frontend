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

function Dashboard() {
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [total, setTotal] = useState(0);
  const [averageAmount, setAverageAmount] = useState(0);

  useEffect(() => {
    axios.get("/receipt/receipts-count").then((res) => {
      if (res.data) {
        const total = res.data.totalReceipts;
        setTotalReceipts(total);
      }
    });
  });
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

  return (
    <div className="dashboard">
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
    </div>
  );
}
export default Dashboard;
