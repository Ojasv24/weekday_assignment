import { Box, Card, CardContent, Typography } from "@mui/material";
import Filter from "./filter";
import { changeRoles, reloadFilteredData } from '../dataReducers';
import { useAppDispatch } from "../../../app/hooks";
// import React, { useEffect, useState } from 'react'
const filters = () => {
    const topRoles = ['frontend', 'ios', 'android', 'backend'];
    const dispatch = useAppDispatch(); 
    return (

        <Card style={{ display: 'flex', justifyContent: "start"}}> 
           <div>Filters</div>
            {Filter(topRoles, "Roles", (value) =>{ dispatch(changeRoles(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topRoles, "Minimum Experience", (value) =>{ dispatch(changeRoles(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topRoles, "Minimum Salary", (value) =>{ dispatch(changeRoles(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topRoles, "Location", (value) =>{ dispatch(changeRoles(value)); dispatch(reloadFilteredData([]))} )}
        </Card >
        
            
         
       
          
)
}

// okay
export default filters
