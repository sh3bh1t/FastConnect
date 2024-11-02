import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async(_,thunkAPI)=>{
        try{
            const response=await clientServer.get('/posts')

            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async(userData, thunkAPI) =>{
        const {file,body}= userData;
        try{
            const formData = new FormData();
            formData.append('token',localStorage.getItem('token'))
            formData.append('body',body)
            formData.append('media', file)

            const response = await clientServer.post("/post",formData,{
                headers :{
                    'Content-Type' : 'multipart/form-data'
                }
            })

            if(response.status === 200){
                return thunkAPI.fulfillWithValue("post uploaded");
            }
            else{
                return thunkAPI.fulfillWithValue("post not uploaded");
            }
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async(post_id,thunkAPI)=>{
        try{
            const response = await clientServer.delete("/delete_post",{
                data : {
                    token : localStorage.getItem('token'),
                    postId : post_id
                }
            })
            thunkAPI.dispatch(getAllPosts());
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue("something went wrong");
        }
    }
)

export const incrementPostLike = createAsyncThunk(
    "post/incrementPostLike",
    async(post_id, thunkAPI)=>{
        try{
            const response = await clientServer.post("/increment_post_likes",{
                post_Id : post_id
            })
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const getAllComments = createAsyncThunk(
    "post/getComments",
    async(post_id, thunkAPI) =>{
        try{
            const response = await clientServer.get("/get_comments",{
                params : {
                    postId : post_id
                }
            });
            console.log("Fetched Comments:", response.data); 
            return thunkAPI.fulfillWithValue({
                comments : response.data,
                postId : post_id
            })
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const postComment = createAsyncThunk(
    "post/postComment",
    async(commentData, thunkAPI)=>{
        try{
            console.log({
                post_id : commentData.post_id,
                body:commentData.body
            })
            const response = await clientServer.post("/comment",{
                token : localStorage.getItem("token"),
                post_id : commentData.post_id,
                commentBody : commentData.body
            });
            console.log("Comment posted successfully: ", response.data);
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            console.error("Error posting comment: ", err);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)