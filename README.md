# DataFormatCheck
Site URL: https://rkdgml0076.github.io/protocol/

### 2025-10-14 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- index.html을 초기 페이지로 설정
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## UI Design
<br>
검침 데이터 API 버튼 위치 변경 및 설명 추가<br>

### NTmoreAPI(HTML)
```html
  <div class="header">
    <h2>검침 데이터 API</h2>
    <a href="https://ntmore.kr/"><img src="https://ntmore.kr/images/kor06r-22-0459/common/top_logo_on.png" alt="Logo"></a>
  </div>
  <br>
  <h2>복수 데이터 확인</h2>
  <label style="display:inline-flex; align-items:center; gap:8px;">
      <span style="font-size:13px;">'1', '2', '3', '4' 번호 순서대로 버튼을 클릭하여 진행해 주세요 <br>1: Excel 양식을 다운로드하여 IMEI, 지자체(시, 군 포함 예:고창X 고창군O) 부분을 기입해주세요<br>2: 기입해주신 엑셀 파일을 선택해주세요<br>3: 전체 데이터 불러오기 버튼을 클릭하여 API 데이터를 가져옵니다.<br>4: 결과 데이터 다운로드 버튼을 클릭하여 결과를 다운로드합니다.</span>
  </label>
  <div class="controls">
    <button class="btn-primary small" onclick="downloadTemplate()">1. Import 양식 다운로드</button>
    <input type="file" id="excelInput" accept=".xlsx,.xls,.csv" style="display:none;" />
    <label for="excelInput" class="btn-primary small" style="display:inline-flex; align-items:center; gap:8px; height: 22px;" >2. Excel 파일 선택</label>
    <button id="fetchAllBtn" class="btn-primary small">3. 전체 데이터 불러오기</button>
    <button id="downloadAllResults" class="btn-primary small">4. 결과 데이터 다운로드</button>
  </div>
```
<br>
파싱 페이지 버튼 디자인 변경<br>

### protocol(HTML)
```HTML
    <button class="btn-primary small" onclick="parseData()">파싱하기</button>
    <button class="btn-primary small" id="convertBtn">변환하기(KT)</button>
```

### protocol(CSS)
```css
    .btn-primary{
      display: inline-block;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      /* font-size: 14px; */
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 5px;
      border: none;
      text-decoration: none;
      background: linear-gradient(180deg, #ccc 0%, #aaa 100%);
      color: #fff;
      box-shadow: 0 6px 18px rgba(21, 101, 216, 0.12);
      transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
    }
    .btn-primary:hover{ 
      filter: brightness(.92); 
    }
    .small {
      height: 45px;
      font-size: 18px;
      padding: 6px 15px;
    }
```
## Excel Sample
<br>
Import Excel 양식 샘플 데이터 추가<br>

### NTmoreAPI(JS)
```JS
    let worksheetData = [
    ["IMEI", "지자체"], ["865343071819914", "고창군"], ["355800490911801", "김제시"], ["869692067499248", "의정부시"]
    ];
```

### 진행 내용
**Excel 출력 결과 변경**
1. API 페이지 버튼 내부 텍스트 변경, 복수 데이터 확인 설명 추가
2. 엑셀 파일 선택 버튼 디자인 통일
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/2a504f2c-ec4b-443b-98ac-8874ead588f9)
3. 변환하기 버튼 용도 분류를 위하여 (KT) 텍스트 추가
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/e48c698f-91de-4420-b518-f3f2df4a38fc)
4. Import 샘플 데이터는 고창군, 김제시 의정부시 3개 데이터 설정

---

### 2025-10-02 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- index.html을 초기 페이지로 설정
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## Export Excel
<br>
Export Excel 다운로드 시 양식 변경<br>


