import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeRoles, fetchDataAsync } from "./dataReducers";
import { Job, JobList } from "./dataAPI";
import { Button, Grid } from "@mui/material";
import filters from "./components/filters";
import myCard from "./components/card";
import CardVariants from "./components/card";
import JobListing from "./components/card";
import Tags from "./components/chipDropDown";


const DataDisplay = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data.shownData);
    const offset = useAppSelector((state) => state.data.offset);
    const [dataPresent, setDataPresent] = useState<boolean>(false);
    const roles = useAppSelector((state) => state.data.filters.roles);
    useEffect(() => {
        if (!dataPresent) {
            dispatch(fetchDataAsync(offset));
            setDataPresent(true); 
        }
    },[])

    const renderData = data.map((data: Job) => {
        return (
            <Grid item  key={data.jdUid}>
                {CardVariants(data)}
            </Grid>

        )
    })
    
    return (
        <div> 
            {Tags()}
            {/* <div>{roles}</div> */}
            <div style={{ padding: '20px' }}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2} >

{renderData}
</Grid>
            </div>
            
            
             </div>
    )
}

export default DataDisplay
