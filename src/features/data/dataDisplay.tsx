import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeRoles, fetchDataAsync } from "./dataReducers";
import { Job, JobList } from "./dataAPI";
import { Button, Grid } from "@mui/material";
import filters from "./components/filters";
import myCard from "./components/card";
import CardVariants from "./components/card";
import JobListing from "./components/card";
import Tags from "./components/filter";


const DataDisplay = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data.shownData);
    const isLoading = useAppSelector((state) => state.data.loading);
    const offset = useAppSelector((state) => state.data.offset);
    const [dataPresent, setDataPresent] = useState<boolean>(false);
    const [index, setIndex] = useState(2);
    const loaderRef = useRef(null);
    

    const renderData = data.map((data: Job) => {
        return (
            <Grid item  key={data.jdUid}>
                {CardVariants(data)}
            </Grid>

        )
    })
    // const 
   
    return (
        <div> 
            <div style={{ padding: '20px' }}>
                <Grid sx={{ flexGrow: 1 }} container spacing={2} >
                    {renderData}
                </Grid>
            </div>
    </div>
    )
}

export default DataDisplay
