import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { login } from "@/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes(".com");
  }

  const clickLogin = () => {
    console.log(form);
    if (form.email.trim() && form.password.trim()) {
      if (isValidEmail(form.email)) {
        dispatch(
          login({ email: form.email.trim(), password: form.password.trim() })
        );
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    if (userData.isLogined) {
      router.replace("/home");
    }
  }, [userData]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title={"Email"}
            styles={"mt-7"}
            handleInput={(e) => setForm({ ...form, email: e })}
            inputType={"email-adress"}
            value={form.email}
          />
          <FormField
            title={"Password"}
            styles={"mt-7"}
            handleInput={(e) => setForm({ ...form, password: e })}
            value={form.password}
            error={userData.errorCode ? true : false}
          />
          <CustomButton
            title={"Login"}
            handlePress={clickLogin}
            containerStyles={"mt-10 w-full"}
            textStyles={""}
          />
          <Text className="text-center mt-4 text-white">
            Don't have an Account ?{""}{" "}
            <Text
              className="text-secondary"
              onPress={() => router.push("/sign-up")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
