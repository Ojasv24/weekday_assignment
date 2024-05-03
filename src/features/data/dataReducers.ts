import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job, JobList, fetchJobResolver } from "./dataAPI"

export interface DataState {
    loading: boolean;
    loadingMore: boolean;
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
    minExperience?: number;
    remote: string[];
    techStack: string[];
    minSalary?: number;
    companyName?: string;
}


const initialState: DataState = {
    loading: false,
    loadingMore: false,
    data: [],
    shownData: [],
    error: "",
    offset: 0,
    hasMore: true,
    // Filter
    filters: {
        roles: [],
        minExperience: undefined,
        location: [],
        remote: [],
        techStack: [],
        minSalary: undefined,
        companyName: ""
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
    // return state.data;
    var finalData: Job[] = [];
    if (filters.roles.length > 0) {
        finalData = data.filter((job) => {
            return filters.roles.includes(job.jobRole.toLocaleLowerCase())
        })
        console.log(filters.roles);
    }
    if (filters.location.length > 0) {
        finalData = data.filter((job) => {
            return filters.location.includes(job.location.toLocaleLowerCase())
        })
    }
    if (filters.minExperience !== undefined) {
        finalData = data.filter((job) => {
            return job.minExp >= filters.minExperience!
        })
    }

    if (filters.minSalary !== undefined) {
        finalData = data.filter((job) => {
            if (job.minJdSalary === null) {
                return job
            }
            return job.minJdSalary >= filters.minSalary!
        })
    }
    if (finalData.length === 0) {
        return data
    }
    return finalData;
}

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        changeRoles(state, action: { payload: string[] }) {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    roles: action.payload
                }
            }
        },
        changeminExprience(state, action: { payload: number }) {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    minExperience: action.payload
                }
            }
        },
        changeminSalary(state, action: { payload: number }) {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    minSalary: action.payload
                }
            }
        },
        changelocation(state, action: { payload: string[] }) {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    location: action.payload
                }
            }
        },
        reloadFilteredData(state, action) {
            return {
                ...state,
                shownData: filterData(state.data, state.filters) // TODO: Add filteres
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    offset: state.offset + action.payload.jdList.length,
                    hasMore: action.payload.jdList.length === defaultPageSize,
                    data: action.payload.jdList,
                    shownData: filterData(action.payload.jdList, state.filters),
                }
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})

export const { changeRoles, changeminExprience, changeminSalary, changelocation, reloadFilteredData } = dataSlice.actions
export default dataSlice.reducer