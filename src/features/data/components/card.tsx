import { Box, Card, CardContent, Typography } from '@mui/joy';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import * as React from 'react';
import { Job } from '../dataAPI';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';

export default function CardVariants(job : Job) {
    const imageURl = "https://media.licdn.com/dms/image/C560BAQE7jsHudoGH6A/company-logo_200_200/0/1630638631345?e=2147483647&v=beta&t=GUeBX5s3s1_mC__QR1VHxCFvoIPPW_OK22HfP7KmUsA";
  return (
    //give shawdow
   
      <Card variant="soft" sx={{ width: 300 ,   boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)", border: 1 ,backgroundColor: "white"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
            
        <div style={{display: "flex", flexDirection: "row", }}>
        <img src={imageURl} alt="Company Logo" style={{ width: '25px', height: '50px', objectFit: 'cover' }} />
        <div style={{marginLeft: "10px"}}></div>
        <div  style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div style={{fontWeight: "bold", fontSize: "16px" , color: "gray"}}>
                Company Name
                </div>
                <div style={{ fontSize: "14px", fontWeight:300 }}>
                    {job.jobRole}
                </div>
                <div  style={{ fontSize: "12px", fontWeight:500,}}>
                    {job.location}
                </div>
            </div>
        </div>
            
            <div style={{ fontSize: "14px", fontWeight: 400,  marginTop: "6px",}}>
            Estimated Salary: ₹{job.minJdSalary} - {job.maxJdSalary} LPA 
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", marginTop: "10px"}}>
                About Company:
            </div>
            <div style={{ fontSize: "13px"}}>
            {job.jobDetailsFromCompany}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "gray", marginTop: "10px"}}>
                Skills
            </div>
            <div style={{ display: "flex", flexDirection: "row"}}>
                <Chip label="Python" sx={{ fontSize: "8px", backgroundColor: "lightgreen", color: "blue"} } />
            <Chip label="Java" sx={{ fontSize: "8px", backgroundColor: "lightgreen", color: "blue", padding: "0px"} } />
            </div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "gray", marginTop: "10px"}}>
            Minimum Experience
            </div>
            <div style={{ fontSize: "12px", fontWeight: 400}}>
           {job.minExp}
            </div>
            <Button variant="contained" sx={{marginTop: "10px"}}>Easy Apply</Button>
        </div>
      </Card>
  
  );
}