### NTmoreAPI(JS)
```js
document.getElementById('downloadAllResults').addEventListener('click', () => {
  if (!nodesDataList || nodesDataList.length === 0) { alert('저장할 결과가 없습니다. 먼저 호출을 진행하세요.'); return; }
 const flat = nodesDataList.map((item, idx) => {
  const nodes = item.result?.nodes || {};

    return {
      idx: idx + 1,
      error: item.error || '',
      지자체: item.inputSite || '',
      IMEI: item.inputGrt || '',
      IMSI: nodes.imsi || '',
      // result.nodes 안에서 뽑아오기
      검침날짜: nodes.date || '',
      일련번호: nodes.msrNo || '',
      RSRP: nodes.rsrp ?? '',
      검침값: nodes.msrValue ?? '',
      계량기번호: nodes.meterNo || '', 

      // result_json: item.result ? JSON.stringify(item.result) : '',
    };
  });
    const ws = XLSX.utils.json_to_sheet(flat);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AllResults');
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
    XLSX.writeFile(wb, `AllResults_${dateStr}.xlsx`);
});

function downloadExcel() {
  let payload = null;
  if (nodesDataList && nodesDataList.length > 0) {
    payload = nodesDataList.map((item, idx) => ({
    idx: idx + 1,
    error: item.error || '',
    지자체: item.inputSite || '',
    IMEI: item.inputGrt || '',
    IMSI: nodes.imsi || '',
    // result.nodes 안에서 뽑아오기
    검침날짜: nodes.date || '',
    일련번호: nodes.msrNo || '',
    RSRP: nodes.rsrp ?? '',
    검침값: nodes.msrValue ?? '',
    계량기번호: nodes.meterNo || '',

    // result_json: item.result ? JSON.stringify(item.result) : '',
    }));
    } else if (latestNodesData) {
      payload = [{
        inputSite: latestNodesData.inputSite,
        inputGrt: latestNodesData.inputGrt,
        result_json: latestNodesData.result ? JSON.stringify(latestNodesData.result) : ''
      }];
    } else {
      alert("먼저 데이터를 가져오세요.");
      return;
    }
}
```

## style.css
<br>
protocol.html 전용 CSS 분류<br>


### pro.css
```css
    body {
      font-family: sans-serif;
      margin: 30px;
      background: #f7f7f7;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* padding: 10px 20px; */
      background-color: #f7f7f7;
    }
    .header img {
      padding: 10px 20px;
      height: 50px;
      object-fit: contain;
    }
    .header h2 {
      margin: 0;
      font-size: 30px;
    }
    h3 {
      margin: 0;
      font-size: 16px;
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
      cursor: pointer;
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
    #message {
      display:none; 
      font-size:18px; 
      font-weight:bold; 
      margin-top:10px; 
      color: #000;
    }
```

### 진행 내용
**Excel 출력 결과 변경**
1. 전체 결과인 result는 주석처리 후 IMSI, 검침날짜, 일련번호, RSRP, 검침값, 계량기번호 만 출력하여 Export
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/4e80a9c6-364d-44ea-9671-77f7ed57d5a0)
2. 초기 페이지 버튼 hover 기능 추가

---
### 2025-10-01 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- index.html을 초기 페이지로 설정
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## NTmoreAPI_1.0.0
<br>
기존 DataFormatCheck 내부에 있던 검침 데이터 API 데이터 확인 기능을 별도의 페이지로 분류<br>
 - index.html 내부에 있던 전체 코드를 NTmoreAPI, DataFormatCheck 별도 페이지로 분류<br>
 - 상기 페이지 적용되는 style, script를 별도 css, js로 분류하여 관리<br>
 - README 코드 기입 시 적용된 HTML, CSS, JS 분류하여 기재

