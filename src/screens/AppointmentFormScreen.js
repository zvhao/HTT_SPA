import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import Dropdown from "react-native-input-select";
import MultiSelect from "react-native-multiple-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Checkbox from "expo-checkbox";
import api from "../api/AuthToken";
import formatCurrency from "../utils/formatCurrency";
import { useNavigation } from "@react-navigation/native";

const AppointmentFormScreen = () => {
  const navigation = useNavigation();

  const [initValues, setInitValues] = useState({
    branch: "",
    services: [],
    date: "",
    startTime: "",
    endTime: "",
    customerInfo: [],
    customersNumber: 1,
    status: 1,
    technician: "",
    note: "",
  });
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [checkAcc, setCheckAcc] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await api.fetchData("services");
        const responseCombos = await api.fetchData("combos");
        let data = [...response.metadata, ...responseCombos.metadata];
        let services = [];
        data.map((e) =>
          services.push({
            id: e._id,
            name:
              e.name +
              " - " +
              formatCurrency(e.price) +
              " - " +
              e.duration +
              "'",
            duration: e.duration,
          })
        );
        setServices(services);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchBranchData = async () => {
      try {
        const response = await api.fetchData("branches");
        let data = [...response.metadata];
        let branches = [];
        data.map((e) =>
          branches.push({ label: e.desc + ", " + e.address, value: e._id })
        );
        setBranches(branches);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServiceData();
    fetchBranchData();
  }, []);
  const fetchTechnicianData = async () => {
    try {
      const response = await api.fetchData("staffs");
      let data = [...response.metadata];
      return data;
      // console.log(data);
      // setTechnician(branches);
    } catch (error) {
      console.error(error);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (selectedDate) => {
    if (selectedDate) {
      setInitValues({
        ...initValues,
        startTime: selectedDate,
        date: selectedDate,
      });
    }
    hideDatePicker();
  };

  onSelectedServicesChange = (selectedItems) => {
    setInitValues({ ...initValues, services: selectedItems });
  };

  const [customers, setCustomers] = useState([{ id: 1, name: "", gender: "" }]);

  const handleNameChange = (text, id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, name: text } : customer
    );
    setCustomers(updatedCustomers);
  };

  const handleGenderChange = (value, id) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id ? { ...customer, gender: value } : customer
    );
    setCustomers(updatedCustomers);
  };

  const handleAddCustomer = () => {
    const newCustomer = { id: Date.now(), name: "", gender: "" };
    setCustomers([...customers, newCustomer]);
  };

  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
  };
  const checkBoxCus = (value) => {
    if (value && customers.length === 0) {
      handleAddCustomer();
    }
    setCheckAcc(value);
  };

  const handleSelectBranch = async (value) => {
    setInitValues({ ...initValues, branch: value });
    const fetchTechData = await fetchTechnicianData();
    const filtered = fetchTechData.filter(
      (e) => e.branch === value && e.position === "technicians"
    );
    let technicians = [];
    filtered.map((e) => technicians.push({ label: e.fullname, value: e._id }));
    // console.log(technicians);
    setTechnicians(technicians);
    // console.log(fetchTechData.length);
  };

  const handleSubmitForm = async () => {
    if (!initValues.services.length) {
      alert("Chọn ít nhất một dịch vụ");
      return;
    }
    if (!initValues.branch) {
      alert("Chọn chi nhánh");
      return;
    }
    if (!initValues.date) {
      alert("Chọn thời gian");
      return;
    }
    let accInfo;
    try {
      const accInfoString = await AsyncStorage.getItem("accInfo");
      accInfo = JSON.parse(accInfoString);
    } catch (error) {
      alert("Lỗi thông tin đăng nhập");
      return;
    }
    customers.map((e) => delete e.id);
    if (
      customers.some(
        (customer) => customer.name === "" || customer.gender === ""
      )
    ) {
      console.log(customers);
      alert("Kiểm tra thông tin khách hàng đi cùng");
      return;
    }
    let customersNumber = 1 + parseInt(customers.length);

    if (checkAcc) {
      customersNumber = customers.length;
    }

    const filteredServices = services.filter((service) =>
      initValues.services.includes(service.id)
    );
    let totalDuration = filteredServices.reduce(
      (total, service) => total + service.duration,
      0
    );
    const endTime = new Date(
      initValues.startTime.getTime() + totalDuration * 60 * 1000
    );
    let data = {
      ...initValues,
      customerInfo: customers,
      account: accInfo._id,
      customersNumber: parseInt(customersNumber),
      endTime,
      technician: initValues.technician || "",
    };
    // console.log("====================================");
    // console.log(data);
    // console.log("====================================");
    try {
      const response = await api.create("bookings", data);
      if (response && response?.status === 201 && response?.metadata?._id) {
        ToastAndroid.show("Đặt lịch thành công!", ToastAndroid.SHORT);
        navigation.navigate("Home", { bookingCreated: true });
      }
      // console.log("====================================");
      // console.log(response);
      // console.log("====================================");
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
    // Thêm xử lý khác tại đây nếu cần
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Dropdown
          isMultiple
          placeholder="Chọn dịch vụ"
          options={services}
          selectedValue={initValues.services}
          optionLabel={"name"}
          optionValue={"id"}
          onValueChange={(value) => onSelectedServicesChange(value)}
          primaryColor={"#096cd8"}
          isSearchable
          dropdownStyle={{
            borderColor: "#096cd8",
          }}
          modalOptionsContainerStyle={{
            paddingBottom: 30,
            paddingTop: 10,
          }}
          searchInputStyle={{
            borderColor: "#096cd8",
          }}
          placeholderStyle={{ color: "#888" }}
        />
        <Dropdown
          placeholder="Chọn chi nhánh"
          options={branches}
          selectedValue={initValues.branch}
          onValueChange={(value) => handleSelectBranch(value)}
          primaryColor={"#096cd8"}
          isSearchable
          dropdownStyle={{
            borderColor: "#096cd8",
          }}
          modalOptionsContainerStyle={{
            paddingBottom: 30,
            paddingTop: 10,
          }}
          searchInputStyle={{
            borderColor: "#096cd8",
          }}
          placeholderStyle={{ color: "#888" }}
        />
        {technicians.length !== 0 && (
          <Dropdown
            placeholder="Chọn kỹ thuật viên"
            options={technicians}
            selectedValue={initValues.technician}
            onValueChange={(value) =>
              setInitValues({ ...initValues, technician: value })
            }
            primaryColor={"#096cd8"}
            isSearchable
            dropdownStyle={{
              borderColor: "#096cd8",
            }}
            modalOptionsContainerStyle={{
              paddingBottom: 30,
              paddingTop: 10,
            }}
            searchInputStyle={{
              borderColor: "#096cd8",
            }}
            placeholderStyle={{ color: "#888" }}
          />
        )}

        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.datePickerContainer}
        >
          {initValues.startTime ? (
            <View style={styles.placeholderContainer}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={styles.selectedDate}>
                {initValues.startTime.toLocaleString()}
              </Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <AntDesign name="calendar" size={24} color="#096cd8" />
              <Text style={styles.placeholderText}>Chọn thời gian</Text>
            </View>
          )}
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            isVisible={showPicker}
            mode="datetime"
            value={initValues.startTime}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
        )}
        <View style={styles.section}>
          <Checkbox
            value={checkAcc}
            onValueChange={(value) => checkBoxCus(value)}
            color={checkAcc ? "#096cd8" : undefined}
            style={{ margin: 8 }}
          />
          <Text style={styles.paragraph}>Tôi không đến, chỉ đặt hộ</Text>
        </View>

        <Text>Khách hàng đi cùng:</Text>
        {customers.map((customer, index) => (
          <View key={index}>
            <TextInput
              style={styles.input}
              placeholder={`Tên khách hàng ${index + 1}`}
              value={customer.name}
              onChangeText={(text) => handleNameChange(text, customer.id)}
            />
            <View style={{ display: "flex" }}>
              <Dropdown
                placeholder="Chọn Giới tính"
                options={[
                  { label: "Nam", value: "nam" },
                  { label: "Nữ", value: "nữ" },
                ]}
                selectedValue={customer.gender}
                onValueChange={(value) =>
                  handleGenderChange(value, customer.id)
                }
                primaryColor={"#096cd8"}
                dropdownStyle={{
                  borderColor: "#096cd8",
                }}
                modalOptionsContainerStyle={{
                  paddingBottom: 30,
                  paddingTop: 10,
                }}
                searchInputStyle={{
                  borderColor: "#096cd8",
                }}
                placeholderStyle={{ color: "#888" }}
              />
              <Pressable
                style={styles.buttonRemove}
                onPress={() => handleDeleteCustomer(customer.id)}
              >
                <Text style={styles.text}>Xoá</Text>
              </Pressable>
            </View>
          </View>
        ))}

        <View style={{ marginBottom: 20 }}>
          <Pressable style={styles.buttonAdd} onPress={handleAddCustomer}>
            <Text style={styles.text}>Thêm khách hàng</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          placeholder={`Ghi chú`}
          value={initValues.note}
          onChangeText={(text) => setInitValues({ ...initValues, note: text })}
        />
      </ScrollView>
      <View style={styles.fixedButtonContainer}>
        <Pressable style={styles.buttonAdd} onPress={handleSubmitForm}>
          <Text style={styles.text}>Tạo lịch</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#096cd8",
  },
  selectedDate: {
    fontSize: 16,
    marginLeft: 30,
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#888",
    marginLeft: 30,
    flex: 1,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  input: {
    height: 60,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 8,
    flex: 1,
    borderColor: "#096cd8",
  },
  scrollView: {
    marginHorizontal: 15,
    marginBottom: 80,
  },
  buttonRemove: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#cc0000",
    height: 50,
    marginTop: -10,
    marginBottom: 20,
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
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
};

export default AppointmentFormScreen;
