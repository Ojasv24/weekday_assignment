import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job, JobList, fetchJobResolver } from "./dataAPI"

export interface DataState {
    loading: boolean;
    data: Job[];
    shownData: Job[];
    error: string;
    offset: number;
    hasMore: boolean;
    filters: Filters;
}

export interface Filters {
    roles: string[];
    location: string[];
    minExperience: number[];
    remote: string[];
    techStack: string[];
    minSalary: number[];
    companyName: string[];
}


const initialState: DataState = {
    loading: false,
    data: [],
    shownData: [],
    error: "",
    offset: 0,
    hasMore: true,
    // Filter
    filters: {
        roles: [],
        minExperience: [],
        location: [],
        remote: [],
        techStack: [],
        minSalary: [],
        companyName: [],
    }
}

const defaultPageSize = 10;

export const fetchDataAsync = createAsyncThunk(
    'data/fetchDataAsync',
    async (offset: number): Promise<JobList> => {
        const response = await fetchJobResolver(defaultPageSize, offset)
        return response
    }
)

const filterData = (data: Job[], filters: Filters) => {
    let finalData: Job[] = [...data];

    if (filters.roles.length > 0) {
        finalData = finalData.filter(job => filters.roles.some(role => role.toLowerCase().includes(job.jobRole.toLowerCase())));
    }

    if (filters.location.length > 0) {
        finalData = finalData.filter(job => filters.location.some(location => job.location.toLowerCase().includes(location.toLowerCase())));
    }

    if (filters.remote.length > 0) {
        const isRemoteSelected = filters.remote.some(remote => remote.toLowerCase().includes("remote"));
        const isOnsiteSelected = filters.remote.some(remote => remote.toLowerCase().includes("onsite"));

        if (isRemoteSelected && isOnsiteSelected) {
            finalData = data;
        } else if (isRemoteSelected) {
            finalData = finalData.filter(job => job.location.toLowerCase().includes("remote"));
        } else if (isOnsiteSelected) {
            finalData = finalData.filter(job => !job.location.toLowerCase().includes("remote"));
        }
    }

    if (filters.minExperience && filters.minExperience.length > 0) {
        finalData = finalData.filter(job => {
            return job.minExp !== null && filters.minExperience.some(exp => job.minExp! >= exp);
        });
    }

    if (filters.minSalary && filters.minSalary.length > 0) {
        finalData = finalData.filter(job => {
            return job.minJdSalary !== null && filters.minSalary.some(salary => job.minJdSalary! >= salary);
        });
    }

    if (filters.companyName && filters.companyName.length > 0) {
        finalData = finalData.filter(job => {
            return filters.companyName.some(company => job.companyName!.toLowerCase().includes(company.toLowerCase()));
        })
    }

    return finalData;
}

const filterState = (state: DataState) => {
    return {
        ...state,
        shownData: filterData(state.data, state.filters)
    }
}

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        changeRoles(state, action: { payload: string[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    roles: action.payload
                }
            })
        },
        changeCompanyName(state, action: { payload: string[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    companyName: action.payload
                }
            })
        },
        changeminExprience(state, action: { payload: number[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    minExperience: action.payload
                }
            })
        },
        changeminSalary(state, action: { payload: number[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    minSalary: action.payload
                }
            })
        },
        changelocation(state, action: { payload: string[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    location: action.payload
                }
            })
        },
        changeRemote(state, action: { payload: string[] }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    remote: action.payload
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                let newData = [...state.data, ...action.payload.jdList];
                return {
                    ...state,
                    loading: false,
                    offset: state.offset + action.payload.jdList.length,
                    hasMore: action.payload.jdList.length === defaultPageSize,
                    data: newData,
                    shownData: filterData(newData, state.filters),
                }
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})

export const { changeRoles, changeminExprience, changeminSalary, changelocation, changeRemote, changeCompanyName } = dataSlice.actions
export default dataSlice.reducer