### NTmoreAPI(HTML)
```html 
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>NTmoreAPI_1.0.0</title>
  <link rel="stylesheet" href="css/gri.css"/>
</head>
<body oncontextmenu="return false;">
  <div class="header">
    <h2>검침 데이터 API 데이터</h2>
    <a href="https://ntmore.kr/"><img src="https://ntmore.kr/images/kor06r-22-0459/common/top_logo_on.png" alt="Logo"></a>
  </div>
  <br>
  <div style="display:flex; align-items:flex-start; gap:16px;">
    <!-- IMEI 영역 -->
    <div style="display:flex; flex-direction:column;">
      <label for="grtIdInput">IMEI</label>
      <input id="grtIdInput" placeholder="IMEI(예: 865343071819914)" />
  </div>
    <!-- 지자체 영역 -->
    <div style="display:flex; flex-direction:column;">
      <label for="siteIdInput">지자체</label>
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
      </select>
    </div>
  </div>
  <div class="controls">
    <button id="fetchBtn" class="btn-primary small">데이터 호출하기</button>
    <label style="display:inline-flex; align-items:center; gap:8px;">
      <input type="file" id="excelInput" accept=".xlsx,.xls,.csv" />
      <span style="font-size:13px;">"Excel 목록 전체 호출" 진행 후 "데이터 다운로드"가 가능합니다.</span>
    </label>
    <button id="fetchAllBtn" class="btn-primary small">Excel 목록 전체 호출</button>
    <button id="downloadAllResults" class="btn-primary small">호출된 데이터 다운로드</button>
    <button class="btn-primary small" onclick="downloadTemplate()">Import 양식 다운로드</button>
  </div>
  <span id="urlDisplay" style="display:block; margin-top:8px;"></span>
  <pre id="output"></pre>
  <div id="parsedTableContainer">
    <table id="parsedTable">
      <thead>
        <tr><th>#</th><th>지자체</th><th>IMEI</th><th>동작</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  <script src="js/gri.js"></script>
</body>
</html>
```

### NTmoreAPI(CSS)
```css
    body {
      font-family: sans-serif;
      margin: 30px;
      background: #f7f7f7;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f7f7f7;
    }
    .header img {
      padding: 10px 20px;
      height: 50px;
      object-fit: contain;
    }
    .header h2 {
      margin: 0;
      font-size: 40px;
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
      margin: 6px 4px;
      cursor: pointer;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      /* margin-top: 15px; */
      background: white;
    }
    th, td {
      padding: 8px;
      text-align: left;
      box-shadow: inset 1px 0 0 0 #ccc, inset 0 1px 0 #ccc;
    }
    th {
      background: #eee;
    }
    #grtIdInput {
      width: 250px;
      height: 29px;
      font-family: monospace;
      font-size: 14px;
      /* padding: 8px; */
    }
    #siteIdInput {
      width: 220px;
      height: 36px;
      font-family: sans-serif;
      font-size: 14px;
    }
    #apiheader {
      height: 45px;
    }
    .excel-icon-btn {
      margin: auto;
      position: relative;
      background: none;
      border: none;
      justify-content: center;
      align-items: center;
      border-radius: 20%;
      padding: 0;
    }
    .excel-icon-btn img {
      width: 40px;
      height: 40px;
      margin: 2px;
    }
    #message {
      display:none; 
      font-size:18px; 
      font-weight:bold; 
      margin-top:10px; 
      color: #000;
    }
    .btn-primary{
      display: inline-block;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 5px;
      border: none;
      text-decoration: none;
      background: linear-gradient(180deg, #ccc 0%, #aaa 100%);
      color: #fff;
      box-shadow: 0 6px 18px rgba(21, 101, 216, 0.12);
      transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
    }
    .btn-primary:hover{ 
      filter: brightness(.92); 
    }
    .small {
      height: 34px;
      font-size: 13px;
      padding: 6px 10px;
    }
    .controls { 
      margin-top: 12px; 
      display:flex; 
      gap:8px; 
      align-items:center; 
      flex-wrap:wrap; 
    }
    #parsedTable thead th {
      position: sticky;
      top: 0;          
      background: #f1f1f1; 
      z-index: 2;
    }
    #parsedTableContainer { 
      max-height: 300px; 
      overflow: auto; 
      margin-top:10px; 
      border:1px solid #ccc; 
    }
    #output { white-space: pre-wrap; 
      background: #fff; 
      padding: 10px; 
      border-radius:6px; 
      border:1px solid #ddd; 
      max-height: 300px; 
      overflow:auto; 
    }
```

