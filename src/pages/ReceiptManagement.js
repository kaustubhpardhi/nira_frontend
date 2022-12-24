import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ReactToPdf from "react-to-pdf";
import axios from "axios";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ReactToPrint from "react-to-print";
import PdfBody from "./PdfBody";
import DonationReceipt from "./DonationReceipt";
import PrintIcon from "@mui/icons-material/Print";
import { useTranslation } from "react-i18next";

const ReceiptManagement = () => {
  let pdfRef = React.createRef();
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState([]);
  const [receiptsSelected, setReceiptsSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // const [user] = useState({ role: 'user' })
  const [user] = useState({ role: "admin" });

  // effects
  useEffect(() => {
    axios.post("/receipt/get-receipt", {}).then((res) => {
      console.log(res.data.packages);
      setReceipts(res.data.packages);
      setLoading(false);
    });
  }, []);

  const pdfDownloadHandler = (receipt) => {
    const {
      pawatiNumber,
      Name,
      poojaDate,
      receiptDate,
      mobileNumber,
      email,
      purpose,
      amount,
      address,
      modeOfPayment,
      gotra,
      day,
      month,
    } = receipt;
    const information = {
      pawti: pawatiNumber,
      name: Name,
      poojaDate,
      receiptDate,
      mobile: mobileNumber,
      email,
      forWhich: purpose,
      amount,
      payment: !!modeOfPayment ? "Offline" : "Online",
      method: !!modeOfPayment
        ? !!modeOfPayment.ChequeDD
          ? "ChequeDD"
          : "Cash"
        : "",
      state: address?.state,
      district: address?.district,
      city: address?.city,
      pin: address?.pinCode,
      bank: modeOfPayment?.ChequeDetail?.bankName,
      branch: modeOfPayment?.ChequeDetail?.bankBranch,
      cheque: modeOfPayment?.ChequeDetail?.chequeNumber,
      chequeDate: modeOfPayment?.ChequeDetail?.chequeDate,
      gotra,
      day,
      month,
    };
    setReceiptsSelected(information);
  };

  const pdfViewHandler = (receipt) => {
    const {
      pawatiNumber,
      Name,
      poojaDate,
      mobileNumber,
      email,
      purpose,
      amount,
      address,
      modeOfPayment,
      receiptDate,
      gotra,
      day,
      month,
    } = receipt;
    const information = {
      pawti: pawatiNumber,
      name: Name,
      poojaDate,
      mobile: mobileNumber,
      email,
      forWhich: purpose,
      amount,
      payment: !!modeOfPayment ? "Offline" : "Online",
      method: !!modeOfPayment
        ? modeOfPayment.ChequeDD
          ? "ChequeDD"
          : "Cash"
        : "",
      state: address?.state,
      district: address?.district,
      city: address?.city,
      pin: address?.pinCode,
      bank: modeOfPayment?.ChequeDetail?.bankName,
      branch: modeOfPayment?.ChequeDetail?.bankBranch,
      cheque: modeOfPayment?.ChequeDetail?.chequeNumber,
      chequeDate: modeOfPayment?.ChequeDetail?.chequeDate,
      receiptDate,
      gotra,
      day,
      month,
    };
    navigate("/generate-receipt", { state: information });
  };

  if (loading) {
    return (
      <div className="screenCenter">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"> {t("receipt")} </TableCell>
                <TableCell align="center"> {t("name")}</TableCell>
                <TableCell align="center"> {t("purpose")} </TableCell>
                <TableCell align="center"> {t("amount")} </TableCell>
                {user.role === "admin" && (
                  <TableCell align="center"> {t("options")}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map((row) => (
                <TableRow key={row.pawatiNumber} hover role="checkbox">
                  <TableCell align="center"> {row.pawatiNumber} </TableCell>
                  <TableCell align="center"> {row.Name} </TableCell>
                  <TableCell align="center"> {row.purpose} </TableCell>
                  <TableCell align="center"> &#x20B9; {row.amount} </TableCell>
                  {user.role === "admin" && (
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        onClick={() => pdfViewHandler(row)}
                      >
                        <VisibilityTwoToneIcon />
                      </IconButton>

                      <ReactToPdf
                        targetRef={pdfRef}
                        filename={row?.pawatiNumberb}
                        option={{
                          orientation: "landscape",
                          unit: "in",
                          format: [2, 1],
                        }}
                        x={0.5}
                        y={0.5}
                        scale={0.8}
                      >
                        {({ toPdf }) => (
                          <IconButton
                            color="secondary"
                            onClick={() => {
                              pdfDownloadHandler(row);
                              toPdf();
                            }}
                          >
                            <DownloadOutlinedIcon />
                          </IconButton>
                        )}
                      </ReactToPdf>

                      <span onMouseOver={() => pdfDownloadHandler(row)}>
                        <ReactToPrint
                          trigger={() => (
                            <IconButton color="secondary" disableElevation>
                              <PrintIcon />
                            </IconButton>
                          )}
                          content={() => pdfRef}
                        />
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: "-99999",
          opacity: "0",
        }}
      >
        <Box sx={{ my: 4, pb: 4, maxWidth: "800px", mx: "auto" }}>
          <DonationReceipt
            information={receiptsSelected}
            forwardRef={pdfRef}
            ref={(el) => (pdfRef = el)}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ReceiptManagement;
