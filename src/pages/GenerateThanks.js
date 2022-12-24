import React, { useEffect } from "react";
import ReactToPdf from "react-to-pdf";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import ThanksLetter from "./ThanksLetter";

const GenerateThanks = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let pdfRef = React.createRef();

  useEffect(() => {
    if (!state) {
      navigate("/billing");
    }
  }, [state, navigate]);

  return (
    <Box sx={{ my: 4, pb: 4, maxWidth: "800px", mx: "auto" }}>
      <ThanksLetter
        information={state}
        forwardRef={pdfRef}
        ref={(el) => (pdfRef = el)}
      />
      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <Link to="/billing" style={{ display: "block" }}>
          <Button
            variant="contained"
            color="fourth"
            disableElevation
            startIcon={<HomeOutlinedIcon />}
          >
            Back to Home
          </Button>
        </Link>

        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              color="third"
              disableElevation
              startIcon={<PrintIcon />}
              sx={{
                ml: "auto",
                mr: 2,
              }}
            >
              Print Now
            </Button>
          )}
          content={() => pdfRef}
        />

        <ReactToPdf
          targetRef={pdfRef}
          filename={state?.pawti}
          option={{
            orientation: "landscape",
            unit: "in",
            format: [2, 2],
          }}
        >
          {({ toPdf }) => (
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              color="success"
              onClick={toPdf}
              disableElevation
              startIcon={<CloudDownloadIcon />}
            >
              Download Thanks Letter
            </Button>
          )}
        </ReactToPdf>
      </Box>
    </Box>
  );
};

export default GenerateThanks;