### NTmoreAPI(JS)
```js

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 123) { e.preventDefault(); alert('Error'); }
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) { e.preventDefault(); alert('Error'); }
  if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); alert('Error'); }
});

// 내부 상태
let latestNodesData = null; // 가장 최근 호출 결과
let nodesDataList = [];     // 여러 호출 결과 누적 (Fetch All용)
let parsedRows = [];        // Excel에서 읽어온 {siteId, grtId} 배열

// 공통: API 호출 함수 (grtId, siteId 받음)
async function fetchDataFor(grtId, siteId) {
  const url = `https://dfm-ct.watergrid.kr/api?grtId=${encodeURIComponent(grtId)}&siteId=${encodeURIComponent(siteId)}`;
  document.getElementById("urlDisplay").innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const result = await resp.json();
    // 최근 결과 저장
    latestNodesData = { inputGrt: grtId, inputSite: siteId, result };
    // 누적 리스트에도 저장
    nodesDataList.push(latestNodesData);
    // 화면 출력(간단)
    document.getElementById("output").textContent = JSON.stringify(latestNodesData, null, 2);
    return latestNodesData;
  } catch (err) {
    alert("데이터를 불러오는 중 오류 발생: " + err.message);
    return { inputGrt: grtId, inputSite: siteId, error: err.message };
  }
}

function downloadTemplate() {
    // 엑셀 시트 데이터 (헤더만 설정)
    let worksheetData = [
    ["IMEI", "지자체"]  // 첫 번째 행: 헤더
    ];

    // 워크시트와 워크북 생성
    let ws = XLSX.utils.aoa_to_sheet(worksheetData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ImportTemplate");

    // 파일 다운로드
    XLSX.writeFile(wb, "import_template.xlsx");
}

document.getElementById('fetchBtn').addEventListener('click', async () => {
  const grtId = document.getElementById('grtIdInput').value.trim();
  const siteId = document.getElementById('siteIdInput').value.trim();
  if (!grtId || !siteId) {
    alert("IMEI와 지자체를 입력/선택하세요.");
    return;
  }
  await fetchDataFor(grtId, siteId);
});

document.getElementById('excelInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const data = new Uint8Array(ev.target.result);
    const wb = XLSX.read(data, { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const imeiKeys = ['imei','IMEI','grtId','grt_id','grt id','grt','grtid','grtId'];
    const siteKeys = ['site','siteId','site_id','site id','지자체','siteid','site_id','siteName','site_name','site name'];
    parsedRows = raw.map((row, idx) => {
      let imeiVal = '';
      let siteVal = '';
      for (const k of Object.keys(row)) {
        const kn = k.replace(/\s+/g,'').toLowerCase();
        if (imeiKeys.map(x=>x.toLowerCase().replace(/\s+/g,'')).includes(kn)) imeiVal = row[k];
        if (siteKeys.map(x=>x.toLowerCase().replace(/\s+/g,'')).includes(kn)) siteVal = row[k];
      }
      // Also try direct keys if not found
      if (!imeiVal && (row['IMEI'] || row['imei'] || row['grtId'] || row['grt_id'])) {
        imeiVal = row['IMEI'] || row['imei'] || row['grtId'] || row['grt_id'];
      }
      if (!siteVal && (row['site'] || row['siteId'] || row['site_id'])) {
        siteVal = row['site'] || row['siteId'] || row['site_id'];
      }
      return {
        original: row,
        site: String(siteVal).trim(),
        imei: String(imeiVal).trim(),
        index: idx
      };
    });

    renderParsedTable();
  };
  reader.readAsArrayBuffer(file);
});

function renderParsedTable() {
  const tbody = document.querySelector('#parsedTable tbody');
  tbody.innerHTML = '';
  parsedRows.forEach((r, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${escapeHtml(r.site)}</td>
      <td>${escapeHtml(r.imei)}</td>
      <td>
        <button class="btn-primary small" data-idx="${i}" onclick="setAndFetch(${i})">데이터 호출하기</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 안전한 HTML 엔티티 처리
function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});
}

async function setAndFetch(idx) {
  const row = parsedRows[idx];
  if (!row) { alert("해당 행을 찾을 수 없습니다."); return; }

  // 1) inputs에 채우기
  document.getElementById('grtIdInput').value = row.imei || '';
  // site 셀렉트 매핑 시도
  const select = document.getElementById('siteIdInput');
  let setted = false;
  if (row.site) {
    for (let i=0;i<select.options.length;i++){
      if (select.options[i].value.toLowerCase() === String(row.site).toLowerCase()){
        select.selectedIndex = i; setted = true; break;
      }
    }
    if (!setted) {
      for (let i=0;i<select.options.length;i++){
        if (select.options[i].text.toLowerCase() === String(row.site).toLowerCase()){
          select.selectedIndex = i; setted = true; break;
        }
      }
    }
  }

  // 2) fetch 호출 (site 매핑 실패 시 select의 현재값 사용)
  let finalSite = setted ? select.options[select.selectedIndex].value : (row.site || select.value);
  const imei = row.imei || document.getElementById('grtIdInput').value;
  if (!imei || !finalSite) {
    alert("IMEI 또는 지자체 값이 없습니다. Excel 데이터를 확인하세요.");
    return;
  }
  await fetchDataFor(imei, finalSite);
}

document.getElementById('fetchAllBtn').addEventListener('click', async () => {
  if (!parsedRows || parsedRows.length === 0) { alert("선택된 Excel 파일이 없습니다."); return; }
  if (!confirm(`총 ${parsedRows.length}건을 순차적으로 호출합니다. 진행할까요?`)) return;
  nodesDataList = [];
  for (let i=0;i<parsedRows.length;i++){
    const r = parsedRows[i];
    let site = r.site || document.getElementById('siteIdInput').value;
    const imei = r.imei || document.getElementById('grtIdInput').value;
    if (!imei) {
      nodesDataList.push({ inputGrt: imei, inputSite: site, error: 'IMEI missing' });
      continue;
    }
    const select = document.getElementById('siteIdInput');
    let finalSite = site;
    let found = false;
    for (let j=0;j<select.options.length;j++){
      if (select.options[j].value.toLowerCase() === String(site).toLowerCase()) { finalSite = select.options[j].value; found = true; break; }
    }
    if (!found) {
      for (let j=0;j<select.options.length;j++){
        if (select.options[j].text.toLowerCase() === String(site).toLowerCase()) { finalSite = select.options[j].value; found = true; break; }
      }
    }
    const res = await fetchDataFor(imei, finalSite);
  }
  alert('데이터 호출 완료. 결과는 "API 전체 조회 데이터 다운로드"로 엑셀 저장하세요.');
});

document.getElementById('downloadAllResults').addEventListener('click', () => {
  if (!nodesDataList || nodesDataList.length === 0) { alert('저장할 결과가 없습니다. 먼저 호출을 진행하세요.'); return; }
  const flat = nodesDataList.map((item, idx) => {
    return {
      idx: idx + 1,
      inputSite: item.inputSite,
      inputGrt: item.inputGrt,
      error: item.error || '',
      result_json: item.result ? JSON.stringify(item.result) : ''
    };
  });
  const ws = XLSX.utils.json_to_sheet(flat);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'AllResults');
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  XLSX.writeFile(wb, `AllResults_${dateStr}.xlsx`);
});

