import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import { CSVLink } from "react-csv";
const DownloadExcelButton = () => {
  const filename = "receipts";
  const [ReceiptsData, setReceiptsData] = useState([]);
  const [loading, setLoading] = useState([]);

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
  const { t } = useTranslation();

  useEffect(() => {
    getReceiptsData();
  }, []);

  const getReceiptsData = () => {
    setLoading(true);
    axios
      .get("/receipt/download-receipts")
      .then((res) => {
        console.log(res.data);
        setReceiptsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <h2>{t("excel-tagline")} </h2>
      </div>
      <div>
        <Button variant="contained" color="eighth">
          <CSVLink
            headers={headers}
            data={ReceiptsData}
            filename={filename}
            style={{ textDecoration: "#bc4749 ", color: "white" }}
          >
            {t("download-excel")}
          </CSVLink>
        </Button>
      </div>
    </div>
  );
};

export default DownloadExcelButton;
