document.addEventListener('keydown', function (e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    alert('Error');
  }

  // Ctrl + Shift + I/J/C
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
    e.preventDefault();
    alert('Error');
  }

  // Ctrl + U
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    alert('Error');
  }
});

/* DataFormat_V1.5 */
const fieldMapV1 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "devTemp"],
  [4, 43, "cid"],
  [4, 47, "rsrp"],
  [4, 51, "rsrq"],
  [4, 55, "snr"],
  [10, 59, "devNo"],
  [4, 69, "devFw"],
  [2, 73, "devVolt"],
  [8, 75, "meterNo"],
  [2, 83, "meterType"],
  [2, 85, "meterCaliber"],
  [2, 87, "meterStatus"],
  [2, 89, "msrCycle"],
  [2, 91, "msrReport"],
  [2, 93, "year"],
  [2, 95, "month"],
  [2, 97, "day"],
  [2, 99, "hour"],
  [2, 101, "minute"],
  [2, 103, "second"],
  [2, 105, "msrCycle"],
  [2, 107, "msrCnt"],
  [2, 109, "msrStdIdx"],
  [8, 111, "msrStdValue"],
  [4, 119, "msrOffset 0"],
  [4, 123, "msrOffset 1"],
  [4, 127, "msrOffset 2"],
  [4, 131, "msrOffset 3"],
  [4, 135, "msrOffset 4"],
  [4, 139, "msrOffset 5"],
  [4, 143, "msrOffset 6"],
  [4, 147, "msrOffset 7"],
  [4, 151, "msrOffset 8"],
  [4, 155, "msrOffset 9"],
  [4, 159, "msrOffset 10"],
  [4, 163, "msrOffset 11"],
  [4, 167, "msrOffset 12"],
  [4, 171, "msrOffset 13"],
  [4, 175, "msrOffset 14"],
  [4, 179, "msrOffset 15"],
  [4, 183, "msrOffset 16"],
  [4, 187, "msrOffset 17"],
  [4, 191, "msrOffset 18"],
  [4, 195, "msrOffset 19"],
  [4, 199, "msrOffset 20"],
  [4, 203, "msrOffset 21"],
  [4, 207, "msrOffset 22"],
  [4, 211, "msrOffset 23"]
];

/* DataFormat_V1.5 (Temp) */
const fieldMapV2 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "ber"],
  [4, 43, "cid"],
  [4, 47, "rsrp"],
  [4, 51, "rsrq"],
  [4, 55, "snr"],
  [10, 59, "vendor_devNo"],
  [4, 69, "devFw"],
  [2, 73, "devVolt"],
  [8, 75, "meterNo"],
  [2, 83, "meterType"],
  [2, 85, "meterCaliber"],
  [2, 87, "meterStatus"],
  [2, 89, "msrCycle"],
  [2, 91, "msrReport"],
  [2, 93, "year"],
  [2, 95, "month"],
  [2, 97, "day"],
  [2, 99, "hour"],
  [2, 101, "minute"],
  [2, 103, "second"],
  [2, 105, "msrCycle"],
  [2, 107, "msrCnt"],
  [2, 109, "msrStdIdx"],
  [8, 111, "msrStdValue"],
  [4, 119, "msrOffset 0"],
  [4, 123, "tempValue 0"],
  [4, 127, "msrOffset 1"],
  [4, 131, "tempValue 1"],
  [4, 135, "msrOffset 2"],
  [4, 139, "tempValue 2"],
  [4, 143, "msrOffset 3"],
  [4, 147, "tempValue 3"],
  [4, 151, "msrOffset 4"],
  [4, 155, "tempValue 4"],
  [4, 159, "msrOffset 5"],
  [4, 163, "tempValue 5"],
  [4, 167, "msrOffset 6"],
  [4, 171, "tempValue 6"],
  [4, 175, "msrOffset 7"],
  [4, 179, "tempValue 7"],
  [4, 183, "msrOffset 8"],
  [4, 187, "tempValue 8"],
  [4, 191, "msrOffset 9"],
  [4, 195, "tempValue 9"],
  [4, 199, "msrOffset 10"],
  [4, 203, "tempValue 10"],
  [4, 207, "msrOffset 11"],
  [4, 211, "tempValue 11"],
  [4, 215, "msrOffset 12"],
  [4, 219, "tempValue 12"],
  [4, 223, "msrOffset 13"],
  [4, 227, "tempValue 13"],
  [4, 231, "msrOffset 14"],
  [4, 235, "tempValue 14"],
  [4, 239, "msrOffset 15"],
  [4, 243, "tempValue 15"],
  [4, 247, "msrOffset 16"],
  [4, 251, "tempValue 16"],
  [4, 255, "msrOffset 17"],
  [4, 259, "tempValue 17"],
  [4, 263, "msrOffset 18"],
  [4, 267, "tempValue 18"],
  [4, 271, "msrOffset 19"],
  [4, 275, "tempValue 19"],
  [4, 279, "msrOffset 20"],
  [4, 283, "tempValue 20"],
  [4, 287, "msrOffset 21"],
  [4, 291, "tempValue 21"],
  [4, 295, "msrOffset 22"],
  [4, 299, "tempValue 22"],
  [4, 303, "msrOffset 23"],
  [4, 307, "tempValue 23"]
];

