import { View, Text, RefreshControl, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { featchLimitedPosts } from "@/actions/post.action";
import EmptyState from "@/components/EmptyState";
import Trending from "@/components/Trending";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";

const Home = () => {
  const postsData = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth).userData;
  const dispatch = useDispatch();

  const fetchPosts = () => {
    dispatch(
      featchLimitedPosts(
        postsData.posts.length,
        postsData.posts.length + 10,
        "all",
        userData._id
      )
    );
  };

  useEffect(() => {
    if (postsData.posts.length === 0) {
      fetchPosts();
    }
  }, []);

  const refresh = () => {
    dispatch(featchLimitedPosts(0, 10, "refreshAll", userData._id));
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postsData.posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={"http://192.168.118.107:3000/public/" + item.thumbnail}
            video={"http://192.168.118.107:3000/public/" + item.video}
            creator={item.createdBy.name}
            avatar={
              "http://192.168.118.107:3000/public/" + item.createdBy.profilePic
            }
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">Aora</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={postsData.posts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={postsData.isRefreshing}
            onRefresh={refresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