function downloadExcel() {
  let payload = null;
  if (nodesDataList && nodesDataList.length > 0) {
    payload = nodesDataList.map((item, idx) => ({
      idx: idx + 1,
      inputSite: item.inputSite,
      inputGrt: item.inputGrt,
      error: item.error || '',
      result_json: item.result ? JSON.stringify(item.result) : ''
    }));
  } else if (latestNodesData) {
    payload = [{
      inputSite: latestNodesData.inputSite,
      inputGrt: latestNodesData.inputGrt,
      result_json: latestNodesData.result ? JSON.stringify(latestNodesData.result) : ''
    }];
  } else {
    alert("먼저 데이터를 가져오세요.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(payload);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "NodesData");
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  XLSX.writeFile(wb, `nodesData_${dateStr}.xlsx`);
}
```

### index.html(초기 접속 페이지)
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>DataFormatCheck_1.5.1</title>
  <link rel="stylesheet" href="css/style.css"/>
</head>
<link rel="stylesheet">
<body oncontextmenu="return false;">
    <div class="header">
      <h2>사용하실 페이지를 클릭하세요</h2>
      <a href="https://ntmore.kr/"><img src="https://ntmore.kr/images/kor06r-22-0459/common/top_logo_on.png" alt="Logo"></a>
    </div>
    <h3>API: 검침 데이터 API에서 데이터를 호출하여 확인하는 페이지<br>PROTOCOL: Payload 데이터를 파싱하여 서버에 전송된 상세정보를 확인하는 페이지</h3>
    <br>
    <a class="btn-primary" href="api.html" target="_blank" rel="noopener noreferrer" role="button" aria-pressed="false" style="background: linear-gradient(180deg, #999 0%, #aaa 100%);">API</a>
    <a class="btn-primary" href="protocol.html" target="_blank" rel="noopener noreferrer" role="button" aria-pressed="false" style="background: linear-gradient(180deg, #999 0%, #aaa 100%);">PROTOCOL</a>
</body>
</html>
```

### 진행 내용
**초기페이지**
1. API, PROTOCOL 버튼으로 API 조회 페이지, 데이터 파싱 페이지 접속 가능
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/098f85b0-cf24-4947-ab46-d7a3b0868635)

**NTmoreAPI page**
1. API 페이지 분류 및 일부 UI 디자인 변경
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/7f81505c-ed2e-48bd-8282-fe875bea9f5a)<br>
2. 여러 API 데이터를 호출하기 위해 Excel import 기능 추가
 - import excel 양식 버튼 추가 (IMEI, 지자체)
 - excel 양식 기입 후 해당 파일을 "파일 선택"으로 사이트에 import
 - import 된 데이터 확인
 - "Excel 목록 전체 호출" 클릭 후 "호출된 데이터 다운로드" 클릭 시 import 한 전체 데이터 추출후 export 가능<br>