/* DataFormat_V1.5 (Temp + Cable) */
const fieldMapV3 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "ber"],
  [4, 43, "cid"],
  [4, 47, "rsrp"],
  [4, 51, "rsrq"],
  [4, 55, "snr"],
  [10, 59, "devNo"],
  [4, 69, "devFw"],
  [2, 73, "devVolt"],
  [8, 75, "meterNo"],
  [2, 83, "meterType"],
  [2, 85, "meterCaliber"],
  [2, 87, "meterStatus"],
  [2, 89, "msrCycle"],
  [2, 91, "msrReport"],
  [2, 93, "year"],
  [2, 95, "month"],
  [2, 97, "day"],
  [2, 99, "hour"],
  [2, 101, "minute"],
  [2, 103, "second"],
  [2, 105, "msrCycle"],
  [2, 107, "msrCnt"],
  [2, 109, "msrStdIdx"],
  [8, 111, "msrStdValue"],
  [4, 119, "msrOffset 0"],
  [4, 123, "tempValue 0"],
  [4, 127, "msrOffset 1"],
  [4, 131, "tempValue 1"],
  [4, 135, "msrOffset 2"],
  [4, 139, "tempValue 2"],
  [4, 143, "msrOffset 3"],
  [4, 147, "tempValue 3"],
  [4, 151, "msrOffset 4"],
  [4, 155, "tempValue 4"],
  [4, 159, "msrOffset 5"],
  [4, 163, "tempValue 5"],
  [4, 167, "msrOffset 6"],
  [4, 171, "tempValue 6"],
  [4, 175, "msrOffset 7"],
  [4, 179, "tempValue 7"],
  [4, 183, "msrOffset 8"],
  [4, 187, "tempValue 8"],
  [4, 191, "msrOffset 9"],
  [4, 195, "tempValue 9"],
  [4, 199, "msrOffset 10"],
  [4, 203, "tempValue 10"],
  [4, 207, "msrOffset 11"],
  [4, 211, "tempValue 11"],
  [4, 215, "msrOffset 12"],
  [4, 219, "tempValue 12"],
  [4, 223, "msrOffset 13"],
  [4, 227, "tempValue 13"],
  [4, 231, "msrOffset 14"],
  [4, 235, "tempValue 14"],
  [4, 239, "msrOffset 15"],
  [4, 243, "tempValue 15"],
  [4, 247, "msrOffset 16"],
  [4, 251, "tempValue 16"],
  [4, 255, "msrOffset 17"],
  [4, 259, "tempValue 17"],
  [4, 263, "msrOffset 18"],
  [4, 267, "tempValue 18"],
  [4, 271, "msrOffset 19"],
  [4, 275, "tempValue 19"],
  [4, 279, "msrOffset 20"],
  [4, 283, "tempValue 20"],
  [4, 287, "msrOffset 21"],
  [4, 291, "tempValue 21"],
  [4, 295, "msrOffset 22"],
  [4, 299, "tempValue 22"],
  [4, 303, "msrOffset 23"],
  [4, 307, "tempValue 23"]
];

/* DataFormat_V1.7 */
const fieldMapV4 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "ber"],
  [8, 43, "cid"],
  [4, 51, "rsrp"],
  [4, 55, "rsrq"],
  [4, 59, "snr"],
  [10, 63, "devNo"],
  [4, 73, "devFw"],
  [2, 77, "devVolt"],
  [8, 79, "meterNo"],
  [2, 87, "meterType"],
  [2, 89, "meterCaliber"],
  [2, 91, "meterStatus"],
  [2, 93, "msrCycle"],
  [2, 95, "msrReport"],
  [2, 97, "year"],
  [2, 99, "month"],
  [2, 101, "day"],
  [2, 103, "hour"],
  [2, 105, "minute"],
  [2, 107, "second"],
  [2, 109, "msrCycle"],
  [2, 111, "msrCnt"],
  [2, 113, "msrStdIdx"],
  [8, 115, "mValue 0"],
  [8, 123, "mValue 1"],
  [8, 131, "mValue 2"],
  [8, 139, "mValue 3"],
  [8, 147, "mValue 4"],
  [8, 155, "mValue 5"],
  [8, 163, "mValue 6"],
  [8, 171, "mValue 7"],
  [8, 179, "mValue 8"],
  [8, 187, "mValue 9"],
  [8, 195, "mValue 10"],
  [8, 203, "mValue 11"],
  [8, 211, "mValue 12"],
  [8, 219, "mValue 13"],
  [8, 227, "mValue 14"],
  [8, 235, "mValue 15"],
  [8, 243, "mValue 16"],
  [8, 251, "mValue 17"],
  [8, 259, "mValue 18"],
  [8, 267, "mValue 19"],
  [8, 275, "mValue 20"],
  [8, 283, "mValue 21"],
  [8, 291, "mValue 22"],
  [8, 299, "mValue 23"]
];

/* DataFormat_V1.8 */
const fieldMapV5 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "ber"],
  [8, 43, "cid"],
  [4, 51, "rsrp"],
  [4, 55, "rsrq"],
  [4, 59, "snr"],
  [10, 63, "devNo"],
  [4, 73, "devFw"],
  [2, 77, "devVolt"],
  [8, 79, "meterNo"],
  [2, 87, "meterType"],
  [2, 89, "meterCaliber"],
  [2, 91, "meterStatus1"],
  [2, 93, "meterStatus2"],
  [2, 95, "timeInterval"],
  [2, 97, "msrCycle"],
  [2, 99, "msrReport"],
  [2, 101, "year"],
  [2, 103, "month"],
  [2, 105, "day"],
  [2, 107, "hour"],
  [2, 109, "minute"],
  [2, 111, "second"],
  [2, 113, "msrCycle"],
  [2, 115, "msrCnt"],
  [2, 117, "msrStdIdx"],
  [8, 119, "mValue 0"],
  [8, 127, "mValue 1"],
  [8, 135, "mValue 2"],
  [8, 143, "mValue 3"],
  [8, 151, "mValue 4"],
  [8, 159, "mValue 5"],
  [8, 167, "mValue 6"],
  [8, 175, "mValue 7"],
  [8, 183, "mValue 8"],
  [8, 191, "mValue 9"],
  [8, 199, "mValue 10"],
  [8, 207, "mValue 11"],
  [8, 215, "mValue 12"],
  [8, 223, "mValue 13"],
  [8, 231, "mValue 14"],
  [8, 239, "mValue 15"],
  [8, 247, "mValue 16"],
  [8, 255, "mValue 17"],
  [8, 263, "mValue 18"],
  [8, 271, "mValue 19"],
  [8, 279, "mValue 20"],
  [8, 287, "mValue 21"],
  [8, 295, "mValue 22"],
  [8, 303, "mValue 23"]
];

