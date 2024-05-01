import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeRoles, fetchDataAsync } from "./dataReducers";
import { Job, JobList } from "./dataAPI";
import { Button } from "@mui/material";
import filters from "./components/filters";
import myCard from "./components/card";
import CardVariants from "./components/card";
import JobListing from "./components/card";


const DataDisplay = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data.data);
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
            <div key={data.jdLink}>
                <div>{data.jdLink}
                 { " "+ data.jobRole}
                </div>
              

            </div>

        )
    })
    
    return (
        <div> 
            {filters()}
            <div>{roles}</div>
            {renderData}
            {JobListing()}
             </div>
    )
}

export default DataDisplay