--상세 기능 구현 및 코드 설명은 추후 별도 기입하여 Commit 예정(해당 내용을 변경하여 추후 기입), export까지의 내용은 별도 가이드 생성--<br>

---
### 2025-09-10 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## GS2.0
<br>

GS2.0 Version DataFormat 추가<br>

```html
<script>
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
  } else {
      alert(`지원하지 않는 데이터포맷입니다.`);
    return;
  }

</script>
```

### 진행 내용
**msrOffset 검침 시간 출력**
1. type 71 입력 시 GS2.0 Version DataFormat 출력
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/29502469-38eb-4128-8c0b-4d6e58e43e56)
<br>

---
### 2025-09-08 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## msrOffset 검침 시간 측정
<br>

msrOffset, mValue 과거 시간대를 1시간 단위로 차감하여 측정<br>

```html
<script>
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

    if (fieldName.startsWith("msrOffset") && displayValue.length >= 1) {
      if (isFailValue(rawValue)) { 
        displayValue = "검침이상";
      } else {
        let offsetValue = Number(displayValue);
        if (division === 1) offsetValue /= 10;
        else if (division === 2) offsetValue /= 100;
        else if (division === 3) offsetValue /= 1000;
        else if (division === 4) offsetValue /= 10000;
        else if (division === 5) offsetValue /= 100000;

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

          displayValue = `${result.toFixed(3)} ton (-${offsetValue}) <br> ${year}-${month}-${day} ${hour}:${minute}:${second}`;
          prevOffsetResult = result;
        } else {
          displayValue = "계산 불가";
        }
      }
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
</script>
```

### 진행 내용
**msrOffset 검침 시간 출력**
1. 기존 파싱된 시간 값 기준을 baseDate 객체를 적용하여 출력
2. msrOffset, mValue 데이터 키 값의 숫자를 -'시간' 값으로 적용
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/6229ecf0-dfaf-4f4f-b1b2-8d9f53b4b6f9)
3. <파싱 데이터 요약>에 mValue 검침시간이 추가 출력되어 msrStdValueVal 수정 및 위치변경
<br>


---
### 2025-09-05 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## msrOffset 검침 값 적용
<br>

msrOffset 상승 검침 값을 msrStdValue 차감 적용하여 출력 <br>

```html
<script>
    let prevOffsetResult = null;      // 이전 msrOffset 결과 저장

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
        msrStdValueVal = numericValue;
        prevOffsetResult = numericValue;
      }
      msrStdValueVal = displayValue;
    }
    if (fieldName.startsWith("msrOffset") && displayValue.length >= 1) {
      if (isFailValue(rawValue)) { 
        displayValue = "검침이상";
      } else {
        let offsetValue = Number(displayValue);
        if (division === 1) offsetValue /= 10;
        else if (division === 2) offsetValue /= 100;
        else if (division === 3) offsetValue /= 1000;
        else if (division === 4) offsetValue /= 10000;
        else if (division === 5) offsetValue /= 100000;
        if (typeof prevOffsetResult === "number") {
          const result = prevOffsetResult - offsetValue;
          displayValue = result.toFixed(3) + " ton";
          prevOffsetResult = result;
        } else {
          displayValue = "계산 불가";
        }
      }
    }
</script>
```

