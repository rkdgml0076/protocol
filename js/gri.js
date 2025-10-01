
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 123) { e.preventDefault(); alert('Error'); }
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) { e.preventDefault(); alert('Error'); }
  if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); alert('Error'); }
});

// ���� ����
let latestNodesData = null; // ���� �ֱ� ȣ�� ���
let nodesDataList = [];     // ���� ȣ�� ��� ���� (Fetch All��)
let parsedRows = [];        // Excel���� �о�� {siteId, grtId} �迭

// ����: API ȣ�� �Լ� (grtId, siteId ����)
async function fetchDataFor(grtId, siteId) {
  const url = `https://dfm-ct.watergrid.kr/api?grtId=${encodeURIComponent(grtId)}&siteId=${encodeURIComponent(siteId)}`;
  document.getElementById("urlDisplay").innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const result = await resp.json();
    // �ֱ� ��� ����
    latestNodesData = { inputGrt: grtId, inputSite: siteId, result };
    // ���� ����Ʈ���� ����
    nodesDataList.push(latestNodesData);
    // ȭ�� ���(����)
    document.getElementById("output").textContent = JSON.stringify(latestNodesData, null, 2);
    return latestNodesData;
  } catch (err) {
    alert("�����͸� �ҷ����� �� ���� �߻�: " + err.message);
    return { inputGrt: grtId, inputSite: siteId, error: err.message };
  }
}

function downloadTemplate() {
    // ���� ��Ʈ ������ (����� ����)
    let worksheetData = [
    ["IMEI", "����ü"]  // ù ��° ��: ���
    ];

    // ��ũ��Ʈ�� ��ũ�� ����
    let ws = XLSX.utils.aoa_to_sheet(worksheetData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ImportTemplate");

    // ���� �ٿ�ε�
    XLSX.writeFile(wb, "import_template.xlsx");
}

document.getElementById('fetchBtn').addEventListener('click', async () => {
  const grtId = document.getElementById('grtIdInput').value.trim();
  const siteId = document.getElementById('siteIdInput').value.trim();
  if (!grtId || !siteId) {
    alert("IMEI�� ����ü�� �Է�/�����ϼ���.");
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
    const siteKeys = ['site','siteId','site_id','site id','����ü','siteid','site_id','siteName','site_name','site name'];
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
        <button class="btn-primary small" data-idx="${i}" onclick="setAndFetch(${i})">������ ȣ���ϱ�</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ������ HTML ��ƼƼ ó��
function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});
}

async function setAndFetch(idx) {
  const row = parsedRows[idx];
  if (!row) { alert("�ش� ���� ã�� �� �����ϴ�."); return; }

  // 1) inputs�� ä���
  document.getElementById('grtIdInput').value = row.imei || '';
  // site ����Ʈ ���� �õ�
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

  // 2) fetch ȣ�� (site ���� ���� �� select�� ���簪 ���)
  let finalSite = setted ? select.options[select.selectedIndex].value : (row.site || select.value);
  const imei = row.imei || document.getElementById('grtIdInput').value;
  if (!imei || !finalSite) {
    alert("IMEI �Ǵ� ����ü ���� �����ϴ�. Excel �����͸� Ȯ���ϼ���.");
    return;
  }
  await fetchDataFor(imei, finalSite);
}

document.getElementById('fetchAllBtn').addEventListener('click', async () => {
  if (!parsedRows || parsedRows.length === 0) { alert("���õ� Excel ������ �����ϴ�."); return; }
  if (!confirm(`�� ${parsedRows.length}���� ���������� ȣ���մϴ�. �����ұ��?`)) return;
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
  alert('������ ȣ�� �Ϸ�. ����� "API ��ü ��ȸ ������ �ٿ�ε�"�� ���� �����ϼ���.');
});

document.getElementById('downloadAllResults').addEventListener('click', () => {
  if (!nodesDataList || nodesDataList.length === 0) { alert('������ ����� �����ϴ�. ���� ȣ���� �����ϼ���.'); return; }
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
    alert("���� �����͸� ����������.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(payload);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "NodesData");
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  XLSX.writeFile(wb, `nodesData_${dateStr}.xlsx`);
}