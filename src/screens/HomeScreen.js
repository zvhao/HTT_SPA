import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StatusBar,
  SafeAreaView,
  VirtualizedList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import api from "../api/AuthToken";
import moment from "moment/moment";
import formatCurrency from "../utils/formatCurrency";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fullname, setFullname] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (route.params?.bookingCreated) {
          navigation.setParams({ bookingCreated: false });
          await bookingData();
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ AsyncStorage:", error);
      }
    };
    bookingData();
    fetchUserData();
  }, [route.params?.bookingCreated]);

  const bookingData = async () => {
    if (await AsyncStorage.getItem("token")) {
      const token = await AsyncStorage.getItem("token");
      const accInfoString = await AsyncStorage.getItem("accInfo");
      const accInfo = JSON.parse(accInfoString);
      const idAcc = accInfo._id;
      setFullname(accInfo.fullname);

      const response = await api.fetchData("bookings");
      const metadata = response.metadata;
      const filtered = metadata.filter((e) => e.account?._id === idAcc);
      const sorted = filtered.sort((a, b) =>
        moment(b.startTime).diff(moment(a.startTime))
      );
      // console.log("====================================");
      // console.log(JSON.stringify(sorted, null, 4));
      // console.log("====================================");

      setBookings(sorted);
    }
  };
  const handleBookAppointment = () => {
    navigation.navigate("AppointmentForm");
  };
  const getItemCount = () => bookings.length;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={{ color: "#096cd8", fontWeight: 600, fontSize: 18 }}>
            Thời gian: {moment(item.startTime).format("DD/MM/YYYY HH:mm")}
            {" - "}
            {moment(item.endTime).format("HH:mm")}
          </Text>
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {item.services.map((e, index) => (
          <Text key={index} style={styles.title}>
            DV {index + 1}: {e.name} - {formatCurrency(e.price)} - {e.duration}{" "}
            phút
          </Text>
        ))}
        <Text style={styles.title}>
          {"\n"}
          ĐC: {item.branch.desc}, {item.branch.address}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={{ fontSize: 18 }}>Tổng cộng:</Text>
        <Text style={{ fontSize: 22, color: "#096cd8", fontWeight: 600 }}>
          {formatCurrency(
            item.services.reduce((total, e) => total + e.price, 0)
          )}
        </Text>
      </View>
    </View>
  );
  const getItem = (data, index) => {
    return data[index];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{ marginLeft: 40 }}>
        Xin chào{" "}
        <Text style={{ color: "#096cd8", marginLeft: 40 }}>{fullname}</Text>{" "}
      </Text> */}
      <View style={styles.box}>
        <Pressable style={styles.buttonAdd} onPress={handleBookAppointment}>
          <AntDesign name="pluscircleo" size={24} color="white" />
          <Text style={styles.text}>Đặt lịch hẹn</Text>
        </Pressable>
      </View>
      <VirtualizedList
        style={styles.list}
        data={bookings}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};
const styles = {
  box: {
    backgroundColor: "#FFF",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#096cd8",
    padding: 10,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#096cd8",
    padding: 10,
  },

  item: {
    borderWidth: 1,
    borderColor: "#096cd8",
    backgroundColor: "white",
    // backgroundColor: "rgba(9, 108, 216, 0.1)",
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    // marginTop: 10,
  },
  input: {
    height: 60,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 8,
    borderColor: "#096cd8",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#096cd8",
    height: 50,
    // marginTop: 20,
    flexDirection: "row",
    width: 200,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    display: "flex",
  },
};
export default HomeScreen;
