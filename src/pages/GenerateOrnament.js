import React, { useEffect } from "react";
import ReactToPdf from "react-to-pdf";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DonationReceipt from "./DonationReceipt";
import PdfBody from "./PdfBody";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PrintIcon from "@mui/icons-material/Print";
import ReactToPrint from "react-to-print";
import { useTranslation } from "react-i18next";
import PdfBodyOrnament from "./PdfBodyOrnament";

const GenerateOrnament = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let pdfRef = React.createRef();

  useEffect(() => {
    if (!state) {
      navigate("/billing");
    }
  }, [state, navigate]);
  const { t } = useTranslation();

  return (
    <Box sx={{ my: 4, pb: 4, maxWidth: "800px", mx: "auto" }}>
      <PdfBodyOrnament
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
            {t("back-home")}
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
              {t("print-now")}{" "}
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
              {t("download-receipt")}
            </Button>
          )}
        </ReactToPdf>
      </Box>
    </Box>
  );
};

export default GenerateOrnament;
