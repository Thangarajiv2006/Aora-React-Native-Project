import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  styles,
  title,
  placeHolders,
  handleInput,
  inputType,
  value,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${styles}`}>
      <Text
        className={`text-base text-gray-100 font-pmedium ${
          error ? "text-red-800" : ""
        }`}
      >
        {title}
      </Text>
      <View
        className={`border-2 border-black-200 w-full h-16  pr-[15px]  bg-black-100 rounded-2xl focus:border-secondary flex-row items-center  ${
          error ? "border-red-800" : ""
        } `}
      >
        <TextInput
          value={value}
          onChangeText={handleInput}
          className="font-psemibold flex-1 text-white w-full h-full pl-[15px] "
          placeholder={placeHolders}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={inputType}
        />
        {title === "Password" ? (
          <TouchableOpacity
            className=""
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Image source={icons.eyeHide} className="w-6 h-6" />
            ) : (
              <Image source={icons.eye} className="w-6 h-6" />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default FormField;
