# DataFormatCheck
Site URL: https://rkdgml0076.github.io/protocol/

---
### 2025-08-18 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## NTmore Test Api Dex Attributes 값 Hex 변환
<br>

NTmore KT IotMaker Test Api Server Attributes의 [] 내부 값을 파싱을 위한 Hex 값으로 변환<br>
```html
  <textarea id="inputData" placeholder="여기에 데이터를 붙여넣으세요 (최소 61자)"></textarea>
  <br/>
  <button onclick="parseData()">파싱하기</button>
  <button id="convertBtn">변환하기</button>
  <div id="message">
    해당 데이터를 파싱해주세요
  </div>

<script>
  document.getElementById("convertBtn").addEventListener("click", () => {
    const raw = document.getElementById("inputData").value.trim();
    const message = document.getElementById("message");
    const output = document.getElementById("numericOutput");

    try {
      const arr = JSON.parse(raw);

      const hexValues = arr.map(v => (v < 0 ? 256 + v : v)
                                      .toString(16)
                                      .padStart(2, "0"));

      const result = hexValues.join("").toUpperCase();

      output.textContent = result;
      message.style.display = "block";

    } catch (e) {
      alert("[1,2,3,...] 형태로 넣어주세요.");      
      message.style.display = "none";
    }
  });
</script>
```
### 진행 내용
**IoTMaker Test Api Server 데이터 파싱**
1. [1, 2, 3, ...] 형식으로 된 데이터 복사 붙여넣고 변환하기 버튼 클릭 시 파싱이 가능한 기존 서울시 데이터 포맷 양식의 Payload 데이터 출력되어, 해당 출력된 데이터를 다시한번 복사 붙여넣기 후 데이터 확인
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/9f67ee98-6ee4-40d9-9029-23c1657af17e)

2. [] 형식을 제외한 양식 입력 시 팝업 생성<br>
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/cbb4746d-f3ab-4844-a436-a3df874200b1)
<br>

---
### 2025-08-04 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 그렉터 API 접속 URL 및 받아온 데이터 Excel Export
<br>

