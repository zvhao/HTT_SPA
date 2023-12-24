import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/AuthToken";

const LoginScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const data = { phone, password };

      const response = await api.login(data);
      setError("");
      console.log(response);
      if (response?.status === 200) {
        const { token, accInfo } = response.metadata;

        console.log("token:", token);
        console.log("accInfo", accInfo);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("accInfo", JSON.stringify(accInfo));
        ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
        onLogin();
      } else {
        setError(response?.response?.data?.message);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log('102', error);
    }
  };

  return (
    <View
      style={{
        marginTop: 250,
        marginLeft: 50,
        marginRight: 50,
        alignContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          lineHeight: 30,
          fontWeight: "bold",
          color: "#096cd8",
        }}
      >
        ĐĂNG NHẬP
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? (
        <Text style={{ color: "red", marginTop: 12 }}>{error}</Text>
      ) : null}
      <Pressable style={styles.buttonAdd} onPress={handleLogin}>
        <Text style={styles.text}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
};
const styles = {
  input: {
    height: 60,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 8,
    // flex: 1,
    borderColor: "#096cd8",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#096cd8",
    height: 50,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  // image: {
  //   flex: 1,
  //   width: "100%",
  //   backgroundColor: "#0553",
  // },
};
export default LoginScreen;
