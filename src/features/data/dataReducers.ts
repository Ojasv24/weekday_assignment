import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job, JobList, fetchJobResolver } from "./dataAPI"

export interface JobState {
    loading: boolean;
    job: Job[];
    shownJob: Job[];
    error: string;
    offset: number;
    hasMore: boolean;
    filters: Filters;
}

export interface Filters {
    roles: string[];
    location: string[];
    minExperience: number;
    remote: string[];
    techStack: string[];
    minSalary: number;
    companyName: string[];
}


const initialState: JobState = {
    loading: false,
    job: [],
    shownJob: [],
    error: "",
    offset: 0,
    hasMore: true,
    // Filter
    filters: {
        roles: [],
        minExperience: 0,
        location: [],
        remote: [],
        techStack: [],
        minSalary: 0,
        companyName: [],
    }
}

const defaultPageSize = 10;

export const fetchJobAsync = createAsyncThunk(
    'data/fetchDataAsync',
    async (offset: number): Promise<JobList> => {
        const response = await fetchJobResolver(defaultPageSize, offset)
        return response
    }
)

const filterJob = (job: Job[], filters: Filters) => {
    let finalJob: Job[] = [...job];

    if (filters.roles.length > 0) {
        finalJob = finalJob.filter(job => filters.roles.some(role => role.toLowerCase().includes(job.jobRole.toLowerCase())));
    }

    if (filters.location.length > 0) {
        finalJob = finalJob.filter(job => filters.location.some(location => job.location.toLowerCase().includes(location.toLowerCase())));
    }

    if (filters.remote.length > 0) {
        const isRemoteSelected = filters.remote.some(remote => remote.toLowerCase().includes("remote"));
        const isOnsiteSelected = filters.remote.some(remote => remote.toLowerCase().includes("onsite"));

        if (isRemoteSelected && isOnsiteSelected) {
            finalJob = job;
        } else if (isRemoteSelected) {
            finalJob = finalJob.filter(job => job.location.toLowerCase().includes("remote"));
        } else if (isOnsiteSelected) {
            finalJob = finalJob.filter(job => !job.location.toLowerCase().includes("remote"));
        }
    }

    if (filters.minExperience && filters.minExperience > 0) {
        finalJob = finalJob.filter(job => {
            return job.minExp !== null && job.minExp! >= filters.minExperience;
        });
    }

    if (filters.minSalary && filters.minSalary > 0) {
        finalJob = finalJob.filter(job => {
            return job.minJdSalary !== null && job.minJdSalary! >= filters.minSalary;
        });
    }

    if (filters.companyName && filters.companyName.length > 0 && !filters.remote.includes("Remote")) {
        finalJob = finalJob.filter(job => {
            return filters.companyName.some(company => job.companyName!.toLowerCase().includes(company.toLowerCase()));
        })
    }

    return finalJob;
}

const filterState = (state: JobState) => {
    return {
        ...state,
        shownJob: filterJob(state.job, state.filters)
    }
}

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        changeRoles(state, action: { payload: string[] }) {
            console.log('asdas');
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
        changeminExprience(state, action: { payload: number }) {
            return filterState({
                ...state,
                filters: {
                    ...state.filters,
                    minExperience: action.payload
                }
            })
        },
        changeminSalary(state, action: { payload: number }) {
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
            .addCase(fetchJobAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchJobAsync.fulfilled, (state, action) => {
                let newJob = [...state.job, ...action.payload.jdList];
                return {
                    ...state,
                    loading: false,
                    offset: state.offset + action.payload.jdList.length,
                    hasMore: action.payload.jdList.length === defaultPageSize,
                    job: newJob,
                    shownJob: filterJob(newJob, state.filters),
                }
            })
            .addCase(fetchJobAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})

export const { changeRoles, changeminExprience, changeminSalary, changelocation, changeRemote, changeCompanyName } = dataSlice.actions
export default dataSlice.reducer