값 입력 후 데이터 가져오기를 클릭할 시 그렉터 API 사이트로 연결되는 URL 생성 및 가져온 데이터 Excel로 출력 가능<br>
```html
<div id="apiheader">
  <h2>그렉터 API 데이터 확인</h2>
</div>
<textarea id="grtIdInput" placeholder="IMEI(예: 865343071819914)"></textarea>
<span id="urlDisplay" style="position: absolute; margin-left: 5px;"></span><br>
<select id="siteIdInput">
  <option value="gochang">고창군</option>
  <option value="gunpo">군포시</option>
  <option value="gimje">김제시</option>
  <option value="gimhae">김해시</option>
  <option value="namhae">남해군</option>
  <option value="busan">부산시</option>
  <option value="asan">아산시</option>
  <option value="yangsan">양산시</option>
  <option value="yeoncheon">연천군</option>
  <option value="uijeongbu">의정부시</option>
  <option value="hadong">하동군</option>
  <option value="haman">함안군</option>
</select><br>
<div class="input-row">
  <button id="fetchBtn">데이터 가져오기</button>
  <button onclick="downloadExcel()" class="excel-icon-btn" title="Export">
  <img src="https://img.icons8.com/?size=100&id=13654&format=png&color=000000">
  </button>
  <pre id="output"></pre>
</div>
<br>
<br>
<div id="summaryBox" style="margin-top:20px; background:#fff; padding:10px; border:1px solid #ddd;">
  <strong><파싱 데이터 요약></strong>
  <div id="summaryContent">-</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

<script>
  let nodesData = [];
  document.getElementById('fetchBtn').addEventListener('click', async () => {
    const grtId = document.getElementById('grtIdInput').value.trim();
    const siteId = document.getElementById('siteIdInput').value.trim();
    if (!grtId || !siteId) {
      alert("IMEI를 입력하세요.");
      return;
    }
    const url = `https://dfm-ct.watergrid.kr/api?grtId=${encodeURIComponent(grtId)}&siteId=${encodeURIComponent(siteId)}`;

    const urlDisplay = document.getElementById("urlDisplay");
    urlDisplay.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;

    try {
          const response = await fetch(url);
          const result = await response.json();

          nodesData = result.nodes;  // 전역 변수 업데이트

          document.getElementById("output").textContent = JSON.stringify(nodesData, null, 2);
        } 
        catch (error) {
          alert("데이터를 불러오는 중 오류 발생: " + error.message);
        }
    });
    
    function downloadExcel() {
      if (!nodesData || Object.keys(nodesData).length === 0) {
        alert("먼저 데이터를 가져오세요.");
        return;
      }

      console.log("다운로드 함수 실행됨");
      console.log("nodesData:", nodesData);
      
      // 배열 객체를 시트로 변환
      const worksheet = XLSX.utils.json_to_sheet([nodesData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "NodesData");

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');

      XLSX.writeFile(workbook, `nodesData_${dateStr}.xlsx`);
    }
</script>
```
### 진행 내용
**API URL, Excel Export**
1. 데이터 가져오기 이전에는 Excel Export 불가
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/064c171d-8362-457d-ae2b-f98dbab829cb)<br>
2. IMEI 입력후 데이터 가져오기 클릭 시 URL이 생성되며 URL 위치는 IMEI 우측에 생성
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/f381d0c1-a01d-434d-80b2-84f6fb25abea)<br>
<br>

---

### 2025-07-30 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## meterStatus 8bit 표현
<br>

meterStatus Hex 값을 8비트 수로 변환하여 해당 8자리 수를 문자열로 받아와 텍스트를 출력<br>
```html
<script>
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
</script>
```
### 진행 내용
**meterStatus**
1. meterStatus 계량기 상태 이벤트 출력 완료 
2. 예비 값은 아직 미할당된 이벤트
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/52d91e5f-d004-4e81-a19c-6a16bcb80ce5)<br>
<br>

---

### 2025-07-25 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## meterCaliber 자리수 적용
<br>

meterCaliber 상위 비트는 구경에 값에 적용되며, 하의 비트는 검침 값 소수점 자리수에 적용<br>
```html
<script>
const caliberTypeMap = {
  "0": "검침이상",
  "1": "15mm",
  "2": "20mm",
  "3": "25mm",
  "4": "32mm",
  "5": "40mm",
  "6": "50mm",
  "7": "65mm",
  "8": "80mm",
  "9": "100mm",
  "A": "125mm",
  "B": "150mm",
  "C": "200mm"
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

if (fieldName === "meterCaliber") {
  const firstCaliber = rawValue.charAt(0);
  displayValue = caliberTypeMap[firstCaliber] || `알 수 없음 (${firstCaliber})`;
  const secondCaliber = rawValue.charAt(1);
  division = meterDivisionMap[secondCaliber];
}
if (fieldName === "msrStdValue") {
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    } else {
      let numericValue = Number(displayValue);
      if (division === 1) numericValue /= 10;
      else if (division === 2) numericValue /= 100;
      else if (division === 3) numericValue /= 1000;
      else if (division === 4) numericValue /= 10000;
      else if (division === 5) numericValue /= 100000;
      displayValue = numericValue + " ton";
    }
    msrStdValueVal = displayValue;
  }
  if (fieldName.startsWith("msrOffset") && displayValue.length >= 2) {
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    } else {
      let numericValue = Number(displayValue);
      if (division === 1) numericValue /= 10;
      else if (division === 2) numericValue /= 100;
      else if (division === 3) numericValue /= 1000;
      else if (division === 4) numericValue /= 10000;
      else if (division === 5) numericValue /= 100000;
      displayValue = numericValue + " ton";
    }
    msrStdValueVal = displayValue;
  }
  if (fieldName.startsWith("mValue") && displayValue.length >= 2) {
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    } else {
      let numericValue = Number(displayValue);
      if (division === 1) numericValue /= 10;
      else if (division === 2) numericValue /= 100;
      else if (division === 3) numericValue /= 1000;
      else if (division === 4) numericValue /= 10000;
      else if (division === 5) numericValue /= 100000;
      displayValue = numericValue + " ton";
    }
    msrStdValueVal = displayValue;
  }
