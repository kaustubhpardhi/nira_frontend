import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { yellow } from "@mui/material/colors";
import pdfPhoto from "../images/nira2.jpeg";
import bob from "../images/bom.png";
import qr from "../images/qr.webp";
import moment from "moment";

const getPageMargins = () => {
  const pageStyle = `
@page {
    marks: crop cross;
    margin: 20px;
    margin-left: 2in;

}

@media all {
.pagebreak {
    display: none;
}
}

@media print {
    .pagebreak {
        page-break-before: always;
    }
    .pdfBody{
        height: 6in;
        width: 4in;
        padding: 12px !important;
    }

    .pdfBody h5{
        font-size: 12px !important;
    }
    .printFlex{
        display: flex;
    }
    .printFlex > div{
        width: 50%;
    }
    .printFlex img{
        width:  1.8in;
        height: 3in;
    }

    .pdfTable {
        font-size: 10px !important;
    }
    .pdfBottom{
        display: flex
    }
    .pdfBottomFirst{
        width: 66%;
        font-size: 10px !important;
    }
    .pdfBottomImg{
        width: 1in !important;
    }
    .pdfAmount{
        font-size: 14px !important;
    }
}
`;
  return pageStyle;
};

class PdfBody extends React.Component {
  render() {
    const { information, forwardRef } = this.props;
    console.log(information);
    return (
      <div>
        <style>{getPageMargins()}</style>
        <Box
          ref={forwardRef}
          className="pdfBody"
          sx={{
            py: 4,
            px: 6,
            background: yellow[100],
            border: "1px solid black",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#8c2d29",
              fontWeight: "700",
              textAlign: "center",
              my: 3,
            }}
            gutterBottom
          >
            Shri Laxmi Narasinha Deosthan Trust Nira Narasingpur{" "}
          </Typography>
          <Box
            className="printFlex"
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "repeat(2, 1fr)" },
              gap: 3,
            }}
          >
            {/* heading */}
            <div>
              <img src={pdfPhoto} alt="GodImage" />
              <Typography
                className="pdfAmount"
                sx={{ fontSize: "24px", textAlign: "center" }}
              >
                {" "}
                <b>Amount : </b> &#x20B9; {information?.amount}{" "}
              </Typography>
            </div>
            <div>
              {/* body */}
              <table style={{ textAlign: "left" }} className="pdfTable">
                <tbody>
                  <tr>
                    <th> Receipt No </th>
                    <td> : {information?.pawti} </td>
                  </tr>
                  <tr>
                    <th>Receipt Date </th>
                    <td>
                      {" "}
                      : {information.receiptDate
                        ? information.receiptDate
                        : ""}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th> Name </th>
                    <td> : {information?.name} </td>
                  </tr>
                  <tr>
                    <th> Gotra </th>
                    <td> : {information?.gotra} </td>
                  </tr>
                  <tr>
                    <th> Date </th>
                    <td>
                      {" "}
                      :{" "}
                      {information.poojaDate
                        ? moment(information.poojaDate).format("DD-MM-yyyy")
                        : ""}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th> State </th>
                    <td> : {information?.state} </td>
                  </tr>
                  <tr>
                    <th> Mobile </th>
                    <td> : {information?.mobile} </td>
                  </tr>
                  <tr>
                    <th> Email </th>
                    <td> : {information?.email} </td>
                  </tr>
                  <tr>
                    <th>PAN </th>
                    <td> : {information?.uid} </td>
                  </tr>
                  <tr>
                    <th> Aadhar </th>
                    <td> : {information?.aadhar} </td>
                  </tr>
                  <tr>
                    <th> Purpose </th>
                    <td> : {information?.forWhich} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>

          {/* footer */}
          <Box
            className="pdfBottom"
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "2fr 1fr" },
              gap: 1,
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Box sx={{ textAlign: "center" }} className="pdfBottomFirst">
              <div>
                {" "}
                Donations to the trust are exempt u/s 80G of the Income Tax Act
                AAATL4175HF2014{" "}
              </div>
              <div> Nira Narsinhpur, Indapur Thaluka, Maharashtra 413211</div>
            </Box>
            <Box sx={{ display: "flex" }} className="pdfBottomSecond">
              <Box sx={{ marginLeft: "auto" }}>
                <img
                  className="pdfBottomImg"
                  src={bob}
                  style={{
                    maxWidth: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginBottom: "16px",
                  }}
                  alt=""
                />
                <img
                  className="pdfBottomImg"
                  src={qr}
                  style={{ width: "150px", display: "block" }}
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

export default PdfBody;
