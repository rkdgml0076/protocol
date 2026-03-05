from flask import Flask, render_template, request, jsonify
import socket
import base64
import os
import sys

def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS  # PyInstaller 임시 폴더
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

app = Flask(
    __name__,
    template_folder=resource_path("templates"),
    static_folder=resource_path("static")
)

@app.route("/")
def index():
    return render_template("data.html")

@app.route("/send_udp", methods=["POST"])
def send_udp():
    try:
        data = request.get_json(force=True)
    except Exception as e:
        return jsonify({"status": "error", "message": f"JSON 파싱 실패: {e}"}), 400

    msg = data.get("msg", "")
    target_ip = data.get("ip", "15.164.9.31")

    try:
        target_port = int(data.get("port", 7784))
    except Exception:
        return jsonify({"status": "error", "message": "포트는 정수여야 합니다."}), 400

    # ✅ Base64 → Binary 변환
    try:
        binary_data = base64.b64decode(msg, validate=True)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Base64 변환 실패: {e}"}), 400

    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.sendto(binary_data, (target_ip, target_port))
        sock.close()

        print(f"[UDP 전송 성공] {target_ip}:{target_port} ({len(binary_data)}B)")

        return jsonify({
            "status": "sent",
            "ip": target_ip,
            "port": target_port,
            "msg_len": len(binary_data)
        })

    except Exception as e:
        print(f"[UDP 전송 실패] {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    # Flask Port 5000
    app.run(host="0.0.0.0", port=5000, debug=True)
