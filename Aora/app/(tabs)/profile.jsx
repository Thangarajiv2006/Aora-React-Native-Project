import {
  View,
  Text,
  RefreshControl,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { featchLimitedPosts } from "@/actions/post.action";
import EmptyState from "@/components/EmptyState";
import Trending from "@/components/Trending";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { icons, images } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { logout } from "@/actions/auth.action";
import { router } from "expo-router";

const Home = () => {
  const postsData = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth).userData;
  const dispatch = useDispatch();

  const fetchPosts = () => {
    dispatch(
      featchLimitedPosts(
        postsData.posts.length,
        postsData.posts.length + 10,
        "user",
        userData._id
      )
    );
  };

  useEffect(() => {
    if (postsData.userPosts.length === 0) {
      fetchPosts();
    }
  }, []);

  const refresh = () => {
    dispatch(featchLimitedPosts(0, 10, "refreshUser", userData._id));
  };

  const handleLogout = async () => {
    dispatch(logout());
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postsData.userPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={"http://192.168.38.107:3000/public/" + item.thumbnail}
            video={"http://192.168.38.107:3000/public/" + item.video}
            creator={item.createdBy.name}
            avatar={
              "http://192.168.38.107:3000/public/" + item.createdBy.profilePic
            }
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{
                  uri:
                    "http://192.168.38.107:3000/public/" + userData.profilePic,
                }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={userData.name}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={postsData.userPosts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        /* refreshControl={
          <RefreshControl
            refreshing={postsData.isRefreshing}
            onRefresh={refresh}
          />
        } */
      />
    </SafeAreaView>
  );
};

export default Home;
