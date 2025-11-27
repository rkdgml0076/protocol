/********* 상태 관리 *********/
let latestNodesData = null;
let nodesDataList = [];
let parsedRows = [];

/********* 보안용 키 차단 *********/
document.addEventListener('keydown', e => {
  if (e.keyCode === 123 || (e.ctrlKey && e.keyCode === 85) || 
      (e.ctrlKey && e.shiftKey && [73,74,67].includes(e.keyCode))) {
    e.preventDefault();
    alert('Error');
  }
});

/********* 공통: API 호출 *********/
async function fetchDataFor(grtId, siteId) {
  const url = `https://dfm-ct.watergrid.kr/api?grtId=${encodeURIComponent(grtId)}&siteId=${encodeURIComponent(siteId)}`;
  document.getElementById("urlDisplay").innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const result = await resp.json();
    latestNodesData = { inputGrt: grtId, inputSite: siteId, result };
    nodesDataList.push(latestNodesData);
    document.getElementById("output").textContent = JSON.stringify(latestNodesData, null, 2);
    return latestNodesData;
  } catch(err) {
    alert("데이터 불러오기 오류: "+err.message);
    return { inputGrt: grtId, inputSite: siteId, error: err.message };
  }
}

/********* site select editable *********/
function makeEditable(selectEl){
  const handler = event => {
    const sel = event.currentTarget;
    const input = document.createElement('input');
    input.type='text'; input.value = sel.options[sel.selectedIndex]?.text||''; 
    input.id = sel.id+'_editable';
    input.style.minWidth = (sel.offsetWidth||160)+'px';
    sel.replaceWith(input); input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    input.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ input.blur(); }
      else if(e.key==='Escape'){ restoreSelect(sel); }
    });

    input.addEventListener('blur', ()=>{
      const newVal = input.value.trim();
      const newSelect = sel.cloneNode(true);
      if(newVal){
        const exist = Array.from(newSelect.options).find(o=>o.text===newVal||o.value===newVal);
        if(exist){ newSelect.value=exist.value; }
        else{ const opt=document.createElement('option'); opt.value=opt.textContent=newVal; newSelect.insertBefore(opt,newSelect.firstChild); newSelect.value=opt.value; }
      } else { newSelect.value=sel.value; }
      input.replaceWith(newSelect); makeEditable(newSelect);
    });

    function restoreSelect(original){
      const restored = original.cloneNode(true);
      const maybeInput=document.getElementById(original.id+'_editable');
      if(maybeInput) maybeInput.replaceWith(restored);
      makeEditable(restored);
    }
  };

  selectEl.removeEventListener('dblclick', handler);
  selectEl.addEventListener('dblclick', handler);
}
makeEditable(document.getElementById('siteIdInput'));

/********* Excel 처리 *********/
function downloadTemplate(){
  const data=[["IMEI","지자체"],["865343071819914","고창군"],["355800490911801","김제시"],["869692067499248","의정부시"]];
  const ws=XLSX.utils.aoa_to_sheet(data);
  const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,"ImportTemplate");
  XLSX.writeFile(wb,"import_template.xlsx");
}

document.getElementById('excelInput').addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    const wb = XLSX.read(new Uint8Array(ev.target.result), {type:'array'});
    const raw = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:''});
    const imeiKeys=['imei','IMEI','grtId','grt_id','grt id','grt','grtid','grtId'];
    const siteKeys=['site','siteId','site_id','site id','지자체','siteid','siteName','site_name','site name'];

    parsedRows = raw.map((row, idx)=>{
      let imeiVal='', siteVal='';
      for(const k of Object.keys(row)){
        const kn=k.replace(/\s+/g,'').toLowerCase();
        if(imeiKeys.map(x=>x.toLowerCase().replace(/\s+/g,'')).includes(kn)) imeiVal=row[k];
        if(siteKeys.map(x=>x.toLowerCase().replace(/\s+/g,'')).includes(kn)) siteVal=row[k];
      }
      return {original:row, imei:String(imeiVal).trim(), site:String(siteVal).trim(), index:idx};
    });
    renderParsedTable();
    e.target.value=''; // 🌟 갱신 문제 해결
  };
  reader.readAsArrayBuffer(file);
});