</script>
```
### 진행 내용
**meterCaliber division**
1. meterCalibe 자리수 분류 후 타 fieldName에 적용 완료
2. 검침 값 필드에 바로 적용이 되지 않아 const 배열에 유효한 key-value 매핑을 추가
<br>

---

### 2025-07-18 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 그렉터 API
<br>

지자체를 선택한 뒤 IMEI를 입력하여 API 데이터를 화면에 출력<br>
```html
<div id="apiheader">
    <h2>그렉터 API 데이터 확인</h2>
  </div>
  <textarea id="grtIdInput" placeholder="IMEI(예: 865343071819914)"></textarea><br>
  <select id="siteIdInput">
    <option value="gochang">고창군</option>
    <option value="gunpo">군포시</option>
    <option value="gimje">김제시</option>
    <option value="gimhae">김해시</option>
    <option value="namhae">남해군</option>
    <option value="busan">부산시</option>
    <option value="asan">아산시</option>
    <option value="yangsan">양산시</option>
    <option value="yeoncheon">연천군</option>
    <option value="uijeongbu">의정부시</option>
    <option value="hadong">하동군</option>
    <option value="haman">함안군</option>
  <!-- 필요한 만큼 추가 가능 -->
</select><br>
  <div class="input-row">
    <button id="fetchBtn">데이터 가져오기</button>
    <pre id="output"></pre>
  </div>

<script>
document.getElementById('fetchBtn').addEventListener('click', async () => {
      const grtId = document.getElementById('grtIdInput').value.trim();
      const siteId = document.getElementById('siteIdInput').value.trim();

      if (!grtId || !siteId) {
        alert("IMEI를 입력하세요.");
        return;
      }

  const url = `https://dfm-ct.watergrid.kr/api?grtId=${encodeURIComponent(grtId)}&siteId=${encodeURIComponent(siteId)}`;
  try {
        const response = await fetch(url);
        const result = await response.json();  // 전체 JSON 받아옴
        const nodesData = result.nodes; // nodes 안의 값만 가져오기
        console.log(nodesData); // nodes 안의 데이터만 출력

        // 화면에 nodes 값 출력
        const outputEl = document.getElementById("output");
        outputEl.textContent = JSON.stringify(nodesData, null, 2);
      } 
      catch (error) {
        alert("데이터를 불러오는 중 오류 발생: " + error.message);
      }
  });
</script>
```

## 계량기 상태
<br>

계량기 상태 값 8진수 변환 후 출력<br>
```html
<script>
const meterStatusMap = {
  "0": "예비",
  "10": "예비",
  "20": "저전압 경보",
  "30": "예비",
  "40": "예비",
  "50": "누수",
  "60": "역류",
  "70": "과부하"
};

if (fieldName === "meterStatus") {
  try {
    const dec = parseInt(rawValue, 16);
    const oct = dec.toString(8);
    const meaning = meterStatusMap[oct] || `${oct}`;
    displayValue = meaning;
  } catch (e) {
    displayValue = "미할당 값";
  }
}
</script>
```

<br>

### 진행 내용
**그렉터 API 데이터 출력 성공**
1. nodes 내부의 값만 가져오도록 코딩
2. 서버업체 그렉터 지차체만 메뉴 고를 수 있게 설정: 의정부시, 부산시, 연천군, 김해시, 아산시, 함안군, 고창군, 하동군, 양산시, 군포시 김제시, 남해군<br>
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/2d0e4cbe-99c7-4690-b8a8-223b9d161a6d)<br>
3. Hex 변환 추가: "msrCnt" 
4. 
<br>

---

### 2025-07-17 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 검침이상
<br>

검침 값을 못 읽어온 값 FFFFFFFF,ffff... 이하 검침이상 값 검침이상 텍스트로 변환하여 출력 <br>
```html
<script>
if (fieldName === "msrStdValue") {
    displayValue = displayValue/1000 + " ton";
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    }
    msrStdValueVal = displayValue;
  }
  if (fieldName.startsWith("msrOffset") && displayValue.length >= 2) {
    displayValue = displayValue.slice(0, 10)/1000 + " ton";
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    }
  }
  if (fieldName.startsWith("mValue") && displayValue.length >= 2) {
    displayValue = displayValue.slice(0, 10)/1000 + " ton";
    if (isFailValue(rawValue)) { 
      displayValue = "검침이상";
    }
  }

  function isFailValue(value) {
    if (!value) return false;
    if (!(value.length === 4 || value.length === 8)) return false;
    return /^[fF]+$/.test(value);
  }
