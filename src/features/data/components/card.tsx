// import { Box, Card, CardContent, Typography } from '@mui/joy';
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import * as React from "react"
import { Job } from "../dataAPI"
import Card from "@mui/material/Card"
import AboutCompany from "./cards/about_company"
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';

export default function JobCard({ job }: { job: Job }) {
  const imageURl =
    "https://media.licdn.com/dms/image/C560BAQE7jsHudoGH6A/company-logo_200_200/0/1630638631345?e=2147483647&v=beta&t=GUeBX5s3s1_mC__QR1VHxCFvoIPPW_OK22HfP7KmUsA"
  return (
    //give shawdow

    <Card
      sx={{
        width: 300,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={imageURl}
            alt="Company Logo"
            style={{ width: "25px", height: "40px", objectFit: "cover" }}
          />
          <div style={{ marginLeft: "10px" }}></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#8b8b8b",
                letterSpacing: "1px",
                marginTop: "0px",
                marginBottom: "3px",
              }}
            >
              Company Name
            </h3>
            <h2
              style={{
                fontSize: "14px",
                fontWeight: "400",
                textTransform: "capitalize",
                margin: "0px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              {job.jobRole}
            </h2>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "capitalize",
                marginTop: "5px",
                marginBottom: "0px",
              }}
            >
              {job.location}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            marginTop: "8px",
            marginBottom: "8px",
            color: "rgb(77, 89, 106)",
          }}
        >
          Estimated Salary: ₹{job.minJdSalary} - {job.maxJdSalary} LPA
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginTop: "10px",
            lineHeight: "1.5",
          }}
        >
          About Company:
        </div>
        <AboutCompany jobDetailsFromCompany={job.jobDetailsFromCompany} />
        {/* <div style={{ fontSize: "13px" }}>{job.jobDetailsFromCompany}</div> */}

        <h3
          style={{
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "1px",
            marginBottom: "3px",
            color: "#8b8b8b",
            marginTop: "10px",
          }}
        >
          Minimum Experience
        </h3>
        <h2
          style={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.5",
            margin: "0px",
          }}
        >
          {job.minExp} years
        </h2>
        <Button
          variant="contained"
          sx={{
            marginTop: "10px",
            color: "black",
            fontWeight: "bold",
            backgroundColor: "rgb(85, 239, 196)",
          }}
        >
          ⚡ Easy Apply
        </Button>
      </div>
    </Card>
  )
}
