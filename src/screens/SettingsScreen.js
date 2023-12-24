import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import getCustomerLevel from "../utils/getCustomerLevel";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // if (await AsyncStorage.getItem("token")) {
        const token = await AsyncStorage.getItem("token");
        const accInfoString = await AsyncStorage.getItem("accInfo");
        const accInfo = JSON.parse(accInfoString);
        setUser(accInfo);

        console.log("====================================");
        console.log(JSON.stringify(accInfo, null, 4));
        console.log("====================================");
        // }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/profile.jpg")} // Đường dẫn tương đối đến tệp hình ảnh trong thư mục assets
            style={styles.avatar}
          />
          <View>
            <Text style={{ fontSize: 20, marginBottom: 5, fontWeight: 600 }}>
              {user.fullname}
            </Text>
            <Text style={{ fontSize: 16, color: "#aaa" }}>{user.phone}</Text>
            <Text style={{ fontSize: 16, color: "#aaa" }}>
              CODE: {user.code}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 18 }}>
          Email: {user.email || "Chưa cập nhật"}
        </Text>
        <Text style={{ fontSize: 18 }}>
          Sinh nhật:{" "}
          {moment(user.birthday).format("DD/MM/YYYY") || "Chưa cập nhật"}
        </Text>
        <Text style={{ fontSize: 18 }}>
          Địa chỉ: {user.address || "Chưa cập nhật"}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={{ fontSize: 18 }}>
          Hạng thành viên:{" "}
          <Text
            style={{
              fontWeight: 700,
              color: getCustomerLevel(user.customerLevel)?.color,
            }}
          >
            {getCustomerLevel(user.customerLevel)?.lv || ""}
          </Text>
        </Text>
        <Text style={{ fontSize: 18 }}>Điểm thành viên: {user.score}</Text>
      </View>
      {/* <View style={styles.box}> */}
      {/* <Pressable style={styles.buttonAdd} onPress={handleLogout}>
        <Text style={styles.text}>Đăng xuất</Text>
      </Pressable> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = {
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    height: 50,
    margin: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  box: {

    backgroundColor: "#FFF",
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
    // marginLeft: 10,
  },
};

export default SettingsScreen;
