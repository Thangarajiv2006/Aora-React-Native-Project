import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/helpers/axios";

const SignUp = () => {
  const [errCode, setErrCode] = useState(null);

  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes(".com");
  }

  const userSignup = async () => {
    if (isValidEmail(email)) {
      setErrEmail(false);
      try {
        if (email.trim() && password.trim() && name.trim()) {
          const res = await axios.post("/auth/sign-up", {
            name: name.trim(),
            password: password.trim(),
            email: email.trim(),
          });
          if (res.data.errorCode === 300) {
            setErrCode(res.data.errCode);
          } else if (res.data.errorCode === 301) {
            setErrCode(res.data.errorCode);
          } else {
            setErrCode(null);
            router.push("/sign-in");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrEmail(true);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center  h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Signup with Aora
          </Text>
          {errCode ? (
            <View className="w-full align-middle mt-[10px]">
              <Text className="text-3xl text-red-800 text-center">
                {errCode === 301
                  ? "User Aldready Exist"
                  : errCode === 300
                  ? "Sorry Something Wrong!"
                  : ""}
              </Text>
            </View>
          ) : (
            <></>
          )}

          <FormField
            title={"User Name"}
            styles={"mt-7"}
            handleInput={(e) => setName(e)}
            value={name}
          />
          <FormField
            title={"Email"}
            styles={"mt-7 "}
            handleInput={(e) => setEmail(e)}
            inputType={"email-adress"}
            value={email}
            error={errEmail}
          />

          <FormField
            title={"Password"}
            styles={"mt-7"}
            handleInput={(e) => setPassword(e)}
            value={password}
          />
          <CustomButton
            title={"Signup"}
            handlePress={userSignup}
            containerStyles={"mt-10 w-full"}
            textStyles={""}
          />
          <Text className="text-center mt-4 text-white">
            Aldready have an Account ?{""}{" "}
            <Text
              className="text-secondary"
              onPress={() => router.push("/sign-in")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