/* DataFormat_V2.0 */
const fieldMapV6 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "NoACK"],
  [8, 43, "cid"],
  [4, 51, "rsrp"],
  [4, 55, "rsrq"],
  [4, 59, "snr"],
  [10, 63, "devNo"],
  [4, 73, "devFw"],
  [2, 77, "devVolt"],
  [8, 79, "meterNo"],
  [2, 87, "meterType"],
  [2, 89, "meterCaliber"],
  [2, 91, "meterStatus"],
  [2, 93, "manufacturerCode"],
  [2, 95, "tempInfo"],
  [2, 97, "correctionInfo"],
  [4, 99, "Reserved"],
  [2, 103, "timeInterval"],
  [2, 105, "msrCycle"],
  [2, 107, "msrReport"],
  [2, 109, "year"],
  [2, 111, "month"],
  [2, 113, "day"],
  [2, 115, "hour"],
  [2, 117, "minute"],
  [2, 119, "second"],
  [2, 121, "msrCycle"],
  [2, 123, "msrCnt"],
  [2, 125, "msrStdIdx"],
  [8, 127, "mValue 0"],
  [8, 135, "mValue 1"],
  [8, 143, "mValue 2"],
  [8, 151, "mValue 3"],
  [8, 159, "mValue 4"],
  [8, 167, "mValue 5"],
  [8, 175, "mValue 6"],
  [8, 183, "mValue 7"],
  [8, 191, "mValue 8"],
  [8, 199, "mValue 9"],
  [8, 207, "mValue 10"],
  [8, 215, "mValue 11"],
  [8, 223, "mValue 12"],
  [8, 231, "mValue 13"],
  [8, 239, "mValue 14"],
  [8, 247, "mValue 15"],
  [8, 255, "mValue 16"],
  [8, 263, "mValue 17"],
  [8, 271, "mValue 18"],
  [8, 279, "mValue 19"],
  [8, 287, "mValue 20"],
  [8, 295, "mValue 21"],
  [8, 303, "mValue 22"],
  [8, 311, "mValue 23"]
];

/* GS2.0 DataFormat */
const fieldMapV7 = [
  [2, 1, "header"],
  [2, 3, "length"],
  [2, 5, "type"],
  [16, 7, "imei"],
  [16, 23, "imsi"],
  [2, 39, "rssi"],
  [2, 41, "ber"],
  [4, 43, "cid"],
  [4, 47, "rsrp"],
  [4, 51, "rsrq"],
  [4, 55, "snr"],
  [10, 59, "devNo"],
  [4, 69, "devFw"],
  [2, 73, "devVolt"],
  [8, 75, "meterNo"],
  [2, 83, "meterType"],
  [2, 85, "meterCaliber"],
  [2, 87, "meterStatus"],
  [2, 89, "msrCycle"],
  [2, 91, "msrReport"],
  [2, 93, "year"],
  [2, 95, "month"],
  [2, 97, "day"],
  [2, 99, "hour"],
  [2, 101, "minute"],
  [2, 103, "second"],
  [2, 105, "msrCycle"],
  [2, 107, "msrCnt"],
  [2, 109, "msrStdIdx"],
  [8, 111, "msrStdValue"],
  [4, 119, "msrOffset 0"],
  [4, 123, "msrOffset 1"],
  [4, 127, "msrOffset 2"],
  [4, 131, "msrOffset 3"],
  [4, 135, "msrOffset 4"],
  [4, 139, "msrOffset 5"],
  [4, 143, "msrOffset 6"],
  [4, 147, "msrOffset 7"],
  [4, 151, "msrOffset 8"],
  [4, 155, "msrOffset 9"],
  [4, 159, "msrOffset 10"],
  [4, 163, "msrOffset 11"],
  [4, 167, "msrOffset 12"],
  [4, 171, "msrOffset 13"],
  [4, 175, "msrOffset 14"],
  [4, 179, "msrOffset 15"],
  [4, 183, "msrOffset 16"],
  [4, 187, "msrOffset 17"],
  [4, 191, "msrOffset 18"],
  [4, 195, "msrOffset 19"],
  [4, 199, "msrOffset 20"],
  [4, 203, "msrOffset 21"],
  [4, 207, "msrOffset 22"],
  [4, 211, "msrOffset 23"],
  [2, 215, "devModel"],
  [2, 217, "devTemp"],
  [2, 219, "afCnt"],
  [2, 221, "sfCnt"],
  [2, 223, "devFOTA"],
  [2, 225, "devBank"],
  [2, 227, "msrDisperTime"],
  [2, 229, "circuit"],
  [2, 231, "magnetic"],
];

/* LGU+ QTY DataFormat */
const LGfieldMapV1 = [
  [2, 1, "MGSVer"],
  [12, 3, "CTN"],
  [2, 15, "unit"],
  [4, 17, "level"],
  [8, 21, "CGI"],
  [4, 29, "RSRP"],
  [4, 33, "SINR"],
  [2, 37, "size"],
  [22, 39, "model"],
  [2, 61, "size"],
  [44, 63, "firmwareVer"],
  [4, 107, "TxPower"],
  [2, 111, "GPS"],
  [2, 113, "CellID"],
  [2, 115, "UE"],
  [6, 117, "PortInfo"],
  [6, 123, "reserved"]
];

/* NFC DATA Format Line
원격기기 정보 응답(MTR_RES)
0xD5, 0x02

검침정보 응답(AMI_RES)
0xD5, 0x04

통신 활성화 응답(RSET_RES)
0xD5, 0x06 

저장정보 응답(STOR_RES)
0xD5, 0x00 */

/* V2.0 NFC MTR_RES */
const NFCfieldMap2 = [
  [4, 1, "cmdByte"],
  [8, 5, "meterNo"],
  [12, 13, "FinalReport"],
  [12, 25, "Finalmeter"],
  [2, 37, "msrCnt"],
  [8, 39, "msrStdValue"], 
  [2, 47, "meterCaliber"],
  [2, 49, "meterCode"],
  [8, 51, "ctnNO"],
  [4, 59, "devFw"],
  [2, 63, "format"],
  [2, 65, "devVolt"],
  [2, 67, "comOnOff"]
];

/* V2.0 NFC AMI_RES */
const NFCfieldMap3 = [
  [4, 1, "cmdByte"],
  [8, 5, "meterNo"],
  [12, 13, "FinalReport"],
  [12, 25, "Finalmeter"],
  [2, 37, "msrCnt"],
  [8, 39, "msrStdValue"], 
  [2, 47, "meterCaliber"],
  [2, 49, "meterStatus"],
  [4, 51, "rsrp"],
  [2, 55, "NoAck"],
  [2, 57, "mno"],
  [2, 59, "modem"],
  [2, 61, "devVolt"],
  [2, 63, "comOnOff"]
];

/* V2.0 NFC RSET_RES */
const NFCfieldMap4 = [
  [4, 1, "cmdByte"],
  [8, 5, "meterNo"],
  [12, 13, "FinalReport"],
  [12, 25, "Finalmeter"],
  [2, 37, "msrCnt"],
  [8, 39, "msrStdValue"], 
  [2, 47, "meterCaliber"],
  [2, 49, "meterStatus"],
  [2, 51, "devVolt"],
  [2, 53, "comOnOff"]
];

