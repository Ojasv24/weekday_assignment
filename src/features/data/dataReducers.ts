import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { JobList, fetchJobResolver } from "./dataAPI"

export interface DataState {
    loading: boolean;
    loadingMore: boolean;
    data: any[];
    shownData: any[];
    error: string;
    offset: number;
    hasMore: boolean;
    // Filters
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
    roles: [],
    minExperience: undefined,
    location: [],
    remote: [],
    techStack: [],
    minSalary: undefined,
    companyName: ""
}


export const fetchDataAsync = createAsyncThunk(
    'data/fetchDataAsync',
    async ({ limit, offset }: { limit: number, offset: number }): Promise<JobList> => {
        const response = await fetchJobResolver(limit, offset)
        return response
    }
)

const filterData = (state: DataState) => {
    return state.data;
}

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        changeRoles(state, action: { payload: string[] }) {
            return {
                ...state,
                roles: action.payload
            }
        },
        reloadFilteredData(state, action) {
            return {
                ...state,
                shownData: filterData(state) // TODO: Add filteres
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.concat(action.payload.jdList)
                // filter data
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})



export default initialState