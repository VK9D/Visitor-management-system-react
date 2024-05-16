// import React, { useState, useEffect, use } from "react";
// import { url } from "../../utils/Constants.jsx";
// import Notification from "../../components/notification/index.jsx";
// import CircularProgress from "@mui/material/CircularProgress";

// const Report = () => {
//     const [reportType, setReportType] = useState("");
//     const [selectedGadget, setSelectedGadget] = useState("");
//     const [selectedZone, setSelectedZone] = useState("");
//     const [selectedUser, setSelectedUser] = useState("");
//     const [selectedVisitor, setSelectedVisitor] = useState("");
//     const [selectedKey, setSelectedKey] = useState("");
//     const [selectedDetailType, setSelectedDetailType] = useState("");
//     const [selectedVisitorReportType, setSelectedVisitorReportType] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [downloadAvailable, setDownloadAvailable] = useState(false);
//     const [viewAvailable, setViewAvailable] = useState(false);

//     const [zoneList, setZoneList] = useState([{}]);
//     const [keyList, setKeyList] = useState([{}]);
//     const [userList, setUserList] = useState([{}]);
//     const [visitorList, setVisitorList] = useState([{}]);


//     const getUserList = async () => {
//         try {
//             const response = await fetch(`${url}/accounts/get-all-user/`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             const json = await response.json();
//             if (response.ok) {
//                 const userDetails = json.results.map((user) => ({
//                     id: user.id,
//                     username: user.username,
//                 }));
//                 setUserList(userDetails);
//             } else {
//                 Notification.showErrorMessage("Try Again!", json.error);
//             }
//         } catch (err) {
//             Notification.showErrorMessage("Erroruser", "Server error!");
//         }
//     };
//     const getVisitorList = async () => {
//         try {
//             const response = await fetch(`${url}/visitor/visitor-info`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             const json = await response.json();
//             if (response.ok) {
//                 const visitorDetails = json.results.map((visitor) => ({
//                     id: visitor.id,
//                     visitorName: visitor.first_name,
//                 }));
//                 setVisitorList(visitorDetails);
//             } else {
//                 Notification.showErrorMessage("Try Again!", json.error);
//             }
//         } catch (err) {
//             Notification.showErrorMessage("Errorvisitor", "Server error!");
//         }
//     };
//     const getZoneList = async () => {
//         try {
//             const response = await fetch(`${url}/zone/zone-info`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             const json = await response.json();
//             if (response.ok) {
//                 const zoneDetails = json.map((zone) => ({
//                     id: zone.id,
//                     zoneName: zone.zone_name,
//                 }));
//                 setZoneList(zoneDetails);
//             } else {
//                 Notification.showErrorMessage("Try Again!", json.error);
//             }
//         } catch (err) {
//             Notification.showErrorMessage("Errorzone", "Server error!");
//         }
//     };
//     const getKeyList = async () => {
//         try {
//             const response = await fetch(`${url}/key/key-info`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             const json = await response.json();
//             if (response.ok) {
//                 const keyDetails = json.map((key) => ({
//                     id: key.id,
//                     RFID_key: key.RFID_key,
//                 }));
//                 setKeyList(keyDetails);
//             } else {
//                 Notification.showErrorMessage("Try Again!", json.error);
//             }
//         } catch (err) {
//             Notification.showErrorMessage("Errorkey", "Server error!");
//         }
//     };

//     useEffect(() => {
//         getUserList();
//         getVisitorList();
//         getZoneList();
//         getKeyList();
//     }, []);


//     const handleView = async () => {
//         if (reportType === "configuration") {
//             setIsLoading(true);
//             let fetchurl = "";

//             if (selectedGadget === "reader") { fetchurl = `${url}/reports/readers?download=false`; }
//             if (selectedGadget === "adam") { fetchurl = `${url}/reports/adam?download=false`; }
//             if (selectedGadget === "zone") { fetchurl = `${url}/reports/zone?download=false`; }
//             if (selectedGadget === "key") { fetchurl = `${url}/reports/key?download=false`; }

