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


export const fetchDataAsync = createAsyncThunk(
    'data/fetchDataAsync',
    async ({ limit, offset }: { limit: number, offset: number }): Promise<JobList> => {
        const response = await fetchJobResolver(limit, offset)
        return response
    }
)

const filterData = (data: Job[], filters: Filters) => {
    // return state.data;
    return data;
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
                state.loading = false;
                state.data = state.data.concat(action.payload.jdList);
                state.shownData = filterData(state.data, state.filters);
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})



export default initialState