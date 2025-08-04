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
    if (!nodesData.length) {
    alert("먼저 데이터를 가져오세요.");
    return;
    }
    console.log("다운로드 함수 실행됨");
    console.log("nodesData:", nodesData);
    console.log("nodesData.length:", nodesData.length);

    // 배열 객체를 시트로 변환
    const worksheet = XLSX.utils.json_to_sheet(nodesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "NodesData");

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');

    XLSX.writeFile(workbook, `nodesData_${dateStr}.xlsx`);
}