/* V2.0 NFC STOR_RES */
const NFCfieldMap1 = [
  [4, 1, "cmdByte"],
  [8, 5, "meterNo"],
  [12, 13, "FinalReport"],
  [12, 25, "Finalmeter"],
  [2, 37, "msrCnt"],
  [8, 39, "msrStdValue"], 
  [2, 47, "meterCaliber"],
  [2, 49, "meterStatus"],
  [4, 51, "rsrp"],
  [2, 55, "NoAck"],
  [2, 57, "mno"],
  [2, 59, "modem"],
  [2, 61, "devVolt"],
  [2, 63, "comOnOff"],
  [8, 65, "ctnNO"],
  [4, 73, "devFw"],
  [2, 77, "meterCode"],
  [2, 79, "format"]
];

/* DAEGU METER PROTOCOL*/
const MeterfieldMap1 = [
  [2, 1, "start"],
  [2, 3, "Lfield"],
  [2, 5, "Lfield"],
  [2, 7, "start"],
  [2, 9, "CField"],
  [2, 11, "Afield"],
  [2, 13, "ClField"],
  [2, 15, "mdh"],
  [8, 17, "identNo"],
  [2, 25, "verMo"],
  [4, 27, "manID"],
  [2, 31, "status"],
  [2, 33, "meterCaliber"],
  [2, 35, "vif"],
  [8, 37, "meterData"],
  [2, 45, "checkSum"],
  [2, 47, "stop"],
];

/* SEOUL METER PROTOCOL*/
const MeterfieldMap2 = [
  [2, 1, "start"],
  [2, 3, "Lfield"],
  [2, 5, "Lfield"],
  [2, 7, "start"],
  [2, 9, "CField"],
  [2, 11, "Afield"],
  [2, 13, "ClField"],
  [2, 15, "mdh"],
  [8, 17, "identNo"],
  [2, 25, "status"],
  [2, 27, "meterCaliber"],
  [2, 29, "vif"],
  [8, 31, "meterData"],
  [2, 39, "checkSum"],
  [2, 41, "stop"],
];

/* All In One METER PROTOCOL*/
const MeterfieldMap3 = [
  [2, 1, "startByte"],
  [2, 3, "periold"],
  [2, 5, "Sensitivity"],
  [2, 7, "status"],
  [8, 9, "Fdata"],
  [8, 17, "Rdata"],
  [4, 25, "signalA"],
  [4, 29, "signalB"],
  [4, 33, "Interference"],
  [8, 35, "meterData"],
  [2, 43, "checkSum"],
  [2, 45, "stop"],
];

const headerMap = {
  "A3": "서울시 데이터포맷[V1.5]",
  "a3": "서울시 데이터포맷[V1.5]",
  "A4": "서울시 데이터포맷[V1.7]",
  "a4": "서울시 데이터포맷[V1.7]",
  "A5": "서울시 데이터포맷[V1.8]",
  "a5": "서울시 데이터포맷[V1.8]",
  "B1": "서울시 데이터포맷[V2.0]",
  "b1": "서울시 데이터포맷[V2.0]"
};

const typeMap = {
  "70": "(Default Version)",
  "71": "(GS2.0 Version)",
  "75": "(Temp Version)",
  "76": "(Temp + Cable Version)"
};

const MGSVerMap = {
  "04": "LGU+ Quality NB-IoT Ver.4",
};

const MeterVerMap = {
  "12": "대구시 검침데이터 프로토콜",
  "0F": "서울시 검침데이터 프로토콜"
};

function hexToAscii(hex) {
  if (!hex || hex.length % 2 !== 0) return hex;

  return hex.match(/.{2}/g)
    .map(h => {
      const code = parseInt(h, 16);
      if (code >= 32 && code <= 126) {
        return String.fromCharCode(code);
      }
      return '';
    })
    .join('')
    .trim();
}

function parseFinalReport(hex) {
  if (!hex || hex.length % 2 !== 0) return hex;

  const bytes = hex.match(/.{2}/g).map(v => parseInt(v, 16));
  if (bytes.length < 6 || bytes.some(isNaN)) return hex;

  return `${2000 + bytes[0]}-${String(bytes[1]).padStart(2, '0')}-${String(bytes[2]).padStart(2, '0')} ` +
         `${String(bytes[3]).padStart(2, '0')}:${String(bytes[4]).padStart(2, '0')}:${String(bytes[5]).padStart(2, '0')}`;
}

const cmdByteMap = {
  "D500": "저장정보 응답\n(STOR_RES)",
  "D502": "원격기기 정보 응답\n(MTR_RES)",
  "D504": "검침정보 응답\n(AMI_RES)",
  "D506": "통신 활성화 응답\n(RSET_RES)"
};

const caliberTypeMap = {
  "0": "검침이상",
  "1": "15mm",
  "2": "20mm",
  "3": "25mm",
  "4": "32mm",
  "5": "40mm",
  "6": "50mm",
  "7": "80mm",
  "8": "100mm",
  "9": "150mm",
  "A": "200mm",
  "B": "250mm",
  "C": "300mm"
  // 필요에 따라 더 추가
};

const meterDivisionMap = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
};

const bitEventMap = {
  0: "예비",
  1: "예비",
  2: "저전압 경보",
  3: "예비",
  4: "예비",
  5: "누수",
  6: "역류",
  7: "과부하"
};

const mnoMap = {
  "12": "SKT",
  "02": "KT",
  "98": "LGU+"
};

