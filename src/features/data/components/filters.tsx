import { Box, Card, CardContent, Typography } from "@mui/material";
import Filter from "./filter";
import { changeRemote, changeRoles, changelocation, changeminExprience, changeminSalary, reloadFilteredData } from '../dataReducers';
import { useAppDispatch } from "../../../app/hooks";
import filtersText from "./filterText";
// import React, { useEffect, useState } from 'react'
const filters = () => {
    const topRoles = ['frontend', 'ios', 'android', 'backend'];
    const topMinExp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const topMinSalary = [0,10,20,30,40,50,60,70];
    const topRemote = ["Remote", "Onsite"];
    const dispatch = useAppDispatch(); 
    return (

        <Card style={{ display: 'flex', justifyContent: "start"}}> 
           <div>Filters</div>
            {Filter(topRoles, "Roles", (value) =>{ dispatch(changeRoles(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topMinExp, "Minimum Experience", (value) =>{ dispatch(changeminExprience(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topMinSalary, "Minimum Salary", (value) =>{ dispatch(changeminSalary(value)); dispatch(reloadFilteredData([]))} )}
            {Filter(topRemote, "Remote", (value) =>{ dispatch(changeRemote(value)); dispatch(reloadFilteredData([]))} )}
            {filtersText("Locations" ,(value) =>{ dispatch(changelocation(value)); dispatch(reloadFilteredData([]))} )}
        </Card >
        
            
         
       
          
)
}

// okay
export default filters