</script>
```

<br>

### 진행 내용
**HEX -> DEX 변환 완료**
1. 검침이상 값 숫자는 FFFFFFFF, ffffffff, FFFF, ffff 4종류로 고정
2. '검침이상' 이상 명칭 변경이나 구경 및 타 계량기 값도 검침이상 출력 변경 예정

--Image 참고-- <br>

![Image](https://github.com/user-attachments/assets/23a8d7c9-9cab-4079-87f3-3b0d3ca4022f)<br>
<br>

---

### 2025-07-15 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O 

## 데이터 요약
<br>

검침 값과 데이터 전송 시간을 빠르게 확인하기 위한 UI생성  <br>
```html
<strong><데이터 요약></strong>

<script>
let yearVal = "", monthVal = "", dayVal = "";
let hourVal = "", minuteVal = "", secondVal = "";
let msrStdValueVal = "";

if (fieldName === "year") {
    displayValue = `20${displayValue}년`;
    yearVal = displayValue;
  }
  if (fieldName === "month") {
    displayValue = displayValue + "월";
    monthVal = displayValue;
  }
  if (fieldName === "day") {
    displayValue = displayValue + "일";
    dayVal = displayValue;
  }
  if (fieldName === "hour") {
    displayValue = displayValue + "시";
    hourVal = displayValue;
  }
  if (fieldName === "minute") {
    displayValue = displayValue + "분";
    minuteVal = displayValue;
  }
  if (fieldName === "second") {
    displayValue = displayValue + "초";
    secondVal = displayValue;
  }
  if (fieldName === "msrStdValue") {
    displayValue = displayValue/1000 + " ton";
    msrStdValueVal = displayValue;
  }

  if (fieldName === "year") summaryYear = displayValue;
  if (fieldName === "month") summaryMonth = displayValue;
  if (fieldName === "day") summaryDay = displayValue;
  if (fieldName === "hour") summaryHour = displayValue;
  if (fieldName === "minute") summaryMinute = displayValue;
  if (fieldName === "second") summarySecond = displayValue;
  if (fieldName === "msrStdValue") summaryMsrStdValue = displayValue;
  
  document.getElementById("summaryContent").innerHTML =
  `<p><strong>검침 값:</strong> ${msrStdValueVal}</p>` +
  `<p><strong>데이터 전송 시간:</strong> ${yearVal} ${monthVal} ${dayVal} ${hourVal} ${minuteVal} ${secondVal}</p>`;
</script>
```

## Code Shield
개발자 도구 차단 <br>
```html
<script>
<body oncontextmenu="return false;">

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
  })
</script>
```

<br>

### 진행 내용
1. feeld 맵 부분에 텍스트 재 기입하여 해석 필드 텍스트 출력 및 중복 출력 방지
2. 검침 값 및 시간 확인 데이터 요약만 기입(필요 시 추후 다른 데이터 기입)<br>
--Image 참고-- <br>
![Image](https://github.com/user-attachments/assets/6000b4f8-38b7-4653-99af-f1da42dd27eb)
3. 개발자도구 관련 키 입력 시 Error 팝업 생성
![Image](https://github.com/user-attachments/assets/1cc4e059-a127-44ba-90c4-427365e389f3)
<br>

---
<br>

### 2025-07-10 GitHub Commit

#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 데이터 포맷 통합
<br>

기존 HTML 별로 분류되어있던 데이터 포맷 6가지 버전 통합 <br>
```html
  <script>
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
  [8, 115, "msrStdValue"],
  [8, 123, "mValue 0"],
  [8, 131, "mValue 1"],
  [8, 139, "mValue 2"],
  [8, 147, "mValue 3"],
  [8, 155, "mValue 4"],
  [8, 163, "mValue 5"],
  [8, 171, "mValue 6"],
  [8, 179, "mValue 7"],
  [8, 187, "mValue 8"],
  [8, 195, "mValue 9"],
  [8, 203, "mValue 10"],
  [8, 211, "mValue 11"],
  [8, 219, "mValue 12"],
  [8, 227, "mValue 13"],
  [8, 235, "mValue 14"],
  [8, 243, "mValue 15"],
  [8, 251, "mValue 16"],
  [8, 259, "mValue 17"],
  [8, 267, "mValue 18"],
  [8, 275, "mValue 19"],
  [8, 283, "mValue 20"],
  [8, 291, "mValue 21"],
  [8, 299, "mValue 22"],
  [8, 307, "mValue 23"]
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
  [8, 119, "msrStdValue"],
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

