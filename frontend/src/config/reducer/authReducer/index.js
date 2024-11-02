import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, loginUser, registerUser ,getAllUsers, getConnectionsRequest, getMyConnectionsRequest} from "@/config/action/authAction"


const initialState = {
    user : null,
    all_users : [],
    all_profiles_fetched : false,
    isError : false,
    isSuccess: false,
    isLoading : false,
    loggedIn : false,
    message : "",
    isTokenThere : false,
    profileFetched : false,
    connections : [],
    connectionRequest : [],
    email : "",
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : ()=> initialState,
        handleLoginUser : (state) =>{
            state.message = "hello"
        },
        emptyMessage : (state)=>{
            state.message=""
        },
        setTokenIsThere :(state)=>{
            state.isTokenThere = true
        },
        setTokenIsNotThere : (state)=>{
            state.isTokenThere = false
        }
    },

    extraReducers :(builder) =>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess=true;
            state.loggedIn = true;
            state.message = "Login Successful"
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(registerUser.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess=true;
            state.loggedIn = true;
            state.message = "Registration Successful"
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(getAboutUser.fulfilled,(state,action)=>{
            console.log("getAboutUser fulfilled with payload:", action.payload);
            state.isLoading = false;
            state.isError = false;
            state.profileFetched=true;
            state.user = action.payload;
            console.log("Updated state:", state);
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            // console.log("Fetched profiles:", action.payload[0].userId.name);
            console.log("Fetched profiles:", action.payload);
            state.isLoading = false;
            state.isError = false;
            state.all_profiles_fetched=true;
            state.all_users=action.payload;
        })
        .addCase(getConnectionsRequest.fulfilled , (state,action)=>{
            state.connections = action.payload
        })
        .addCase(getConnectionsRequest.rejected , (state,action)=>{
            state.message = action.payload
        })
        .addCase(getMyConnectionsRequest.fulfilled , (state,action)=>{
            // console.log('Updating connection requests:', action.payload);
            state.connectionRequest = action.payload
        })
        .addCase(getMyConnectionsRequest.rejected,(state,action)=>{
            state.message= action.payload
        })
        
    }
})

export const {reset,emptyMessage,setTokenIsThere,setTokenIsNotThere}= authSlice.actions;
export default authSlice.reducer;