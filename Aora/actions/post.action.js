import axios from "@/helpers/axios";
import { postConstant } from "./constants";
import { router } from "expo-router";

export const createPost = (data, createdBy) => {
  return async (dispatch) => {
    dispatch({
      type: postConstant.CREATE_POST_REQUEST,
    });
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("prompt", data.prompt);
    formData.append("createdBy", createdBy);
    formData.append("video", {
      uri: data.video.uri,
      type: data.video.mimeType,
      name: data.video.fileName,
    });
    formData.append("thumbnail", {
      uri: data.thumbnail.uri,
      type: data.thumbnail.mimeType,
      name: data.thumbnail.fileName,
    });

    try {
      const res = await axios.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.errorCode) {
        dispatch({
          type: postConstant.CREATE_POST_FAILURE,
          payload: res.data,
        });
      } else if (res.status === 201) {
        dispatch({
          type: postConstant.CREATE_POST_SUCCESS,
          payload: res.data,
        });
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const featchLimitedPosts = (start, end, type, userId) => {
  return async (dispatch) => {
    switch (type) {
      case "user":
        dispatch({
          type: postConstant.GET_USER_POST_REQUEST,
        });

        try {
          const res = await axios.post("/posts/get", {
            start: start,
            end: end,
            type: type,
            userId: userId,
          });
          if (res.data.errorCode) {
          } else {
            dispatch({
              type: postConstant.GET_USER_POST_SUCCESS,
              payload: {
                posts: res.data,
                userId: userId,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
        break;

      case "all":
        dispatch({
          type: postConstant.GET_POST_REQUEST,
        });

        try {
          const res = await axios.post("/posts/get", {
            start: start,
            end: end,
            type: type,
            userId: userId,
          });
          if (res.data.errorCode) {
          } else {
            dispatch({
              type: postConstant.GET_POST_SUCCESS,
              payload: {
                posts: res.data,
                userId: userId,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }

        break;
      case "refreshAll":
        dispatch({
          type: postConstant.GET_REFRESH_POST_REQUEST,
        });

        try {
          const res = await axios.post("/posts/get", {
            start: start,
            end: end,
            type: type,
            userId: userId,
          });
          if (res.data.errorCode) {
          } else {
            dispatch({
              type: postConstant.GET_REFRESH_POST_SUCCESS,
              payload: {
                posts: res.data,
                userId: userId,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }

        break;
      case "refreshUser":
        dispatch({
          type: postConstant.GET_REFRESH_USER_POST_REQUEST,
        });
        try {
          const res = await axios.post("/posts/get", {
            start: start,
            end: end,
            type: type,
            userId: userId,
          });
          if (res.data.errorCode) {
          } else {
            dispatch({
              type: postConstant.GET_REFRESH_POST_SUCCESS,
              payload: {
                posts: res.data,
                userId: userId,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };
};
