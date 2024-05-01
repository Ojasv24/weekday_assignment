import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeRoles, fetchDataAsync } from "./dataReducers";
import { Job, JobList } from "./dataAPI";


const DataDisplay = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data.data);
    const offset = useAppSelector((state) => state.data.offset);
    const [dataPresent, setDataPresent] = useState<boolean>(false);
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
            {renderData} </div>
    )
}

export default DataDisplay