/* DataFormat_V2.0 */
const fieldMapV6 = [
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
  [8, 127, "msrStdValue"],
  [8, 135, "mValue 0"],
  [8, 143, "mValue 1"],
  [8, 151, "mValue 2"],
  [8, 159, "mValue 3"],
  [8, 167, "mValue 4"],
  [8, 175, "mValue 5"],
  [8, 183, "mValue 6"],
  [8, 191, "mValue 7"],
  [8, 199, "mValue 8"],
  [8, 207, "mValue 9"],
  [8, 215, "mValue 10"],
  [8, 223, "mValue 11"],
  [8, 231, "mValue 12"],
  [8, 239, "mValue 13"],
  [8, 247, "mValue 14"],
  [8, 255, "mValue 15"],
  [8, 263, "mValue 16"],
  [8, 271, "mValue 17"],
  [8, 279, "mValue 18"],
  [8, 287, "mValue 19"],
  [8, 295, "mValue 20"],
  [8, 303, "mValue 21"],
  [8, 311, "mValue 22"],
  [8, 319, "mValue 23"]
];

const headerHex = data.slice(0, 2).toUpperCase();
const typeHex = data.slice(4, 6).toUpperCase();

console.log("Header:", headerHex);
console.log("Type:", typeHex);

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
} else {
    alert(`지원하지 않는 데이터포맷입니다.`);
  return;
}
</script>
```

header 값의 알파벳이 소문자이면 해석값 미적용되는 이슈 수정 <br>
```html
<script>
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
</script>
```

<br>

### 진행 내용
**해당 날짜를 기점으로 GitHub HTML 사이트 링크 생성**
URL: https://rkdgml0076.github.io/protocol/
1. Site name: DataFormatCheck_1.0.0
2. 지원하지 않는 데이터 포멧일 시 팝업 생성<br>
--Image 참고-- <br>
![Image](https://github.com/user-attachments/assets/754cdca4-bd56-419d-8dc7-938acb34b614)

---

### 2025-07-09 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 검침 값 변환 및 온도 기호
<br>

DEX 변환된 검침 값 0.001% 값으로 출력 및 온도 값에 "℃" 문자 추가 <br>
```html
<script>
  if (fieldName.startsWith("msrOffset") && displayValue.length >= 2) {
    displayValue = displayValue.slice(0, 10)/1000 + " ton";
  }
  if (fieldName.startsWith("tempValue") && displayValue.length >= 3) {
    displayValue = displayValue.slice(0, -1) + "℃";
  }
</script>
```

## 프로토콜 버전 분류
<br>

hearder, type 값을 const 배열로 분류하여 데이터 포맷 버전 분류하여 출력 <br>
```html
const headerMap = {
  "A3": "DataFormat_V1.5",
  "A4": "DataFormat_V1.7",
  "A5": "DataFormat_V1.8",
  "B1": "DataFormat_V2.0"
};

const typeMap = {
  "70": "(Default Version)",
  "75": "(Temp Version)",
  "76": "(Temp + Cable Version)"
};

<script>
  if (fieldName === "header") {
    displayValue = headerMap[rawValue] || rawValue;
  }
  if (fieldName === "type") {
    displayValue = typeMap[rawValue] || rawValue;
  }
