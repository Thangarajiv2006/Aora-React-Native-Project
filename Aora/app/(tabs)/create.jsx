import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import FormField from "@/components/FormField";

import { createPost } from "@/actions/post.action";

const Create = () => {
  const userData = useSelector((state) => state.auth).userData;
  const posts = useSelector((state) => state.posts).posts;

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const dispatch = useDispatch();
  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const onSubmit = async () => {
    if (
      form.title.trim() &&
      form.thumbnail &&
      form.video &&
      form.prompt.trim()
    ) {
      await dispatch(createPost(form, userData._id)).then(() => {
        setForm({
          title: "",
          video: null,
          thumbnail: null,
          prompt: "",
        });
      });
    } else {
      Alert.alert("Please fill the all elements");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 mt-6 ">
        <View className="">
          <Text className="text-2xl text-white font-psemibold">
            Upload Video
          </Text>

          <FormField
            title="Video Title"
            value={form.title}
            placeholder="Give your video a catchy title..."
            handleInput={(e) => setForm({ ...form, title: e })}
            styles="mt-10"
          />

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode={ResizeMode.CONTAIN}
                />
              ) : (
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="contain"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The AI prompt of your video...."
            handleInput={(e) => setForm({ ...form, prompt: e })}
            styles="mt-7"
          />

          <CustomButton
            handlePress={onSubmit}
            title="Submit & Publish"
            containerStyles="mt-7 mb-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