/********* 테이블 렌더링 *********/
function renderParsedTable(){
  const tbody=document.querySelector('#parsedTable tbody'); tbody.innerHTML='';
  parsedRows.forEach((r,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${i+1}</td><td>${escapeHtml(r.site)}</td><td>${escapeHtml(r.imei)}</td>
      <td><button class="btn-primary small" onclick="setAndFetch(${i})">데이터 불러오기</button></td>`;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }

/********* 단일/행별 fetch *********/
async function setAndFetch(idx){
  const row=parsedRows[idx]; if(!row){alert("행 없음"); return;}
  document.getElementById('grtIdInput').value=row.imei||'';
  const select=document.getElementById('siteIdInput'); 
  let found=false; 
  if(row.site){
    for(let i=0;i<select.options.length;i++){
      if(select.options[i].value.toLowerCase()===row.site.toLowerCase()){select.selectedIndex=i; found=true; break;}
      if(select.options[i].text.toLowerCase()===row.site.toLowerCase()){select.selectedIndex=i; found=true; break;}
    }
  }
  const finalSite=found? select.value: row.site||select.value;
  if(!row.imei||!finalSite){alert("IMEI/지자체 확인"); return;}
  await fetchDataFor(row.imei, finalSite);
}

document.getElementById('fetchBtn').addEventListener('click', async ()=>{
  const grtId=document.getElementById('grtIdInput').value.trim();
  const siteId=document.getElementById('siteIdInput').value.trim();
  if(!grtId||!siteId){alert("IMEI/지자체 입력"); return;}
  await fetchDataFor(grtId, siteId);
});

/********* 전체 fetch + 진행률 *********/
document.getElementById('fetchAllBtn').addEventListener('click', async ()=>{
  if(!parsedRows.length){alert("Excel 파일 없음"); return;}
  if(!confirm(`총 ${parsedRows.length}건 호출합니다.`)) return;

  const btn=document.getElementById('fetchAllBtn'); btn.disabled=true;
  const bar=document.getElementById('progressBar'), text=document.getElementById('progressText');
  document.getElementById('progressContainer').style.display='block';
  nodesDataList=[];

  for(let i=0;i<parsedRows.length;i++){
    const {imei,site}=parsedRows[i];
    if(!imei){nodesDataList.push({inputGrt:imei,inputSite:site,error:'IMEI 없음'}); continue;}
    let finalSite=site||document.getElementById('siteIdInput').value;
    try{await fetchDataFor(imei, finalSite);} 
    catch(err){nodesDataList.push({inputGrt:imei,inputSite:finalSite,error:err?.message||String(err)});}
    const percent=Math.round(((i+1)/parsedRows.length)*100);
    bar.style.width=percent+'%'; text.textContent=`${percent}% (${i+1}/${parsedRows.length})`;
  }
  btn.disabled=false;
  alert('전체 데이터 불러오기 완료');
});

/********* 결과 다운로드 *********/
document.getElementById('downloadAllResults').addEventListener('click', ()=>{
  if(!nodesDataList.length){alert('저장할 결과 없음'); return;}
  const flat=nodesDataList.map((item,idx)=>({
    idx:idx+1, error:item.error||'', 
    지자체:item.inputSite||'', 
    IMEI:item.inputGrt||'',
    IMSI:item.result?.nodes?.imsi||'', 
    검침날짜:item.result?.nodes?.date||'',
    일련번호:item.result?.nodes?.msrNo||'', 
    SW:item.result?.nodes?.msrFw||'',
    배터리:item.result?.nodes?.msrVolt??'', 
    RSRP:item.result?.nodes?.rsrp??'', 
    RSRQ:item.result?.nodes?.rsrq??'',
    SINR:item.result?.nodes?.snr??'', 
    검침값:item.result?.nodes?.msrValue??'', 
    계량기번호:item.result?.nodes?.meterNo||'',
    Ber:item.result?.nodes?.ber??''
  }));
  const ws=XLSX.utils.json_to_sheet(flat);
  const wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'AllResults');
  const dateStr=new Date().toISOString().slice(0,19).replace(/[-T:]/g,'');
  XLSX.writeFile(wb,`AllResults_${dateStr}.xlsx`);
});
