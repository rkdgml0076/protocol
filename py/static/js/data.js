(function () {
      const logEl = document.getElementById("log");
      const statusEl = document.getElementById("status");
      const sendBtn = document.getElementById("sendBtn");
      const msgInput = document.getElementById("msgInput");
      const base64Output = document.getElementById("base64Output");

      function ts() {
        return new Date().toLocaleString();
      }

      function appendLog(text) {
        logEl.textContent += `[${ts()}] ${text}\n`;
        logEl.scrollTop = logEl.scrollHeight;
      }

      function setStatus(text) {
        statusEl.textContent = text;
      }

      function hexToBytes(hexStr) {
        const matches = hexStr.match(/[0-9a-fA-F]{2}/g);
        return matches ? new Uint8Array(matches.map(b => parseInt(b, 16))) : new Uint8Array([]);
      }

      function bytesToBase64(bytes) {
        let binary = '';
        bytes.forEach(b => binary += String.fromCharCode(b));
        return btoa(binary);
      }

      // HEX 입력이 바뀔 때마다 Base64 업데이트
      function updateBase64() {
        const hex = msgInput.value.trim();
        if (!hex) { base64Output.value = ''; return; }
        try {
          const bytes = hexToBytes(hex);
          base64Output.value = bytesToBase64(bytes);
        } catch (e) {
          base64Output.value = '오류';
        }
      }

      msgInput.addEventListener('input', updateBase64);
      updateBase64(); // 초기값 반영

      async function sendUdp() {
        const ip = document.getElementById("ipInput").value.trim();
        const port = document.getElementById("portInput").value.trim();
        const msg = base64Output.value.trim(); // Base64로 전송

        if (!ip) { appendLog("오류: IP가 비어있음."); setStatus("오류"); return; }
        if (!port || isNaN(port) || Number(port) <= 0) { appendLog("오류: 포트가 유효하지 않음."); setStatus("오류"); return; }
        if (!msg) { appendLog("오류: 메시지가 비어있음."); setStatus("오류"); return; }

        sendBtn.disabled = true;
        setStatus("전송 중...");

        try {
          const res = await fetch("/send_udp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip, port, msg })
          });

          const data = await res.json();

          if (data.status === "sent") {
            appendLog(`[성공] ${data.ip}:${data.port} 길이=${data.msg_len}바이트, Base64=${msg}`);
            setStatus("UDP 전송 성공 ✅");
          } else {
            appendLog(`[실패] ${data.message || "알 수 없는 오류"}`);
            setStatus("UDP 전송 실패 ❌");
          }
        } catch (err) {
          appendLog(`요청 실패: ${err}`);
          setStatus("요청 실패");
        } finally {
          sendBtn.disabled = false;
        }
      }

      sendBtn.addEventListener("click", sendUdp);
      appendLog("HEX → Base64 UDP 전송 페이지 로드 완료.");
    })();

    socket();
	function socket(){
		try{
			var socket = io.connect("http://15.164.9.31:7784", { transports: ['websocket'] });
	        
			$('#send').click(function(){
				alert("전송 하였습니다.");
				text = $('#time').val() + "," + $('#device').val();
				socket.emit("send", text);
	    	});

	        //소켓 서버로 부터 send_msg를 통해 이벤트를 받을 경우 
	    	//socket.on('send_msg', function(msg) {
			//	alert(msg);
	        //});
		}catch(e){
			
		}
  }