### 진행 내용
**msrOffset 결과 값 변경**
1. 소수점 3번째 자리까지 반올림 하여 출력
2. 기존 msrOffset 값은 (-상승값) 양식으로 추가
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/5cf0bd05-0c0b-458a-bfa0-5f6e253ac05f)
<br>

---
### 2025-08-28 GitHub Commit
#### 본 사이트를 개발하기위한 기본 작업 환경 
## 작업 환경 설정
- 개발 환경(Code Editer) Visual Studio Code 사용 <br>
- HTML 파일 내부에 script, style 코드 포함하여 진행(JS, CSS 파일 미분류)
- Github 와 연동 및 git 활용을 위하여 git Download
URL (Widows 최신버전 Download) : https://git-scm.com/downloads<br>
- Visual Studio Code 확장에서 Live Server 다운로드
- 코드 결과물 확인은 "alt + L" + "alt + O "

## CODE FIX
<br>

msrOffset 상위 비트 리틀에드안 변환 값 중 한자리 수는 소수점 및 'Ton'텍스트 적용안되던 오류 수정 <br>

```html
<script>
  if (fieldName.startsWith("msrOffset") && displayValue.length >= 1) {
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
  }
</script>
```

mValue 최신 검침 값(mValue 0)이 아닌 제일 오래된 검침 값(mValue 23 등)이 <파싱 데이터 요약>의 검침 값:에 출력 되던 오류 수정<br>

```html
<script>
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
      if (msrStdValueVal === "") {
      msrStdValueVal = displayValue;
    }
  }
</script>
```

### 진행 내용
**msrOffset, mValue 검침 값 관련 코드 수정**
1. mValue 0이 아닌 첫 번째 검침 값이 출력되게 수정
<br>

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
      const cleaned = raw.replace(/[\[\]]/g, "").trim();
      const arr = cleaned.split(/[\s,]+/).map(v => parseInt(v, 10)).filter(v => !isNaN(v));

      if (arr.length === 0) throw new Error("No valid numbers");
      const hexValues = arr.map(v => (v < 0 ? 256 + v : v).toString(16).padStart(2, "0"));
      const result = hexValues.join("").toUpperCase();

      output.textContent = result;
      message.style.display = "block";
    } 
  });
</script>
```
### 진행 내용
**IoTMaker Test Api Server 데이터 파싱**
1. [1, 2, 3, ...] 데이터 복사 붙여넣고 변환하기 버튼 클릭 시 파싱이 가능한 기존 서울시 데이터 포맷 양식의 Payload 데이터 출력되어, 해당 출력된 데이터를 다시한번 복사 붙여넣기 후 데이터 확인
--Image 참고--<br>
![Image](https://github.com/user-attachments/assets/9f67ee98-6ee4-40d9-9029-23c1657af17e)
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

## 검침 데이터 API 접속 URL 및 받아온 데이터 Excel Export
<br>

값 입력 후 데이터 가져오기를 클릭할 시 검침 데이터 API 사이트로 연결되는 URL 생성 및 가져온 데이터 Excel로 출력 가능<br>
```html
<div id="apiheader">
  <h2>검침 데이터 API 데이터 확인</h2>
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

## 검침 데이터 API
<br>

지자체를 선택한 뒤 IMEI를 입력하여 API 데이터를 화면에 출력<br>
```html
<div id="apiheader">
    <h2>검침 데이터 API 데이터 확인</h2>
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
**검침 데이터 API 데이터 출력 성공**
1. nodes 내부의 값만 가져오도록 코딩
2. 서버업체 지차체만 메뉴 고를 수 있게 설정: 의정부시, 부산시, 연천군, 김해시, 아산시, 함안군, 고창군, 하동군, 양산시, 군포시 김제시, 남해군<br>
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