</script>
```

<br>

### 진행 내용
**HEX -> DEX 변환 완료**
1. 최소, 최대 입력 숫자 61~400자 고정
2. 6가지 Version 데이터 포맷 HTML 분류하여 생성

--Image 참고-- <br>
데이터 포맷("DataFormat_V1.5 + Temp", "DataFormat_V1.7" 양식 이미지)
![Image](https://github.com/user-attachments/assets/71bc6194-17b0-4186-9530-eb05cf7ae6b1)<br>
![Image](https://github.com/user-attachments/assets/c18808d9-3588-4c2c-8c75-d9a6e2dd77c6)<br>
<br>

---

### 2025-07-08 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## 데이터 포맷 V1.5 Commit
<br>

검침 값 ton 추가 <br>
```html
<script>
  if (fieldName === "msrStdValue") {
    displayValue = `${displayValue/1000} ton`;
  }
</script>
```

<br>

### 진행 내용
**HEX -> DEX 변환 완료**
1. 서울시 수도계량기 원격검침 서버 수신용 데이터포맷[V1.5] NB-IoT 틀 완성하여 Commit
2. 'ton' Text를 넣어 검침 값 구분 

---

### 2025-07-04 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

#### 2025년 6월 26일 ~ 2025년 7월 4일까지의 코드는 Commit 없이 개발을 진행하여 7일 4일 날짜에 해당 기간 기록을 README에 기입하여 Commit합니다.


## Little Endian
리틀엔디안 (Little Endian) 형식으로 결합된 HEX 값을 DEX 값으로 변환하여 해석
<br>

예시) HEX 값이 ABCD 이면 0xCD,0xAB 순서 변환하여 DEX 값을 변환 필요<br>
```html
<script>
  const swapAndDexFields = [
    "rssi", "cid", "rsrp", "rsrq", "snr", 
    "year", "month", "day", "hour", "minute", "second",
    "msrStdValue","msrOffset", "tempValue"
  ];

  if (swapAndDexFields.some(prefix => fieldName.startsWith(prefix)))
    if (rawValue.length >= 4) {
      // 2바이트 이상이면 바이트 순서 스왑 후 DEX
      const swapped = rawValue.match(/../g).reverse().join("");
      displayValue = parseInt(swapped, 16).toString();
    } 
    else {
      // 1바이트 HEX → DEX 변환
      displayValue = parseInt(rawValue, 16).toString();
    }
</script>
```

## meterCaliber(계량기 구경)
<br>

특정 출력 숫자에 맞춰서 계량기 구경 값으로 해석되게 출력<br>
```html
<script>
  const meterCaliberMap = {
  "13": "15mm",
  "23": "20mm",
  "33": "25mm",
  "43": "32mm",
  "53": "40mm",
  "63": "50mm",
  "73": "80mm",
  "83": "100mm",
  "93": "150mm",
  "A3": "200mm",
  "B3": "250mm",
  "C3": "300mm"
};

if (fieldName === "meterCaliber") {
    displayValue = meterCaliberMap[rawValue] || rawValue;
}
</script>
```

## 해석 값 변환 코드
<br>

IMEI, IMSI, 단말기 일련번호, 배터리 값, 계량기 번호, 펌웨어 버전 등등 chars.splice, rawValue.length 이용하여 출력 숫자를 줄이거나, chars.splice 이용하여 값 중간에 문자를 추가하여 출력<br>
```html
<script>
const checksumValue = data.slice(-2);
const dataWithoutChecksum = data.slice(0, -2);