//             try {
//                 const response = await fetch(fetchurl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 const json = await response.json();
//                 if (response.ok) {
//                     let simplifiedData = [];
//                     if (selectedGadget === "reader") {
//                         simplifiedData = json.map((item) => {
//                             return {
//                                 adam_name: item.adam_name,
//                                 zone_name: item.zone_name,
//                                 moxa_ip: item.moxa_ip,
//                                 reader_type: item.reader_type,
//                                 com_port: item.com_port ? item.com_port : "N/A",
//                             };
//                         });
//                     }
//                     if (selectedGadget === "adam") {
//                         simplifiedData = json.map((item) => {
//                             return {
//                                 adam_name: item.name,
//                                 ip: item.ip,
//                                 port: item.port,
//                                 address: item.address,
//                             };
//                         });
//                     }
//                     if (selectedGadget === "zone") {
//                         simplifiedData = json.map((item) => {
//                             return {
//                                 zone_name: item.zone_name,
//                                 allow_re_entry: item.allow_re_entry ? "Yes" : "No",
//                                 created_on: new Date(item.created_on).toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }),
//                                 updated_on: new Date(item.updated_on).toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
//                             };
//                         });
//                     }
//                     if (selectedGadget === "key") {
//                         simplifiedData = json.map((item) => {
//                             return {
//                                 image: `data:image/jpeg;base64,${item.image}`,
//                                 visitor_name: item.visitor_name,
//                                 visitor_type: item.visitor_type,
//                                 RFID_key: item.RFID_key,
//                                 visitor_pass: item.visitor_pass,
//                                 visitor_contact: item.contact,
//                             };
//                         });
//                     }
//                     setData(simplifiedData);
//                     setDownloadAvailable(true);
//                 } else {
//                     Notification.showErrorMessage("Error", response.status);
//                 }
//             } catch (error) {
//                 Notification.showErrorMessage("Error", "Server error!");
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "user") {
//             setIsLoading(true);
//             let fetchurl = "";
//             if (selectedDetailType === "userdetails") {
//                 fetchurl = `${url}/reports/user?download=false`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     const json = await response.json();
//                     if (response.ok) {
//                         const simplifiedData = json.map((item) => {
//                             return {
//                                 image: `data:image/jpeg;base64,${item.image}`,
//                                 user_name: item.username,
//                                 phone: item.phone,
//                                 employee_code: item.employee_code,
//                                 last_login: new Date(item.last_login).toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }),
//                                 department: item.department,
//                                 work_location: item.work_location,
//                             };
//                         });
//                         setData(simplifiedData);
//                         setDownloadAvailable(true)
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//                 setIsLoading(false);
//             }
//             if (selectedDetailType === "usersession") {
//                 fetchurl = `${url}/reports/user_session/${selectedUser}?download=false&start_date=${startDate}&end_date=${endDate}`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     const json = await response.json();
//                     if (response.ok) {
//                         const simplifiedData = json.map((item) => {
//                             return {
//                                 username: item.user.username,
//                                 firstName: item.user.first_name,
//                                 lastName: item.user.last_name,
//                                 userType: item.user.user_type,
//                                 phone: item.user.phone,
//                                 employeeCode: item.user.employee_code,
//                                 department: item.user.department,
//                                 loginTime: item.login_time
//                                     ? new Date(item.login_time).toLocaleString("en-IN", {
//                                         year: "numeric",
//                                         month: "2-digit",
//                                         day: "2-digit",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: false,
//                                     })
//                                     : "N/A",
//                                 logoutTime: item.logout_time
//                                     ? new Date(item.logout_time).toLocaleString("en-IN", {
//                                         year: "numeric",
//                                         month: "2-digit",
//                                         day: "2-digit",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: false,
//                                     })
//                                     : "N/A",
//                             };
//                         });
//                         setData(simplifiedData);
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "visitor") {
//             setIsLoading(true);
//             let fetchurl = "";
//             if (selectedVisitorReportType === "visitorsvisiting") {
//                 fetchurl = `${url}/reports/visitor?download=false&start_date=${startDate}&end_date=${endDate}`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     const json = await response.json();
//                     if (response.ok) {
//                         const simplifiedData = json.map((item) => {
//                             return {
//                                 image: `data:image/jpeg;base64,${item.image}`,
//                                 first_name: item.first_name,
//                                 last_name: item.last_name,
//                                 visitor_type: item.visitor_type,
//                                 phone: item.phone,
//                                 gov_id_type: item.gov_id_type,
//                                 gov_id_no: item.gov_id_no,
//                                 blacklisted: item.is_blacklisted ? "Yes" : "No",
//                                 pass_created_on: item.pass_created_on
//                                     ? new Date(item.pass_created_on).toLocaleString("en-IN", {
//                                         year: "numeric",
//                                         month: "2-digit",
//                                         day: "2-digit",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: false,
//                                     })
//                                     : "N/A",
//                             };
//                         });
//                         setData(simplifiedData);
//                         setDownloadAvailable(true);
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//             }
//             if (selectedVisitorReportType === "visitingtozone") {
//                 fetchurl = `${url}/reports/visitor-track/${selectedVisitor}?download=false&start_date=${startDate}&end_date=${endDate}&field=zone_id&value=${selectedZone}`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     const json = await response.json();
//                     if (response.ok) {
//                         const simplifiedData = json.map((item) => {
//                             return {
//                                 username: item.user.username,
//                                 firstName: item.user.first_name,
//                                 lastName: item.user.last_name,
//                                 userType: item.user.user_type,
//                                 phone: item.user.phone,
//                                 address: item.user.address,
//                                 employeeCode: item.user.employee_code,
//                                 department: item.user.department,
//                                 loginTime: item.login_time
//                                     ? new Date(item.login_time).toLocaleString("en-IN", {
//                                         year: "numeric",
//                                         month: "2-digit",
//                                         day: "2-digit",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: false,
//                                     })
//                                     : "N/A",
//                                 logoutTime: item.logout_time
//                                     ? new Date(item.logout_time).toLocaleString("en-IN", {
//                                         year: "numeric",
//                                         month: "2-digit",
//                                         day: "2-digit",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: false,
//                                     })
//                                     : "N/A",
//                             };
//                         });
//                         setData(simplifiedData);
//                         setDownloadAvailable(true);
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "keyassigned") {
//             setIsLoading(true);
//             let fetchurl = "";

//             fetchurl = `${url}/reports/key-assigned/${selectedKey}?download=false&start_date=${startDate}&end_date=${endDate}`;
//             try {
//                 const response = await fetch(fetchurl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 const json = await response.json();
//                 if (response.ok) {
//                     const simplifiedData = json.map((item) => {
//                         return {
//                             image: `data:image/jpeg;base64,${item.image}`,
//                             key: item.key,
//                             visitor_name: item.visitor_name,
//                             visitor_type: item.visitor_type,
//                             contact: item.contact,
//                             visiting_purpose: item.visiting_purpose,
//                             whom_to_visit: item.whom_to_visit,
//                             visiting_department: item.visiting_department,
//                             valid_until: new Date(item.valid_until).toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }),
//                         };
//                     });
//                     setData(simplifiedData);
//                     setDownloadAvailable(true);
//                 } else {
//                     Notification.showErrorMessage("Error", response.status);
//                 }
//             } catch (error) {
//                 Notification.showErrorMessage("Error", "Server error!");
//             }
//             setIsLoading(false);
//         }
//     };

//     const handleDownload = async () => {
//         if (reportType === "configuration") {
//             setIsLoading(true);
//             let fetchurl = "";
//             let filename = "";
//             const date = new Date();
//             const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
//                 date.getMonth() + 1
//             )
//                 .toString()
//                 .padStart(2, "0")}-${date.getFullYear()}`;

//             if (selectedGadget === "reader") {
//                 fetchurl = `${url}/reports/readers?download=true`;
//                 filename = `reader-report-${formattedDate}.pdf`;
//             }
//             if (selectedGadget === "adam") {
//                 fetchurl = `${url}/reports/adam?download=true`;
//                 filename = `adam-report-${formattedDate}.pdf`;
//             }
//             if (selectedGadget === "zone") {
//                 fetchurl = `${url}/reports/zone?download=true`;
//                 filename = `zone-report-${formattedDate}.pdf`;
//             }
//             if (selectedGadget === "key") {
//                 fetchurl = `${url}/reports/key?download=true`;
//                 filename = `key-report-${formattedDate}.pdf`;
//             }

//             try {
//                 const response = await fetch(fetchurl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const link = document.createElement("a");
//                     link.href = window.URL.createObjectURL(blob);
//                     link.download = filename;
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                 } else {
//                     Notification.showErrorMessage("Error", response.status);
//                 }
//             } catch (error) {
//                 Notification.showErrorMessage("Error", "Server error!");
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "user") {
//             setIsLoading(true);
//             let fetchurl = "";
//             let filename = "";
//             const date = new Date();
//             const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
//                 date.getMonth() + 1
//             )
//                 .toString()
//                 .padStart(2, "0")}-${date.getFullYear()}`;

//             if (selectedDetailType === "userdetails") {
//                 fetchurl = `${url}/reports/user?download=true`;
//                 filename = `users-detail-report-${formattedDate}.pdf`;
//             }
//             if (selectedDetailType === "usersession") {
//                 fetchurl = `${url}/reports/user_session/${selectedUser}?download=true&start_date=${startDate}&end_date=${endDate}`;
//                 filename = `user-session-report-${formattedDate}.pdf`;
//             }
//             try {
//                 const response = await fetch(fetchurl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const link = document.createElement("a");
//                     link.href = window.URL.createObjectURL(blob);
//                     link.download = filename;
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                 } else {
//                     Notification.showErrorMessage("Error", response.status);
//                 }
//             } catch (error) {
//                 Notification.showErrorMessage("Error", "Server error!");
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "visitor") {
//             setIsLoading(true);
//             let fetchurl = "";
//             let filename = "";
//             const date = new Date();
//             const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
//                 date.getMonth() + 1
//             )
//                 .toString()
//                 .padStart(2, "0")}-${date.getFullYear()}`;

//             if (selectedVisitorReportType === "visitorsvisiting") {
//                 fetchurl = `${url}/reports/visitor?download=true&start_date=${startDate}&end_date=${endDate}`;
//                 filename = `visitor-visiting-report-${formattedDate}.pdf`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     if (response.ok) {
//                         const blob = await response.blob();
//                         const link = document.createElement("a");
//                         link.href = window.URL.createObjectURL(blob);
//                         link.download = filename;
//                         document.body.appendChild(link);
//                         link.click();
//                         document.body.removeChild(link);
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//             }
//             if (selectedVisitorReportType === "visitingtozone") {
//                 fetchurl = `${url}/reports/visitor-track/${selectedVisitor}?download=true&start_date=${startDate}&end_date=${endDate}&field=zone_id&value=${selectedZone}`;
//                 filename = `visitor-visiting-report-${formattedDate}.pdf`;
//                 try {
//                     const response = await fetch(fetchurl, {
//                         method: "GET",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     });
//                     if (response.ok) {
//                         const blob = await response.blob();
//                         const link = document.createElement("a");
//                         link.href = window.URL.createObjectURL(blob);
//                         link.download = filename;
//                         document.body.appendChild(link);
//                         link.click();
//                         document.body.removeChild(link);
//                     } else {
//                         Notification.showErrorMessage("Error", response.status);
//                     }
//                 } catch (error) {
//                     Notification.showErrorMessage("Error", "Server error!");
//                 }
//             }
//             setIsLoading(false);
//         }

//         if (reportType === "keyassigned") {
//             setIsLoading(true);
//             let fetchurl = "";
//             let filename = "";
//             const date = new Date();
//             const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
//                 date.getMonth() + 1
//             )
//                 .toString()
//                 .padStart(2, "0")}-${date.getFullYear()}`;

//             fetchurl = `${url}/reports/key-assigned/${selectedKey}?download=true&start_date=${startDate}&end_date=${endDate}`;
//             filename = `key-assigned-report-${formattedDate}.pdf`;
//             try {
//                 const response = await fetch(fetchurl, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const link = document.createElement("a");
//                     link.href = window.URL.createObjectURL(blob);
//                     link.download = filename;
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
//                 } else {
//                     Notification.showErrorMessage("Error", response.status);
//                 }
//             } catch (error) {
//                 Notification.showErrorMessage("Error", "Server error!");
//             }
//             setIsLoading(false);
//         }
//     };

//     const resetDownload = () => {
//         setDownloadAvailable(false);
//     };

//     const headers = data.length > 0 ? Object.keys(data[0]) : [];

//     return (
//         <div className="flex flex-col h-screen">
//             <div className="flex flex-row p-4 shadow-md">
//                 <div className="flex flex-wrap items-center gap-4">
//                     <select
//                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                         onChange={(e) => {
//                             setReportType(e.target.value);
//                             resetDownload();
//                         }}
//                     >
//                         <option value="">Select Report Type</option>
//                         <option value="configuration">Configuration Report</option>
//                         <option value="user">User Report</option>
//                         <option value="visitor">Visitor Report</option>
//                         <option value="keyassigned">Key Assigned Report</option>
//                     </select>

//                     {reportType === "configuration" && (
//                         <select
//                             className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                             onChange={(e) => {
//                                 setSelectedGadget(e.target.value);
//                                 resetDownload();
//                             }}
//                         >
//                             <option value="">Select Gadget</option>
//                             <option value="reader">Reader</option>
//                             <option value="key">Key</option>
//                             <option value="zone">Zone</option>
//                             <option value="adam">Adam</option>
//                         </select>
//                     )}

//                     {reportType === "user" && (
//                         <>
//                             <select
//                                 className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                 onChange={(e) => {
//                                     setSelectedDetailType(e.target.value);
//                                     resetDownload();
//                                 }}
//                             >
//                                 <option value="">Select type</option>
//                                 <option value="userdetails">Users Detail</option>
//                                 <option value="usersession">Users Session</option>
//                             </select>
//                             {selectedDetailType === "usersession" && (
//                                 <>
//                                     <select
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setSelectedUser(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     >
//                                         <option value="">Select User</option>
//                                         {userList.map((user, index) => (
//                                             <option key={index} value={user.id}>
//                                                 {user.username}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setStartDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setEndDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                 </>
//                             )}
//                         </>
//                     )}

//                     {reportType === "visitor" && (
//                         <>
//                             <select
//                                 className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                 onChange={(e) => {
//                                     setSelectedVisitorReportType(e.target.value);
//                                     resetDownload();
//                                 }}
//                             >
//                                 <option value="">Select Report</option>
//                                 <option value="visitorsvisiting">Visiting Report</option>
//                                 <option value="visitingtozone">Visiting to Zone</option>
//                             </select>
//                             {selectedVisitorReportType === "visitorsvisiting" && (
//                                 <>
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setStartDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setEndDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                 </>
//                             )}
//                             {selectedVisitorReportType === "visitingtozone" && (
//                                 <>
//                                     <select
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setSelectedVisitor(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     >
//                                         <option value="">Select Visitor</option>
//                                         {visitorList.map((visitor, index) => (
//                                             <option key={index} value={visitor.id}>
//                                                 {visitor.visitorName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <select
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setSelectedZone(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     >
//                                         <option value="">Select Zone</option>
//                                         {zoneList.map((zone, index) => (
//                                             <option key={index} value={zone.id}>
//                                                 {zone.zoneName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setStartDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                     <input
//                                         type="date"
//                                         className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                         onChange={(e) => {
//                                             setEndDate(e.target.value);
//                                             resetDownload();
//                                         }}
//                                     />
//                                 </>
//                             )}
//                         </>
//                     )}

//                     {reportType === "keyassigned" && (
//                         <>
//                             <select
//                                 className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                 onChange={(e) => {
//                                     setSelectedKey(e.target.value);
//                                     resetDownload();
//                                 }}
//                             >
//                                 <option value="">Select Key</option>
//                                 {keyList.map((key, index) => (
//                                     <option key={index} value={key.id}>
//                                         {key.RFID_key}
//                                     </option>
//                                 ))}
//                             </select>
//                             <input
//                                 type="date"
//                                 className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                 onChange={(e) => {
//                                     setStartDate(e.target.value);
//                                     resetDownload();
//                                 }}
//                             />
//                             <input
//                                 type="date"
//                                 className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
//                                 onChange={(e) => {
//                                     setEndDate(e.target.value);
//                                     resetDownload();
//                                 }}
//                             />
//                         </>
//                     )}
//                 </div>

//                 <div className="flex justify-between items-center m-6">
//                     <button
//                         className="bg-customGreen hover:bg-green-700 text-white rounded-3xl shadow-md flex items-center py-2 px-6"
//                         onClick={handleView}
//                     >
//                         View Report
//                     </button>
//                     {downloadAvailable && (
//                         <button
//                             className="bg-green-500 hover:bg-green-700 text-white rounded-3xl shadow-md flex items-center py-2 px-6 ml-2"
//                             onClick={handleDownload}
//                         >
//                             Download
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {isLoading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <CircularProgress />
//                 </div>
//             ) : data.length > 0 ? (
//                 <div className="flex-grow overflow-auto p-4">
//                     <table className="min-w-full leading-normal">
//                         <thead>
//                             <tr>
//                                 {headers.map((header) => (
//                                     <th
//                                         key={header}
//                                         className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                                     >
//                                         {header.replace("_", " ")}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((item) => (
//                                 <tr key={item.id}>
//                                     {headers.map((header) => (
//                                         <td
//                                             key={header}
//                                             className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
//                                         >
//                                             {header === 'image' ? (
//                                                 <div className="inline-block h-16 w-16 border-2 border-gray-300 overflow-hidden bg-customGreen">
//                                                     {item[header] ? (
//                                                         <img src={item[header]} alt="Image" />
//                                                     ) : (
//                                                         <div className="h-full w-full flex items-center justify-center text-white bg-customGreen">
//                                                             N/A
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ) : (
//                                                 item[header]
//                                             )}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div className="flex justify-center items-center h-64">
//                     <p>No data found.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Report;


import React, { useState, useEffect } from "react";
import { url } from "../../utils/Constants.jsx";
import Notification from "../../components/notification/index.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const Report = () => {
    const [reportType, setReportType] = useState("");
    const [selectedGadget, setSelectedGadget] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedVisitor, setSelectedVisitor] = useState("");
    const [selectedKey, setSelectedKey] = useState("");
    const [selectedDetailType, setSelectedDetailType] = useState("");
    const [selectedVisitorReportType, setSelectedVisitorReportType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadAvailable, setDownloadAvailable] = useState(false);

    const [zoneList, setZoneList] = useState([]);
    const [keyList, setKeyList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [visitorList, setVisitorList] = useState([]);

    const [errors, setErrors] = useState({});

    const getUserList = async () => {
        try {
            const response = await fetch(`${url}/accounts/get-all-user/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                const userDetails = json.results.map((user) => ({
                    id: user.id,
                    username: user.username,
                }));
                setUserList(userDetails);
            } else {
                Notification.showErrorMessage("Try Again!", json.error);
            }
        } catch (err) {
            Notification.showErrorMessage("Erroruser", "Server error!");
        }
    };

    const getVisitorList = async () => {
        try {
            const response = await fetch(`${url}/visitor/visitor-info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                const visitorDetails = json.results.map((visitor) => ({
                    id: visitor.id,
                    visitorName: visitor.first_name,
                }));
                setVisitorList(visitorDetails);
            } else {
                Notification.showErrorMessage("Try Again!", json.error);
            }
        } catch (err) {
            Notification.showErrorMessage("Errorvisitor", "Server error!");
        }
    };

    const getZoneList = async () => {
        try {
            const response = await fetch(`${url}/zone/zone-info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                const zoneDetails = json.map((zone) => ({
                    id: zone.id,
                    zoneName: zone.zone_name,
                }));
                setZoneList(zoneDetails);
            } else {
                Notification.showErrorMessage("Try Again!", json.error);
            }
        } catch (err) {
            Notification.showErrorMessage("Errorzone", "Server error!");
        }
    };

    const getKeyList = async () => {
        try {
            const response = await fetch(`${url}/key/key-info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                const keyDetails = json.map((key) => ({
                    id: key.id,
                    RFID_key: key.RFID_key,
                }));
                setKeyList(keyDetails);
            } else {
                Notification.showErrorMessage("Try Again!", json.error);
            }
        } catch (err) {
            Notification.showErrorMessage("Errorkey", "Server error!");
        }
    };

    useEffect(() => {
        getUserList();
        getVisitorList();
        getZoneList();
        getKeyList();
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!reportType) {
            newErrors.reportType = "Please select a report type.";
        }

        if (reportType === "configuration" && !selectedGadget) {
            newErrors.selectedGadget = "Please select a gadget.";
        }

        if (reportType === "user") {
            if (!selectedDetailType) {
                newErrors.selectedDetailType = "Please select a detail type.";
            }
            if (selectedDetailType === "usersession") {
                if (!selectedUser) {
                    newErrors.selectedUser = "Please select a user.";
                }
                if (!startDate) {
                    newErrors.startDate = "Please select a start date.";
                }
                if (!endDate) {
                    newErrors.endDate = "Please select an end date.";
                }
            }
        }

        if (reportType === "visitor") {
            if (!selectedVisitorReportType) {
                newErrors.selectedVisitorReportType = "Please select a report type.";
            }
            if (selectedVisitorReportType === "visitorsvisiting") {
                if (!startDate) {
                    newErrors.startDate = "Please select a start date.";
                }
                if (!endDate) {
                    newErrors.endDate = "Please select an end date.";
                }
            }
            if (selectedVisitorReportType === "visitingtozone") {
                if (!selectedVisitor) {
                    newErrors.selectedVisitor = "Please select a visitor.";
                }
                if (!selectedZone) {
                    newErrors.selectedZone = "Please select a zone.";
                }
                if (!startDate) {
                    newErrors.startDate = "Please select a start date.";
                }
                if (!endDate) {
                    newErrors.endDate = "Please select an end date.";
                }
            }
        }

        if (reportType === "keyassigned") {
            if (!selectedKey) {
                newErrors.selectedKey = "Please select a key.";
            }
            if (!startDate) {
                newErrors.startDate = "Please select a start date.";
            }
            if (!endDate) {
                newErrors.endDate = "Please select an end date.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleView = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        let fetchurl = "";

        if (reportType === "configuration") {
            if (selectedGadget === "reader") fetchurl = `${url}/reports/readers?download=false`;
            if (selectedGadget === "adam") fetchurl = `${url}/reports/adam?download=false`;
            if (selectedGadget === "zone") fetchurl = `${url}/reports/zone?download=false`;
            if (selectedGadget === "key") fetchurl = `${url}/reports/key?download=false`;
        }

        if (reportType === "user") {
            if (selectedDetailType === "userdetails") {
                fetchurl = `${url}/reports/user?download=false`;
            }
            if (selectedDetailType === "usersession") {
                fetchurl = `${url}/reports/user_session/${selectedUser}?download=false&start_date=${startDate}&end_date=${endDate}`;
            }
        }

        if (reportType === "visitor") {
            if (selectedVisitorReportType === "visitorsvisiting") {
                fetchurl = `${url}/reports/visitor?download=false&start_date=${startDate}&end_date=${endDate}`;
            }
            if (selectedVisitorReportType === "visitingtozone") {
                fetchurl = `${url}/reports/visitor-track/${selectedVisitor}?download=false&start_date=${startDate}&end_date=${endDate}&field=zone_id&value=${selectedZone}`;
            }
        }

        if (reportType === "keyassigned") {
            fetchurl = `${url}/reports/key-assigned/${selectedKey}?download=false&start_date=${startDate}&end_date=${endDate}`;
        }

        try {
            const response = await fetch(fetchurl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                let simplifiedData = [];
                if (reportType === "configuration") {
                    if (selectedGadget === "reader") {
                        simplifiedData = json.map((item) => ({
                            adam_name: item.adam_name,
                            zone_name: item.zone_name,
                            moxa_ip: item.moxa_ip,
                            reader_type: item.reader_type,
                            com_port: item.com_port ? item.com_port : "N/A",
                        }));
                    }
                    if (selectedGadget === "adam") {
                        simplifiedData = json.map((item) => ({
                            adam_name: item.name,
                            ip: item.ip,
                            port: item.port,
                            address: item.address,
                        }));
                    }
                    if (selectedGadget === "zone") {
                        simplifiedData = json.map((item) => ({
                            zone_name: item.zone_name,
                            allow_re_entry: item.allow_re_entry ? "Yes" : "No",
                            created_on: new Date(item.created_on).toLocaleString('en-IN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }),
                            updated_on: new Date(item.updated_on).toLocaleString('en-IN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }),
                        }));
                    }
                    if (selectedGadget === "key") {
                        simplifiedData = json.map((item) => ({
                            image: `data:image/jpeg;base64,${item.image}`,
                            visitor_name: item.visitor_name,
                            visitor_type: item.visitor_type,
                            RFID_key: item.RFID_key,
                            visitor_pass: item.visitor_pass,
                            visitor_contact: item.contact,
                        }));
                    }
                }
                if (reportType === "user") {
                    if (selectedDetailType === "userdetails") {
                        simplifiedData = json.map((item) => ({
                            image: `data:image/jpeg;base64,${item.image}`,
                            user_name: item.username,
                            phone: item.phone,
                            employee_code: item.employee_code,
                            last_login: new Date(item.last_login).toLocaleString('en-IN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            }),
                            department: item.department,
                            work_location: item.work_location,
                        }));
                    }
                    if (selectedDetailType === "usersession") {
                        simplifiedData = json.map((item) => ({
                            username: item.user.username,
                            firstName: item.user.first_name,
                            lastName: item.user.last_name,
                            userType: item.user.user_type,
                            phone: item.user.phone,
                            employeeCode: item.user.employee_code,
                            department: item.user.department,
                            loginTime: item.login_time
                                ? new Date(item.login_time).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })
                                : "N/A",
                            logoutTime: item.logout_time
                                ? new Date(item.logout_time).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })
                                : "N/A",
                        }));
                    }
                }
                if (reportType === "visitor") {
                    if (selectedVisitorReportType === "visitorsvisiting") {
                        simplifiedData = json.map((item) => ({
                            image: `data:image/jpeg;base64,${item.image}`,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            visitor_type: item.visitor_type,
                            phone: item.phone,
                            gov_id_type: item.gov_id_type,
                            gov_id_no: item.gov_id_no,
                            blacklisted: item.is_blacklisted ? "Yes" : "No",
                            pass_created_on: item.pass_created_on
                                ? new Date(item.pass_created_on).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })
                                : "N/A",
                        }));
                    }
                    if (selectedVisitorReportType === "visitingtozone") {
                        simplifiedData = json.map((item) => ({
                            username: item.user.username,
                            firstName: item.user.first_name,
                            lastName: item.user.last_name,
                            userType: item.user.user_type,
                            phone: item.user.phone,
                            address: item.user.address,
                            employeeCode: item.user.employee_code,
                            department: item.user.department,
                            loginTime: item.login_time
                                ? new Date(item.login_time).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })
                                : "N/A",
                            logoutTime: item.logout_time
                                ? new Date(item.logout_time).toLocaleString("en-IN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })
                                : "N/A",
                        }));
                    }
                }
                if (reportType === "keyassigned") {
                    simplifiedData = json.map((item) => ({
                        image: `data:image/jpeg;base64,${item.image}`,
                        key: item.key,
                        visitor_name: item.visitor_name,
                        visitor_type: item.visitor_type,
                        contact: item.contact,
                        visiting_purpose: item.visiting_purpose,
                        whom_to_visit: item.whom_to_visit,
                        visiting_department: item.visiting_department,
                        valid_until: new Date(item.valid_until).toLocaleString('en-IN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }),
                    }));
                }
                setData(simplifiedData);
                setDownloadAvailable(true);
            } else {
                Notification.showErrorMessage("Error", response.status);
            }
        } catch (error) {
            Notification.showErrorMessage("Error", "Server error!");
        }
        setIsLoading(false);
    };

    const handleDownload = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        let fetchurl = "";
        let filename = "";
        const date = new Date();
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;

        if (reportType === "configuration") {
            if (selectedGadget === "reader") {
                fetchurl = `${url}/reports/readers?download=true`;
                filename = `reader-report-${formattedDate}.pdf`;
            }
            if (selectedGadget === "adam") {
                fetchurl = `${url}/reports/adam?download=true`;
                filename = `adam-report-${formattedDate}.pdf`;
            }
            if (selectedGadget === "zone") {
                fetchurl = `${url}/reports/zone?download=true`;
                filename = `zone-report-${formattedDate}.pdf`;
            }
            if (selectedGadget === "key") {
                fetchurl = `${url}/reports/key?download=true`;
                filename = `key-report-${formattedDate}.pdf`;
            }
        }

        if (reportType === "user") {
            if (selectedDetailType === "userdetails") {
                fetchurl = `${url}/reports/user?download=true`;
                filename = `users-detail-report-${formattedDate}.pdf`;
            }
            if (selectedDetailType === "usersession") {
                fetchurl = `${url}/reports/user_session/${selectedUser}?download=true&start_date=${startDate}&end_date=${endDate}`;
                filename = `user-session-report-${formattedDate}.pdf`;
            }
        }

        if (reportType === "visitor") {
            if (selectedVisitorReportType === "visitorsvisiting") {
                fetchurl = `${url}/reports/visitor?download=true&start_date=${startDate}&end_date=${endDate}`;
                filename = `visitor-visiting-report-${formattedDate}.pdf`;
            }
            if (selectedVisitorReportType === "visitingtozone") {
                fetchurl = `${url}/reports/visitor-track/${selectedVisitor}?download=true&start_date=${startDate}&end_date=${endDate}&field=zone_id&value=${selectedZone}`;
                filename = `visitor-visiting-report-${formattedDate}.pdf`;
            }
        }

        if (reportType === "keyassigned") {
            fetchurl = `${url}/reports/key-assigned/${selectedKey}?download=true&start_date=${startDate}&end_date=${endDate}`;
            filename = `key-assigned-report-${formattedDate}.pdf`;
        }

        try {
            const response = await fetch(fetchurl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                Notification.showErrorMessage("Error", response.status);
            }
        } catch (error) {
            Notification.showErrorMessage("Error", "Server error!");
        }
        setIsLoading(false);
    };

    const resetDownload = () => {
        setDownloadAvailable(false);
    };

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row p-4 shadow-md">
                <div className="flex flex-wrap items-center gap-4">
                    <select
                        className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                        onChange={(e) => {
                            setReportType(e.target.value);
                            resetDownload();
                        }}
                    >
                        <option value="">Select Report Type</option>
                        <option value="configuration">Configuration Report</option>
                        <option value="user">User Report</option>
                        <option value="visitor">Visitor Report</option>
                        <option value="keyassigned">Key Assigned Report</option>
                    </select>
                    {errors.reportType && (
                        <p className="text-red-500 text-xs italic">{errors.reportType}</p>
                    )}

                    {reportType === "configuration" && (
                        <div>
                            <select
                                className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                onChange={(e) => {
                                    setSelectedGadget(e.target.value);
                                    resetDownload();
                                }}
                            >
                                <option value="">Select Gadget</option>
                                <option value="reader">Reader</option>
                                <option value="key">Key</option>
                                <option value="zone">Zone</option>
                                <option value="adam">Adam</option>
                            </select>
                            {errors.selectedGadget && (
                                <p className="text-red-500 text-xs italic">{errors.selectedGadget}</p>
                            )}
                        </div>
                    )}

                    {reportType === "user" && (
                        <>
                            <div>
                                <select
                                    className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    onChange={(e) => {
                                        setSelectedDetailType(e.target.value);
                                        resetDownload();
                                    }}
                                >
                                    <option value="">Select type</option>
                                    <option value="userdetails">Users Detail</option>
                                    <option value="usersession">Users Session</option>
                                </select>
                                {errors.selectedDetailType && (
                                    <p className="text-red-500 text-xs italic">{errors.selectedDetailType}</p>
                                )}
                            </div>
                            {selectedDetailType === "usersession" && (
                                <>
                                    <div>
                                        <select
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setSelectedUser(e.target.value);
                                                resetDownload();
                                            }}
                                        >
                                            <option value="">Select User</option>
                                            {userList.map((user, index) => (
                                                <option key={index} value={user.id}>
                                                    {user.username}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.selectedUser && (
                                            <p className="text-red-500 text-xs italic">{errors.selectedUser}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.startDate && (
                                            <p className="text-red-500 text-xs italic">{errors.startDate}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.endDate && (
                                            <p className="text-red-500 text-xs italic">{errors.endDate}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {reportType === "visitor" && (
                        <>
                            <div>
                                <select
                                    className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    onChange={(e) => {
                                        setSelectedVisitorReportType(e.target.value);
                                        resetDownload();
                                    }}
                                >
                                    <option value="">Select Report</option>
                                    <option value="visitorsvisiting">Visiting Report</option>
                                    <option value="visitingtozone">Visiting to Zone</option>
                                </select>
                                {errors.selectedVisitorReportType && (
                                    <p className="text-red-500 text-xs italic">{errors.selectedVisitorReportType}</p>
                                )}
                            </div>
                            {selectedVisitorReportType === "visitorsvisiting" && (
                                <>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.startDate && (
                                            <p className="text-red-500 text-xs italic">{errors.startDate}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.endDate && (
                                            <p className="text-red-500 text-xs italic">{errors.endDate}</p>
                                        )}
                                    </div>
                                </>
                            )}
                            {selectedVisitorReportType === "visitingtozone" && (
                                <>
                                    <div>
                                        <select
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setSelectedVisitor(e.target.value);
                                                resetDownload();
                                            }}
                                        >
                                            <option value="">Select Visitor</option>
                                            {visitorList.map((visitor, index) => (
                                                <option key={index} value={visitor.id}>
                                                    {visitor.visitorName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.selectedVisitor && (
                                            <p className="text-red-500 text-xs italic">{errors.selectedVisitor}</p>
                                        )}
                                    </div>
                                    <div>
                                        <select
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setSelectedZone(e.target.value);
                                                resetDownload();
                                            }}
                                        >
                                            <option value="">Select Zone</option>
                                            {zoneList.map((zone, index) => (
                                                <option key={index} value={zone.id}>
                                                    {zone.zoneName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.selectedZone && (
                                            <p className="text-red-500 text-xs italic">{errors.selectedZone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.startDate && (
                                            <p className="text-red-500 text-xs italic">{errors.startDate}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                resetDownload();
                                            }}
                                        />
                                        {errors.endDate && (
                                            <p className="text-red-500 text-xs italic">{errors.endDate}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {reportType === "keyassigned" && (
                        <>
                            <div>
                                <select
                                    className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    onChange={(e) => {
                                        setSelectedKey(e.target.value);
                                        resetDownload();
                                    }}
                                >
                                    <option value="">Select Key</option>
                                    {keyList.map((key, index) => (
                                        <option key={index} value={key.id}>
                                            {key.RFID_key}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedKey && (
                                    <p className="text-red-500 text-xs italic">{errors.selectedKey}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        resetDownload();
                                    }}
                                />
                                {errors.startDate && (
                                    <p className="text-red-500 text-xs italic">{errors.startDate}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    className="appearance-none border border-customGreen rounded-3xl bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        resetDownload();
                                    }}
                                />
                                {errors.endDate && (
                                    <p className="text-red-500 text-xs italic">{errors.endDate}</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-between items-center m-6">
                    <button
                        className="bg-customGreen hover:bg-green-700 text-white rounded-3xl shadow-md flex items-center py-2 px-6"
                        onClick={handleView}
                    >
                        View Report
                    </button>
                    {downloadAvailable && (
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white rounded-3xl shadow-md flex items-center py-2 px-6 ml-2"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : data.length > 0 ? (
                <div className="flex-grow overflow-auto p-4">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        {header.replace("_", " ")}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    {headers.map((header) => (
                                        <td
                                            key={header}
                                            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                        >
                                            {header === 'image' ? (
                                                <div className="inline-block h-16 w-16 border-2 border-gray-300 overflow-hidden bg-customGreen">
                                                    {item[header] ? (
                                                        <img src={item[header]} alt="Image" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-white bg-customGreen">
                                                            N/A
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                item[header]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p>No data found.</p>
                </div>
            )}
        </div>
    );
};

export default Report;

