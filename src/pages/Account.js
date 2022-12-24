import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { blue, blueGrey, deepOrange, grey, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useTranslation } from "react-i18next";

import ReactExport from "react-export-excel-xlsx-fix";
import axios from "axios";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Account = () => {
  const [online, setOnline] = useState(0);
  const [cash, setCash] = useState(0);
  const [cheque, setCheque] = useState(0);
  const [total, setTotal] = useState(0);
  const { t } = useTranslation();

  // online
  useEffect(() => {
    axios.get("/receipt/get-online-amount").then((res) => {
      setOnline(res.data.Total_Amount);
      console.log(online);
    });
  }, []);

  // cash
  useEffect(() => {
    axios.get("/receipt/get-cash-amount").then((res) => {
      setCash(res.data.Total_Amount);
    });
  }, []);

  // cheque
  useEffect(() => {
    axios.get("/receipt/get-dd-amount").then((res) => {
      setCheque(res.data.Total_Amount);
    });
  }, []);

  // total
  useEffect(() => {
    axios.get("/receipt/get-total-amount").then((res) => {
      setTotal(res.data.Total_Amount);
    });
  }, []);

  // download
  useEffect(() => {
    axios
      .get("/receipt/download-receipts")
      .then((res) => console.log("download-receipts", res.data));
  }, []);

  // excel data
  const dataSet1 = [
    {
      description: "Online Earning",
      amount: online,
    },
    {
      description: "Cash Earning",
      amount: cash,
    },
    {
      description: "Cheque/DD Earning",
      amount: cheque,
    },
    {
      description: "Total Earning",
      amount: total,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "1fr 2fr", sm: "1fr" },
        alignItems: "stretch",
        gap: 3,
        my: 2,
      }}
    >
      <Card
        sx={{
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          borderRadius: "15px",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 18, fontWeight: "bold" }}
            color={grey[500]}
            gutterBottom
          >
            {t("total-earning")}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "600" }}
            color={blueGrey[700]}
            component="div"
          >
            &#8377; {total.toLocaleString("en-US")}
          </Typography>

          <ExcelFile
            filename="nira"
            element={
              <Button
                variant="contained"
                color="eighth"
                disableElevation
                sx={{ mt: 2, textTransform: "capitalize" }}
              >
                {t("download")}
              </Button>
            }
          >
            <ExcelSheet data={dataSet1} name="Account">
              <ExcelColumn label="Description" value="description" />
              <ExcelColumn label="Amount" value="amount" />
            </ExcelSheet>
          </ExcelFile>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" },
          alignItems: "stretch",
          gap: { sm: 0, xs: 3 },
          boxShadow: {
            sm: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            xs: "none",
          },
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Card
          className="account_card"
          sx={{
            boxShadow: {
              sm: "none",
              xs: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            },
            p: 2,
          }}
        >
          <CardContent>
            <IconButton
              size="large"
              color="third"
              sx={{
                background: blue[50],
                transition: ".3s ease",
                "&:hover": {
                  background: blue[50],
                },
                "&:active": {
                  boxShadow:
                    "rgb(0 0 0 / 31%) 0px 0px 1px 0px, rgb(0 0 0 / 25%) 0px 7px 16px -4px",
                },
              }}
            >
              <CreditCardOutlinedIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", my: 1 }}
              component="div"
            >
              &#8377; {online.toLocaleString("en-US")}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color={grey[500]}
              gutterBottom
            >
              {t("online-earning")}{" "}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="account_card"
          sx={{
            boxShadow: {
              sm: "none",
              xs: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            },
            p: 2,
          }}
        >
          <CardContent>
            <IconButton
              size="large"
              color="fourth"
              sx={{
                background: deepOrange[50],
                transition: ".3s ease",
                "&:hover": {
                  background: deepOrange[50],
                },
                "&:active": {
                  boxShadow:
                    "rgb(0 0 0 / 31%) 0px 0px 1px 0px, rgb(0 0 0 / 25%) 0px 7px 16px -4px",
                },
              }}
            >
              <CurrencyRupeeOutlinedIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", my: 1 }}
              component="div"
            >
              &#8377; {cash.toLocaleString("en-US")}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color={grey[500]}
              gutterBottom
            >
              {t("cash-earning")}{" "}
            </Typography>
          </CardContent>
        </Card>
        <Card
          className="account_card"
          sx={{
            boxShadow: {
              sm: "none",
              xs: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            },
            p: 2,
          }}
        >
          <CardContent>
            <IconButton
              size="large"
              color="fifth"
              sx={{
                background: yellow[50],
                transition: ".3s ease",
                "&:hover": {
                  background: yellow[50],
                },
                "&:active": {
                  boxShadow:
                    "rgb(0 0 0 / 31%) 0px 0px 1px 0px, rgb(0 0 0 / 25%) 0px 7px 16px -4px",
                },
              }}
            >
              <AccountBalanceOutlinedIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", my: 1 }}
              component="div"
            >
              &#8377; {cheque.toLocaleString("en-US")}
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color={grey[500]}
              gutterBottom
            >
              {t("chq-earning")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Account;