const meterDeviceMap = {
  "7712": "디에스워터(DSW)", "1277": "디에스워터(DSW)",
  "3012": "신한정밀 주식회사(SHP)", "1230": "신한정밀 주식회사(SHP)",
  "6812": "두산하이텍주식회사(DSH)", "1268": "두산하이텍주식회사(DSH)",
  "2311": "주식회사 리테크(RTC)", "1123": "주식회사 리테크(RTC)",
  "6411": "주식회사 대덕하이테크(DHT)", "1164": "주식회사 대덕하이테크(DHT)",
  "8c0c": "주식회사 그린플로우(GFL)", "0c8c": "주식회사 그린플로우(GFL)",
  "3414": "자인테크놀로지(주)(JIT)", "1434": "자인테크놀로지(주)(JIT)",
  "7011": "주식회사대한계기정밀(DHP)", "1170": "주식회사대한계기정밀(DHP)",
  "4a15": "경성제닉스 주식회사(KSJ)", "154a": "경성제닉스 주식회사(KSJ)",
  "3013": "한서정밀계기(주)(HSP)", "1330": "한서정밀계기(주)(HSP)",
  "341a": "아이원테크(IWT)", "1a34": "아이원테크(IWT)",
  "6911": "주식회사 대명아이티(DMI)", "1169": "주식회사 대명아이티(DMI)",
  "6312": "주식회사 두레콤(DRC)", "1263": "주식회사 두레콤(DRC)",
  "2d12": "신한메카트로닉스(주)(SHM)", "122d": "신한메카트로닉스(주)(SHM)",
  "3314": "시안시스템(SAS)", "1433": "시안시스템(SAS)",
  "3432": "주식회사 와이엔 이천텍(YIT)", "3234": "주식회사 와이엔 이천텍(YIT)",
  "2313": "주식회사 에이치에스씨엠티(HSC)", "1323": "주식회사 에이치에스씨엠티(HSC)",
  "6d11": "주식회사 대한계전(DHM)", "116d": "주식회사 대한계전(DHM)",
  "2d11": "청수계기(CSM)", "112d": "청수계기(CSM)",
  "2914": "일천산업(ICI)", "1429": "일천산업(ICI)",
  "770a": "부경수도 주식회사(BKW)", "0a77": "부경수도 주식회사(BKW)",
  "7010": "주식회사 청호정밀(CHP)", "1070": "주식회사 청호정밀(CHP)",
  "3416": "한국유체기술(주)(KFT)", "1634": "한국유체기술(주)(KFT)",
  "2317": "케이큐 주식회사(KQC)", "1723": "케이큐 주식회사(KQC)",
  "3413": "주식회사 한진테크(HJT)", "1334": "주식회사 한진테크(HJT)",
  "3422": "피에스텍(주)(PST)", "2234": "피에스텍(주)(PST)",
  "2319": "한국아이치 주식회사(IHC)", "1923": "한국아이치 주식회사(IHC)",
  "7412": "주식회사 디알텍(DRT)", "1274": "주식회사 디알텍(DRT)",
  "6916": "삼성계기공업(SMI)", "1669": "삼성계기공업(SMI)",
  "ef1d": "(주)정오(JOO)", "1def": "(주)정오(JOO)",
  "cd16": "주식회사 한국워터미터테크(KWM)", "16cd": "주식회사 한국워터미터테크(KWM)",
  "3316": "세나스(SNS)", "1633": "세나스(SNS)",
  "6315": "경도계전주식회사(KMC)", "1563": "경도계전주식회사(KMC)",
  "3415": "아이에스테크놀로지 주식회사(IST)", "1534": "아이에스테크놀로지 주식회사(IST)",
  "6d13": "주식회사한영계기(HYM)", "136d": "주식회사한영계기(HYM)",
  "232e": "주식회사 웰콤시스(WCS)", "2e23": "주식회사 웰콤시스(WCS)",
  "7013": "주식회사 하이텍이피씨(HTP)", "1370": "주식회사 하이텍이피씨(HTP)",
  "6d17": "(주)한국켄트메타스(KKM)", "176d": "(주)한국켄트메타스(KKM)",
  "632e": "신우산업 주식회사(SWC)", "2e63": "신우산업 주식회사(SWC)",
  "3413": "주식회사 효성테크(HST)", "1334": "주식회사 효성테크(HST)",
  "742e": "청수미터텍(WMT)", "2e74": "청수미터텍(WMT)",
  "3317": "주식회사 케이엠에스(KMS)", "1733": "주식회사 케이엠에스(KMS)",
  "2519": "주식회사 위지트에너지(WJE)", "1925": "주식회사 위지트에너지(WJE)",
  "332e": "(주)워터엠시스(WMS)", "2e33": "(주)워터엠시스(WMS)",
  "2512": "신일일렉트로닉 주식회사(SHE)", "1225": "신일일렉트로닉 주식회사(SHE)",
  "6412": "주식회사 삼원미터텍(SMD)", "1264": "주식회사 삼원미터텍(SMD)",
  "2514": "신신이앤지(주)(SSE)", "1425": "신신이앤지(주)(SSE)",
  "3412": "주식회사 이천텍(ICT)", "1234": "주식회사 이천텍(ICT)",
  "6512": "신동아전자 주식회사(SDE)", "1265": "신동아전자 주식회사(SDE)",
  "630c": "그린계기 주식회사(GMC)", "0c63": "그린계기 주식회사(GMC)",
  "232e": "(주)우성피엔에프(WSC)", "2e23": "(주)우성피엔에프(WSC)"
};

function getManufacturerName(hex) {
  if (!hex || hex.length !== 4) return hex;
  
  const lowerHex = hex.toLowerCase(); // 매핑 편의를 위한 소문자 통일
  return meterDeviceMap[lowerHex] || `미등록 제조사(${hex.toUpperCase()})`;
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const raw = document.getElementById("inputData").value.trim();
  const compact = raw.replace(/\s+/g, "");

  // HEX 우선 판정
  const isHex =
    /^[0-9A-Fa-f]+$/.test(compact) &&
    compact.length % 2 === 0;

  // HEX면 절대 Base64 처리 금지
  if (isHex) {
    document.getElementById("inputData").value = compact.toUpperCase();
    parseData();
    return;
  }

  try {
    const compact = raw.replace(/\s+/g, "");

    // 1) HEX 직접 입력이면 절대 Base64 변환하지 않음
    if (/^[0-9A-Fa-f]+$/.test(compact) && compact.length % 2 === 0) {
      document.getElementById("inputData").value = compact.toUpperCase();
      parseData();
      return;
    }

    // 2) [1,2,3] 또는 1, 2, 3 배열 입력 처리
    if (/^[\[\]\d\s,\-]+$/.test(raw)) {
      const cleaned = raw.replace(/[\[\]]/g, "").trim();
      const arr = cleaned.split(/[\s,]+/)
        .map(v => parseInt(v, 10))
        .filter(v => !isNaN(v));

      if (arr.length > 0) {
        const hexValues = arr.map(v =>
          (v < 0 ? 256 + v : v)
            .toString(16)
            .padStart(2, "0")
        );

        const result = hexValues.join("").toUpperCase();
        document.getElementById("inputData").value = result;
        parseData();
        return;
      }
    }

    // 3) Base64는 HEX/배열이 아닐 때만 처리
    if (/^[A-Za-z0-9+/=]+$/.test(compact) && compact.length % 4 === 0) {
      const binary = atob(compact);

      const hex = [...binary]
        .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

      document.getElementById("inputData").value = hex;
      parseData();
      return;
    }

    // alert("지원하지 않는 입력 형식입니다.");

  } catch (e) {
    alert("변환 중 오류가 발생했습니다.");
  }
});

