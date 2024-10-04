import React, { useEffect, useState } from "react";
import CommonBtn from "../common/CommonBtn";
import { useNavigate } from "react-router-dom";
import CommonInput from "../common/CommonInput";
import TabelEmployee from "./TableEmployee";

const Employee = () => {
  const [delearCode, setDealerCode] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [departmentValue, setDepartmentValue] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const history = useNavigate();

  useEffect(() => {
    const storedDepartments = localStorage.getItem("departmentListFinal");
    if (storedDepartments) {
      setDepartmentValue(JSON.parse(storedDepartments));
    }

    const storedEmployees = localStorage.getItem("employeeDetails");
    if (storedEmployees) {
      setEmployeeDetails(JSON.parse(storedEmployees));
    }
  }, []);

  useEffect(() => {
    if (employeeDetails.length > 0) {
      localStorage.setItem("employeeDetails", JSON.stringify(employeeDetails));
    }
  }, [employeeDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmployee = {
      name: userName.trim().toLowerCase(),
      department: selectedDepartment.trim().toLowerCase(),
      dealer: delearCode.trim().toLowerCase(),
      panCode: pan.trim().toLowerCase(),
      mobileNum: mobile.trim(),
      pinNum: pinCode.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim().toLowerCase(),
    };

    if (
      !normalizedEmployee.dealer ||
      !normalizedEmployee.name ||
      !normalizedEmployee.panCode ||
      !normalizedEmployee.mobileNum ||
      !normalizedEmployee.pinNum ||
      !normalizedEmployee.email ||
      !normalizedEmployee.address ||
      !normalizedEmployee.department
    ) {
      alert("All fields are required.");
      return;
    }

    if (normalizedEmployee.name.length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    if (normalizedEmployee.mobileNum.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (normalizedEmployee.pinNum.length !== 6) {
      alert("Pin code must be exactly 6 digits.");
      return;
    }

    if (normalizedEmployee.address.length < 5) {
      alert("Address must be at least 5 characters long.");
      return;
    }

    const duplicateEntry = employeeDetails.find(
      (employee) =>
        employee.name === normalizedEmployee.name ||
        employee.panCode === normalizedEmployee.panCode ||
        employee.mobileNum === normalizedEmployee.mobileNum ||
        employee.email === normalizedEmployee.email ||
        employee.dealer === normalizedEmployee.dealer
    );

    if (duplicateEntry) {
      const duplicateField = Object.keys(duplicateEntry).find(
        (key) => duplicateEntry[key] === normalizedEmployee[key]
      );
      alert(`Duplicate entry detected in field: ${duplicateField}`);
      return;
    }

    setEmployeeDetails((prevData) => [...prevData, normalizedEmployee]);

    clearForm();
  };

  const clearForm = () => {
    setDealerCode("");
    setUserName("");
    setSelectedDepartment("");
    setPan("");
    setMobile("");
    setPinCode("");
    setEmail("");
    setAddress("");
  };

  const handleCancel = () => {
    clearForm();
  };

  const sortByName = () => {
    const sortedList = [...employeeDetails].sort((a, b) =>
      isSortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setEmployeeDetails(sortedList);
    setIsSortedAsc(!isSortedAsc);
  };

  const navigateToDepartment = () => {
    history("/");
  };

  const filteredEmployees = employeeDetails.filter(
    (employee) =>
      employee.name.includes(searchQuery.toLowerCase()) ||
      employee.department.includes(searchQuery.toLowerCase()) ||
      employee.dealer.includes(searchQuery.toLowerCase()) ||
      employee.panCode.includes(searchQuery.toLowerCase()) ||
      employee.mobileNum.includes(searchQuery) ||
      employee.email.includes(searchQuery.toLowerCase()) ||
      employee.address.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
      <div className="flex justify-center">
  <h1 className="text-3xl font-bold text-gray-700 bg-blue-100 px-4 py-2 rounded-md inline-block mb-4">
    Employee Details
  </h1>
</div>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CommonInput
              inputLabel={"Dealer Code: "}
              inputPlaceholder={"Dealer Code"}
              inputValue={delearCode}
              monitorState={(e) => setDealerCode(e.target.value)}
              className="flex-1 mb-2 md:mb-0 md:mr-2"
            />

            <label className="mr-2">Department:</label>
            <select
              id="depStatus"
              className="border-2 border-black rounded-lg ml-2 h-auto w-32" // Smaller width for the select box
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select</option>
              {departmentValue.map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CommonInput
              inputLabel={"Name: "}
              inputPlaceholder={"Name"}
              inputValue={userName}
              monitorState={(e) => setUserName(e.target.value)}
              className="flex-1 mb-2 md:mb-0 md:mr-2"
            />
            <CommonInput
              inputLabel={"PAN: "}
              inputPlaceholder={"PAN"}
              inputValue={pan}
              monitorState={(e) => setPan(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CommonInput
              inputLabel={"Mobile: "}
              inputPlaceholder={"Mobile"}
              inputValue={mobile}
              monitorState={(e) => setMobile(e.target.value)}
              className="flex-1 mb-2 md:mb-0 md:mr-2"
            />
            <CommonInput
              inputLabel={"Pin Code: "}
              inputPlaceholder={"Pin Code"}
              inputValue={pinCode}
              monitorState={(e) => setPinCode(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CommonInput
              inputLabel={"Email: "}
              inputPlaceholder={"Email"}
              inputValue={email}
              monitorState={(e) => setEmail(e.target.value)}
              className="flex-1 mb-2 md:mb-0 md:mr-2"
            />
            <CommonInput
              inputLabel={"Address: "}
              inputPlaceholder={"Address"}
              inputValue={address}
              monitorState={(e) => setAddress(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex justify-center items-center mt-4">
            <CommonBtn btnName={"Add"} btnClick={handleSubmit} />
            <CommonBtn btnName={"Remove"} btnClick={handleCancel} />
          </div>

          <div className="flex justify-center items-center mt-4">
            <CommonBtn
              btnName={isSortedAsc ? "Sort by Name (Asc)" : "Sort by Name (Desc)"}
              btnClick={sortByName}
            />
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-black rounded-lg ml-4 p-2 flex-1 md:max-w-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <TabelEmployee employeeDetails={filteredEmployees} />

        <div className="flex justify-center items-center mt-4">
          <CommonBtn
            btnName={"Department"}
            btnClick={navigateToDepartment}
          />
        </div>
      </div>
    </div>
  );
};

export default Employee;