fieldMap.forEach(([length, start, fieldName]) => {
  const startIdx = start - 1;
  const endIdx = startIdx + length;
  if (endIdx > dataWithoutChecksum.length) return;
  const rawValue = data.slice(startIdx, endIdx);
  let displayValue = rawValue;

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
    chars.splice(3, 1);
    chars.splice(2, 1);
    chars.splice(1, 1);
    displayValue = chars.join("");
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

  if (fieldName.trim() === "meterNo" && rawValue.length >= 8) {
  displayValue = rawValue.slice(0, 2) + "-" + rawValue.slice(2, 8);
  }

  if (fieldName === "devFw" && rawValue.length >= 4) {
    displayValue = 'V'+ rawValue[1] + rawValue[3];
  }

   if (fieldName === "rsrp") {
    displayValue = `-${displayValue}`;
  }
  if (fieldName === "rsrq") {
    displayValue = `-${displayValue}`;
  }
  if (fieldName === "year") {
    displayValue = `20${displayValue}년`;
  }
  if (fieldName === "month") {
    displayValue = `${displayValue}월`;
  }
  if (fieldName === "day") {
    displayValue = `${displayValue}일`;
  }
  if (fieldName === "hour") {
    displayValue = `${displayValue}시`;
  }
  if (fieldName === "minute") {
    displayValue = `${displayValue}분`;
  }
  if (fieldName === "second") {
    displayValue = `${displayValue}초`;
  }
  if (fieldName === "msrStdValue") {
    displayValue = `${displayValue/1000}`;
  }
  if (fieldName.startsWith("tempValue") && displayValue.length >= 3) {
    displayValue = displayValue.slice(0, -1);
  }
})
</script>
```

## 해석 분류
<br>

해석 Field 추가<br>
```html

 <table id="resultTable">
    <thead>
      <tr><th>데이터 키</th><th>원본값(샘플)</th><th>해석</th></tr>
    </thead>
    <tbody></tbody>
  </table>

<script>
 const row = document.createElement("tr");
  row.innerHTML = 
    `<td>${fieldName}</td>
    <td>${rawValue}</td>
    <td>${displayValue}</td>`;
  tbody.appendChild(row);
</script>
```

## CheckSum
<br>

마지막 2글자 CheckSum 값으로 정의하여 따로 분류<br>
```html
/*FieldMap 내부*/
  // [2, 311, "checksum"]

<script>
    const checksumRow = document.createElement("tr");
    checksumRow.innerHTML = `<td>checksum</td><td>${checksumValue}</td><td>${checksumValue}</td>`;
    tbody.appendChild(checksumRow);
</script>
```

<br>

### 진행 내용
**해석 필드 분류하여 전반적인 파싱데이터 해석 완성**
1. "서울시 확장형(온도) 원격검침 서버 수신용 데이터포맷[V1.5] NB-IoT" 데이터 포맷(FieldMap) HTML 분류하여 추가
2. 원본 형식 파싱데이터 구분에 어려움이 있어 해석 필드 추가의 필요성을 느낌
3. Meter, Temp 값이 0~24 카운트마다 값이 상이하여 마지막 출력 값인 CheckSum 값 분류하여 출력 
4. if (fieldName === "필드네임") {displayValue = `${displayValue}`;} 값으로 전반적인 텍스트 추가
5. meterCaliberMap(계량기 구경) 예시 파싱데이터가 15mm(13), 20mm(23) 밖에 없어 13, 23, 33... 양식으로 임의의 적용

--Image 참고-- <br>
![Image](https://github.com/user-attachments/assets/f1e823d3-9e38-4dc8-bcc3-52f03b006b65)<br>
<br>


---

### 2025-06-25 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## HEX, DEX
<br>

파싱데이터 HEX(16진수) 값을 DEX(10진수) 값으로 변환하여 출력 필요 <br>
DEX 변환 필요한 코드 코드 **("rssi", "cid", "rsrp", "rsrq", "snr", "year", "month", "day", "hour", "minute", "second", 
"msrStdValue","msrOffset", "tempValue")**
```html
<script>
  function parseData() {
    const data = document.getElementById("inputData").value.trim();
    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    if (data.length < 90) {
      alert("데이터는 최소 90자 이상이어야 합니다.");
      return;
    }

    fieldMap.forEach(([length, start, fieldName]) => {
      const startIdx = start - 1;
      const endIdx = startIdx + length;
      const rawValue = data.slice(startIdx, endIdx);

      let displayValue = rawValue;

      // msrOffset인 경우 HEX → DEX 변환
      if (fieldName.startsWith("rssi") ||
          fieldName.startsWith("cid") ||
          fieldName.startsWith("rsrp") ||
          fieldName.startsWith("rsrq") ||
          fieldName.startsWith("snr") ||
          fieldName.startsWith("devVolt") ||
          fieldName.startsWith("year") ||
          fieldName.startsWith("month") ||
          fieldName.startsWith("day") ||
          fieldName.startsWith("hour") ||
          fieldName.startsWith("minute") ||
          fieldName.startsWith("second") ||
          fieldName.startsWith("msrStdValue 0") ||
          fieldName.startsWith("msrOffset 0") ||
          fieldName.startsWith("tempValue 0") ||
          fieldName.startsWith("msrStdValue 1") ||
          fieldName.startsWith("msrOffset 1") ||
          fieldName.startsWith("tempValue 1")) 
          {
            displayValue = parseInt(rawValue, 16).toString();
          }
          
      const row = document.createElement("tr");
      row.innerHTML = `<td>${fieldName}</td><td>${displayValue}</td>`;
      tbody.appendChild(row);
    });

  }