function parseData() {
  const raw = document.getElementById("inputData").value;
  const data = raw.replace(/\s+/g, ""); // 모든 공백 제거
  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

// if (data.length < 61 || data.length > 401) {
//   alert("데이터는 62자 이상 400자 이하이어야 합니다.");
//   return;
// }

// header (2글자)와 type (2글자) 추출
// cmdByte (4글자) 추출
// MGSVer (2글자) 추출
// MeterVer (2글자) 추출
const headerHex = data.slice(0, 2).toUpperCase();
const typeHex = data.slice(4, 6).toUpperCase();
const cmdByteHex = data.slice(0, 4).toUpperCase();
const MGSVerHex = data.slice(0, 2).toUpperCase();
const MeterVerHex = data.slice(2, 4).toUpperCase();

console.log("Header:", headerHex);
console.log("Type:", typeHex);
console.log("cmdByte:", cmdByteHex);
console.log("MGSVer:", MGSVerHex);
console.log("MeterVer:", MeterVerHex);

let fieldMap;

// header + type 값으로 분기
if (headerHex === "A3" && typeHex === "70") {
  fieldMap = fieldMapV1;
} else if (headerHex === "A3" && typeHex === "75") {
  fieldMap = fieldMapV2;
} else if (headerHex === "A3" && typeHex === "76") {
  fieldMap = fieldMapV3;
} else if (headerHex === "A4" && typeHex === "70") {
  fieldMap = fieldMapV4;
} else if (headerHex === "A5" && typeHex === "70") {
  fieldMap = fieldMapV5;
} else if (headerHex === "B1" && typeHex === "70") {
  fieldMap = fieldMapV6;
} else if (headerHex === "A3" && typeHex === "71") {
  fieldMap = fieldMapV7;
} else if (cmdByteHex === "D500") {
  fieldMap = NFCfieldMap1;
} else if (cmdByteHex === "D502") {
  fieldMap = NFCfieldMap2;
} else if (cmdByteHex === "D504") {
  fieldMap = NFCfieldMap3;
} else if (cmdByteHex === "D506") {
  fieldMap = NFCfieldMap4;    
} else if (MGSVerHex === "04") {
  fieldMap = LGfieldMapV1;  
} else if (MeterVerHex === "12") {
  fieldMap = MeterfieldMap1;  
} else if (MeterVerHex === "0F") {
  fieldMap = MeterfieldMap2;  
} else if (MeterVerHex === "10") {
  fieldMap = MeterfieldMap3;  
} else {
    // alert(`지원하지 않는 데이터포맷입니다.`);
    // 변환하기 통합과 동시에 충돌방지 위해 alert 제거
  return;
}

const swapAndDexFields = [
  "rssi", "devTemp", "cid", "rsrp", "rsrq", "snr", "tempInfo",
  "year", "month", "day", "hour", "minute", "second", "msrCnt",
  "msrStdValue", "msrOffset", "mValue", "tempValue"
];
const snrMaxValue = (fieldMap === fieldMapV5 || fieldMap === fieldMapV6) ? 65536 : 256;

const checksumValue = data.slice(-2);
const formatValue = data.slice(-2);
const reservedValue = data.slice(-6);
const dataWithoutChecksum = data.slice(0, -2);

let yearVal = "", monthVal = "", dayVal = "";
let hourVal = "", minuteVal = "", secondVal = "";
let msrStdValueVal = "";
let division = "";
let prevOffsetResult = null;      // 이전 msrOffset 결과 저장
let pendingMsrStdRaw = null;   // V8용 보류 값

fieldMap.forEach(([length, start, fieldName]) => {
  const startIdx = start - 1;
  const endIdx = startIdx + length;
  if (endIdx > dataWithoutChecksum.length) return;
  const rawValue = data.slice(startIdx, endIdx);
  let displayValue = rawValue;

  if (swapAndDexFields.some(prefix => fieldName.startsWith(prefix))) {
    if (rawValue.length >= 4) {
      const swapped = rawValue.match(/../g).reverse().join("");
      displayValue = parseInt(swapped, 16).toString();
    } else {
      displayValue = parseInt(rawValue, 16).toString();
    }
  }

  if (fieldName === "imei" && rawValue.length >= 16) {
    let chars = rawValue.split("");
    chars.splice(15, 1); // 16번째 문자 제거
    displayValue = chars.join("");
  }

  if (fieldName === "imsi" && rawValue.length >= 16) {
    // 문자열을 배열로 변환
    let chars = rawValue.split("");
    // splice로 뒤에서부터 삭제 (앞부터 하면 인덱스가 밀립니다)
    chars.splice(15, 1); // 16번째 문자 제거
    displayValue = chars.join("");
  }

  if (fieldName === "devNo" && rawValue.length >= 10) {
    // 문자열을 배열로 변환
    let chars = rawValue.split("");
    // splice로 뒤에서부터 삭제 (앞부터 하면 인덱스가 밀립니다)
    chars.splice(2, 1);
    chars.splice(1, 1);
    chars.splice(0, 1);
    displayValue = chars.join("");
  }

  if (fieldName === "meterCaliber") {
    const firstCaliber = rawValue.charAt(0);
    displayValue = caliberTypeMap[firstCaliber] || `알 수 없음 (${firstCaliber})`;

    const secondCaliber = rawValue.charAt(1);
    division = meterDivisionMap[secondCaliber];

    // NFCfieldMap1(NFC)전용 msrStdValue 소급 계산
    if (pendingMsrStdRaw !== null) {
      const value = pendingMsrStdRaw / Math.pow(10, division);
      msrStdValueVal = value + " ton";
      prevOffsetResult = value;
      pendingMsrStdRaw = null;
    }
  }

  if (fieldName === "vif") {
    displayValue = rawValue; // 화면에는 원본 값(예: "11" 또는 "13") 그대로 출력
    
    // vif의 뒷자리 글자를 추출하여 전역 division 변수를 강제로 업데이트합니다.
    const vifSecondChar = rawValue.charAt(1); // "11"이면 '1', "13"이면 '3'
    if (meterDivisionMap[vifSecondChar] !== undefined) {
      division = meterDivisionMap[vifSecondChar]; // '1'이면 1, '3'이면 3이 division에 저장됨
    }
  }

  if (fieldName === "meterStatus") {
    const num = parseInt(rawValue, 16);  // HEX → 10진수
    if (!isNaN(num)) {
      const binaryStr = num.toString(2).padStart(8, '0');  // 8비트 변환
      const events = [];

      for (let i = 0; i < 8; i++) {
        if (binaryStr.charAt(7 - i) === '1') {
          events.push(bitEventMap[i]);
        }
      }

      const eventText = events.length > 0 ? events.join(", ") : "이벤트 없음";
      displayValue = `${eventText}`;
    } else {
      displayValue = "올바르지 않은 HEX 값";
    }
  }

  if (fieldName === "mno") {
    displayValue = mnoMap[rawValue.toUpperCase()] || "알수없는 통신사";
  }
  
  if (fieldName.trim() === "devVolt") {
  // devVolt는 HEX 2자리 → DEX → 소수점 한자리
    if (rawValue.length === 2) {
      // 예: 36 → 54 → 5.4
      const dex = parseInt(rawValue, 16);
      displayValue = (dex / 10).toFixed(1);
      displayValue = `${displayValue}V`;
    }
  }

  if (fieldName === "MGSVer") {
    displayValue = MGSVerMap[rawValue] || rawValue;
  }

  if (fieldName === "model" || fieldName === "firmwareVer") {
    displayValue = hexToAscii(rawValue);
  }

  if (fieldName === "RSRP" || fieldName === "SINR") {
    // 앞자리 0 제거 → 숫자로 변환
    const num = parseInt(rawValue, 10);

    if (!isNaN(num)) {
      displayValue = `-${num}`;
    } else {
      displayValue = rawValue; // fallback
    }
  }

  if (fieldName === "SINR") {
    displayValue = parseInt(rawValue, 10);
  }

  if (fieldName === "cmdByte") {
    displayValue = cmdByteMap[rawValue] || rawValue;
  }

  if (fieldName === "header") {
    displayValue = headerMap[rawValue] || rawValue;
  }

  if (fieldName === "type") {
    displayValue = typeMap[rawValue] || rawValue;
  }

  if (fieldName === "Lfield") {
    displayValue = MeterVerMap[rawValue] || rawValue;
  }

  if (fieldName.trim() === "meterNo" && rawValue.length >= 8) {
    displayValue = rawValue.slice(0, 2) + "-" + rawValue.slice(2, 8);
  }

  if (fieldName.trim() === "identNo" && rawValue.length >= 8) {
    const swapped = rawValue.match(/../g).reverse().join("");
    displayValue = swapped.slice(0, 2) + "-" + swapped.slice(2, 8);
  }

  if (fieldName === "devFw" && rawValue.length >= 4) {
    displayValue = 'V'+ rawValue[1] + rawValue[3];
  }

  if (fieldName === "FinalReport") {
    displayValue = parseFinalReport(rawValue);
  }
  if (fieldName === "Finalmeter") {
    displayValue = parseFinalReport(rawValue);
  }

  if (fieldName === "ctnNO") {
    displayValue = "01" + displayValue;
  }

  if (fieldName === "manID" || fieldName === "manufacturerCode") {
    displayValue = getManufacturerName(rawValue);
  }

  if (fieldName === "meterData") {
    if (isFailValue(rawValue)) {
      displayValue = "검침이상";
    } else {
      let realRawNum;

      if (rawValue.length === 8) {
        const byte4 = rawValue.slice(6, 8);
        const byte3 = rawValue.slice(4, 6);
        const byte2 = rawValue.slice(2, 4);
        const byte1 = rawValue.slice(0, 2);
        realRawNum = Number(byte4 + byte3 + byte2 + byte1); 
      } else if (rawValue.length === 4) {
        const byte2 = rawValue.slice(2, 4);
        const byte1 = rawValue.slice(0, 2);
        realRawNum = Number(byte2 + byte1);
      } else {
        realRawNum = Number(displayValue);
      }

      let finalDivision = (division !== undefined && division !== null && division !== "") ? Number(division) : 3;
      let value = realRawNum / Math.pow(10, finalDivision); 
      displayValue = value.toFixed(finalDivision) + " ton"; 
      
      msrStdValueVal = displayValue;
      prevOffsetResult = value; 
    }
  }

  // 스왑 및 DEX 변환 대상
  if (swapAndDexFields.some(prefix => fieldName.startsWith(prefix))) {
  if (rawValue.length >= 4) {
    // 2바이트 이상이면 바이트 순서 스왑 후 DEX
    const swapped = rawValue.match(/../g).reverse().join("");
    displayValue = parseInt(swapped, 16).toString();
  } 
  else {
    // 1바이트 HEX → DEX 변환
    displayValue = parseInt(rawValue, 16).toString();
  }
  if (fieldName.startsWith("devTemp")) {
    const intValue = parseInt(rawValue, 16);
    if (intValue >= 128) {
      displayValue = `-${256 - intValue}℃`;
    } else {
      displayValue = intValue.toString() + '℃';
    }
  }
  if (fieldName.startsWith("tempInfo")) {
    const intValue = parseInt(rawValue, 16);
    if (intValue >= 128) {
      displayValue = `-${256 - intValue}℃`;
    } else {
      displayValue = intValue.toString() + '℃';
    }
  }
  if (fieldName === "meterType") {
    displayValue = division;
    displayValue = `${displayValue}`;
  }
  if (fieldName === "rssi") {
    displayValue = `-${displayValue}`;
  }
  if (fieldName === "rsrp") {
    displayValue = `-${displayValue}`;
  }
  if (fieldName === "rsrq") {
    displayValue = `-${displayValue}`;
  }
  if (fieldName === "snr") {
    const snrValue = Number(displayValue);
    if (snrValue >= 128) {
      displayValue = `-${snrMaxValue - snrValue}`;
    } else {
      displayValue = snrValue.toString();
    }
  }
  if (fieldName === "year") {
    msrOffsetyearVal = displayValue;
    displayValue = `20${displayValue}년`;
    yearVal = displayValue;
  }
  if (fieldName === "month") {
    msrOffsetmonthVal = displayValue;
    displayValue = displayValue + "월";
    monthVal = displayValue;
  }
  if (fieldName === "day") {
    msrOffsetdayVal = displayValue;
    displayValue = displayValue + "일";
    dayVal = displayValue;
  }
  if (fieldName === "hour") {
    msrOffsethourVal = displayValue;
    displayValue = displayValue + "시";
    hourVal = displayValue;
  }
  if (fieldName === "minute") {
    msrOffsetminuteVal = displayValue;
    displayValue = displayValue + "분";
    minuteVal = displayValue;
  }
  if (fieldName === "second") {
    msrOffsetsecondVal = displayValue;
    displayValue = displayValue + "초";
    secondVal = displayValue;
  }
  if (fieldName === "msrStdValue") {
    if (isFailValue(rawValue)) {
      displayValue = "검침이상";
    } else {
      const rawNum = Number(displayValue);

      if (division !== "" && division !== undefined) {
        const value = rawNum / Math.pow(10, division);
        displayValue = value + " ton";
        msrStdValueVal = displayValue;
        prevOffsetResult = value;
      } else {
        // meterCaliber(소수점) 받지 못하였을 때(NFC) 소급 계산 처리 
        pendingMsrStdRaw = rawNum;
        displayValue = rawNum + " (소수점 미적용)";
      }
    }
  }
  if (fieldName.startsWith("msrOffset") && displayValue.length >= 1) {
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    } else {
      let offsetValue = Number(displayValue);
      offsetValue /= Math.pow(10, division);

      if (typeof prevOffsetResult === "number") {
        const result = prevOffsetResult - offsetValue;
        const offsetIndex = parseInt(fieldName.replace("msrOffset", ""), 10) || 0;
        let baseDate = new Date(
          2000 + Number(msrOffsetyearVal),
          Number(msrOffsetmonthVal) - 1,
          Number(msrOffsetdayVal),
          Number(msrOffsethourVal),
          Number(msrOffsetminuteVal),
          Number(msrOffsetsecondVal)
        );

        baseDate.setHours(baseDate.getHours() - offsetIndex);

        const year = baseDate.getFullYear();
        const month = String(baseDate.getMonth() + 1).padStart(2, "0");
        const day = String(baseDate.getDate()).padStart(2, "0");
        const hour = String(baseDate.getHours()).padStart(2, "0");
        const minute = String(baseDate.getMinutes()).padStart(2, "0");
        const second = String(baseDate.getSeconds()).padStart(2, "0");

        displayValue = `${result.toFixed(3)} ton (offset: ${offsetValue}) <br> ${year}-${month}-${day} ${hour}:${minute}:${second}`;
        prevOffsetResult = result;
      } else {
        displayValue = "계산 불가";
      }
    }
  }

  if (fieldName.startsWith("mValue") && displayValue.length >= 1) {
    if (isFailValue(rawValue)) { 
    displayValue = "검침이상";
      } else {
        let numericValue = Number(displayValue);
        numericValue /= Math.pow(10, division);
        const offsetIndex = parseInt(fieldName.replace("mValue", ""), 10) || 0;
        let baseDate = new Date(
          2000 + Number(msrOffsetyearVal),
          Number(msrOffsetmonthVal) - 1,
          Number(msrOffsetdayVal),
          Number(msrOffsethourVal),
          Number(msrOffsetminuteVal),
          Number(msrOffsetsecondVal)
        );

        baseDate.setHours(baseDate.getHours() - offsetIndex);

        const year = baseDate.getFullYear();
        const month = String(baseDate.getMonth() + 1).padStart(2, "0");
        const day = String(baseDate.getDate()).padStart(2, "0");
        const hour = String(baseDate.getHours()).padStart(2, "0");
        const minute = String(baseDate.getMinutes()).padStart(2, "0");
        const second = String(baseDate.getSeconds()).padStart(2, "0");

        displayValue = `${numericValue} ton <br> ${year}-${month}-${day} ${hour}:${minute}:${second}`;

        if (msrStdValueVal === "") {
          msrStdValueVal = `${numericValue} ton`;
        }
      }
  }
  else if (fieldName.startsWith("tempValue")) {
      if (rawValue.length === 4) {
        const upperHex = rawValue.slice(0, 2); // 상위 바이트
        const lowerHex = rawValue.slice(2, 4); // 하위 바이트

        // Little Endian: 하위 + 상위 바이트 순서
        const swappedHex = lowerHex + upperHex;        // 리틀 에디안 순서 변환
        let tempRaw = parseInt(swappedHex, 16);        // HEX 변환 

        // 2바이트 signed 변환
        if (tempRaw > 0x0500) {
          tempRaw = -(tempRaw - 0x0500); // signed 변환: 0x0500(DEX 1280) 이상이면 음수
        }
        const tempC = tempRaw / 10;                    // 10으로 나눠서 ℃
        displayValue = tempC + "℃";
      } else {
        displayValue = rawValue;
      }
    }
  }

  function isFailValue(value) {
    if (!value) return false;
    if (!(value.length === 4 || value.length === 8)) return false;
    return /^[fF]+$/.test(value);
  }

  const row = document.createElement("tr");
  row.innerHTML = 
    `<td>${fieldName}</td>
    <td>${rawValue}</td>
    <td>${displayValue}</td>`;
  tbody.appendChild(row);
  });

  document.getElementById("summaryContent").innerHTML =
    `<p><strong>검침 값:</strong> ${msrStdValueVal}</p>` +
    `<p><strong>데이터 전송 시간:</strong> ${yearVal} ${monthVal} ${dayVal} ${hourVal} ${minuteVal} ${secondVal}</p>`;

  if (/^D50[0246]$/.test(cmdByteHex)) {
    const formatRow = document.createElement("tr");
    formatRow.innerHTML = `<td>format</td><td>${formatValue}</td><td>${formatValue}</td>`;
    tbody.appendChild(formatRow);
  } else if (/^04$/.test(MGSVerHex)) {
    const reservedRow = document.createElement("tr");
    reservedRow.innerHTML = `<td>reserved</td><td>${reservedValue}</td><td>${reservedValue}</td>`;
    tbody.appendChild(reservedRow);
  } else {
    const checksumRow = document.createElement("tr");
    checksumRow.innerHTML = `<td>checksum</td><td>${checksumValue}</td><td>${checksumValue}</td>`;
    tbody.appendChild(checksumRow);
  }
}

