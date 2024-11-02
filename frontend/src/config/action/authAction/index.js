import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/login", {
                email: user.email,
                password: user.password,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                return response.data.token;
            } else {
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            const response = await clientServer.post("/register", {
                email: user.email,
                password: user.password,
                name: user.name,
                username: user.username,
                
            });
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async(user, thunkAPI)=>{
        try{
            const response = await clientServer.get("/get_user_and_profile",{
                params : {
                    token : user.token
                }
            })
            console.log('API Response:', response.data); // Log API response
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(_, thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/get_all_users")
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async(user,thunkAPI) => {
        try{
            const response = await clientServer.post("/user/send_connection_request",{
                token: user.token,
                connectionId : user.user_id
            })
            thunkAPI.dispatch(getConnectionsRequest({token : user.token}))
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getConnectionsRequest = createAsyncThunk(
    "user/getConnectionsRequest",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/get_connection_request",{
                params:{
                    token : user.token,
                }
            })
            return thunkAPI.fulfillWithValue(response.data.connections);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


export const getMyConnectionsRequest = createAsyncThunk(
    "user/getMyConnectionsRequest",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/user_connection_request",{
                params:{
                    token : user.token,
                }
            })
            // console.log('My Connections Response:', response.data);
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


export const acceptConnection = createAsyncThunk(
    "user/acceptConnections",
    async(user,thunkAPI)=>{
        try{
            const response = await clientServer.post("/user/accept_connection_request",{
                token : user.token,
                requestId : user.connectionId, 
                action_type : user.action
            })
            thunkAPI.dispatch(getConnectionsRequest({token : user.token}))
            thunkAPI.dispatch(getMyConnectionsRequest({token : user.token}))
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)