</script>
```

<br>

### 진행 내용
**HEX -> DEX 변환 완료**
1. F/W 버전의 2번째 4번째 값을 제거하는 방식은 chars.splice(@ , @); 적용이 안되어 rawValue[1] + rawValue[3]; 따로 출력
2. HEX 값 DEX 값으로 변환하는 코드 완성
3. HEX 값이 리틀 에드안 형식으로 결합되어 HEX 값 순서를 스왑하는 코드 개발중

--Image 참고-- <br>
DEX 값으로 변환
![Image](https://github.com/user-attachments/assets/a709e00d-edcd-401e-9760-52169aeb8591)<br>
<br>


---


### 2025-06-24 GitHub First Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "


## 사이트 기본 UI 디자인 및 데이터 포맷 기본 분류
<br>

기본 #include <stdio.h> 및 printf 코드 생성
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"> <!-- 인코딩 설정 반드시 첫줄 -->
  <title>파싱 도구</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 30px;
      background: #f7f7f7;
    }
    textarea {
      width: 100%;
      height: 100px;
      font-family: monospace;
      font-size: 14px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      background: white;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #eee;
    }
  </style>
</head>
<body>

  <h2>파싱 도구 (입력 데이터는 90자 이상)</h2>
  <textarea id="inputData" placeholder="여기에 데이터를 붙여넣으세요 (최소 90자)"></textarea>
  <br />
  <button onclick="parseData()">파싱하기</button>

  <table id="resultTable">
    <thead>
      <tr><th>필드</th><th>값</th></tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    const fieldMap = [
    [2, 1], [2, 3], [2, 5], [16, 7], [16, 23], [2, 39], [2, 41], [4, 43], [4, 47],
    [4, 51], [4, 55], [10, 59], [4, 69], [2, 73], [8, 75], [2, 83], [2, 85],
    [2, 87], [2, 89], [2, 91], [2, 93], [2, 95], [2, 97], [2, 99], [2, 101],
    [2, 103], [2, 105], [2, 107], [2, 109], [8, 111], [4, 119], [4, 123], [2, 127],
    [4, 129], [4, 133], [2, 137], [4, 139], [4, 143], [2, 147], [4, 149], [4, 153],
    [2, 157], [4, 159], [4, 163], [2, 167], [4, 169], [4, 173], [2, 177], [2, 179]
    ];

    function parseData() {
    const data = document.getElementById("inputData").value.trim();
    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    if (data.length < 90) {
        alert("데이터는 최소 90자 이상이어야 합니다.");
        return;
    }

        fieldMap.forEach(([length, start, fieldName]) => {
        const startIdx = start - 1;
        const endIdx = startIdx + length;
        const rawValue = data.slice(startIdx, endIdx);

        const row = document.createElement("tr");
        row.innerHTML = `<td>${fieldName}</td><td>${rawValue}</td>`;
        tbody.appendChild(row);
        });
    }
  </script>

</body>
</html>
```

<br>

### 진행 내용
**기본 HTML 프레임 완성**
1. 첫 데이터 포맷 양식은 "서울시 확장형(온도, 단선) 원격검침 서버 수신용 데이터포맷[V1.5] NB-IoT" 활용
2. 기본 style, script 작성
3. 데이터 분류는 const 함수 사용
4. 데이터 최소 입력 값은 90자

--Image 참고-- <br>
![Image](https://github.com/user-attachments/assets/b6bd6112-3dca-49d4-88bf-cd8ffddeab98)<br>
<br>

---

