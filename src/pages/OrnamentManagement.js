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
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ReactToPrint from "react-to-print";
import PdfBodyOrnament from "./PdfBodyOrnament";
import DonationReceipt from "./DonationReceipt";
import PrintIcon from "@mui/icons-material/Print";
import { useTranslation } from "react-i18next";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./OrnamentManagement.css";

const OrnamentManagement = () => {
  let pdfRef = React.createRef();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [originalReceipts, setOriginalReceipts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [receiptsSelected, setReceiptsSelected] = useState([]);
  const [name, setName] = useState([]);
  const [pawtino, setPawtino] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // const [user] = useState({ role: 'user' })
  const [user] = useState({ role: "admin" });

  // effects
  useEffect(() => {
    axios.post("/ornament/get-ornament-receipt", {}).then((res) => {
      console.log(res.data.packages);
      setOriginalReceipts(res.data.packages);

      setReceipts(res.data.packages);
      setLoading(false);
    });
  }, []);

  const pdfDownloadHandler = (receipt) => {
    const {
      pawatiNumber,
      Name,
      receiptDate,
      mobileNumber,
      email,
      ornamentValue,
      ornamentName,
      ornamentType,
      ornamentWeight,
      address,
      gotra,
      uid,
    } = receipt;
    const information = {
      pawti: pawatiNumber,
      name: Name,
      receiptDate,
      mobile: mobileNumber,
      email,
      gotra,
      state: address?.state,
      ornamentName,
      ornamentType,
      ornamentValue,
      ornamentWeight,
      uid,
    };
    setReceiptsSelected(information);
  };

  const pdfViewHandler = (receipt) => {
    const {
      pawatiNumber,
      Name,
      receiptDate,
      mobileNumber,
      email,
      ornamentValue,
      ornamentName,
      ornamentType,
      ornamentWeight,
      address,
      gotra,
      uid,
    } = receipt;
    const information = {
      pawti: pawatiNumber,
      name: Name,
      receiptDate,
      mobile: mobileNumber,
      email,
      gotra,
      state: address?.state,
      ornamentName,
      ornamentType,
      ornamentValue,
      ornamentWeight,
      uid,
    };
    navigate("/generate-ornament", { state: information });
  };

  if (loading) {
    return (
      <div className="screenCenter">
        <CircularProgress />
      </div>
    );
  }
  const handleSubmit = () => {
    // format selectedDate to 'dd-mm-yyyy' format
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    let selectedDateFormatted = selectedDate.toLocaleDateString(
      "en-IN",
      options
    );
    // replace forward slash with hyphen
    selectedDateFormatted = selectedDateFormatted.replace(/\//g, "-");
    // filter the original receipts data by comparing their receiptDate to the selected date
    const filteredReceipts = originalReceipts.filter((receipt) => {
      return receipt.receiptDate === selectedDateFormatted;
    });
    setReceipts(filteredReceipts);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleReset = () => {
    setSelectedDate(new Date());
    setReceipts(originalReceipts);
    setName("");
    setPawtino("");
  };
  const handleResetname = () => {
    setName("");
    setReceipts(originalReceipts);
  };
  const handleResetpawtino = () => {
    setPawtino("");
    setReceipts(originalReceipts);
  };
  const handleNameFilterChange = (event) => {
    setName(event.target.value);
  };
  const handlePawtinoFilterChange = (event) => {
    setPawtino(event.target.value);
  };

  const handleFilterName = () => {
    const filteredReceipts = originalReceipts.filter((receipt) => {
      return receipt.Name.toLowerCase().includes(name.toLowerCase());
    });
    setReceipts(filteredReceipts);
  };
  const handleFilterPawtino = () => {
    const filteredReceipts = originalReceipts.filter((receipt) => {
      return receipt.pawatiNumber === parseInt(pawtino, 10);
    });
    setReceipts(filteredReceipts);
  };
  return (
    <div>
      {/* <div className="filters">
        <div className="filter-name">
          <input
            type="text"
            value={name}
            onChange={handleNameFilterChange}
            className="name-field"
            placeholder="Filter by Name"
          />
          <button onClick={handleFilterName} className="button-5">
            Filter
          </button>
          <div></div>
        </div>
        <div>
          <div className="filter-pawtino">
            <input
              type="text"
              value={pawtino}
              onChange={handlePawtinoFilterChange}
              className="pawti-field"
              placeholder="Filter by Receipt "
            ></input>
            <button onClick={handleFilterPawtino} className="button-5">
              Filter
            </button>
          </div>
        </div>
        <div className="date-filter">
          <form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className="datePicker"
              />
            </MuiPickersUtilsProvider>
          </form>
          <button className="button-7" onClick={handleSubmit}>
            Filter by Date
          </button>
        </div>
        <div>
          <button className="button-6" onClick={handleReset}>
            Reset Filter
          </button>
        </div>
      </div> */}

      <Paper sx={{ width: "100%", mt: "3rem" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"> {t("Serial No.")} </TableCell>
                <TableCell align="center"> {t("receipt")} </TableCell>
                <TableCell align="center"> {t("name")}</TableCell>
                <TableCell align="center"> Ornament Name </TableCell>
                <TableCell align="center"> Ornament Value </TableCell>
                {user.role === "admin" && (
                  <TableCell align="center"> {t("options")}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.map((row, index) => (
                <TableRow key={row.pawatiNumber} hover role="checkbox">
                  <TableCell align="center">
                    {receipts.length - index}{" "}
                  </TableCell>
                  <TableCell align="center"> {row.pawatiNumber} </TableCell>
                  <TableCell align="center"> {row.Name} </TableCell>
                  <TableCell align="center"> {row.ornamentName} </TableCell>
                  <TableCell align="center">
                    {" "}
                    &#x20B9; {row.ornamentValue}{" "}
                  </TableCell>

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
          <PdfBodyOrnament
            information={receiptsSelected}
            forwardRef={pdfRef}
            ref={(el) => (pdfRef = el)}
          />
        </Box>
      </Box>
    </div>
  );
};

export default OrnamentManagement;
