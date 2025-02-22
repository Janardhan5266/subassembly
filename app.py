
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import time
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys  # Import for pressing ENTER
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # Fixed WebSocket disconnections

# Configure Selenium WebDriver
geckodriver_path = r"C:\Users\janar\mobile pole\backend\geckodriver.exe"
firefox_options = Options()
firefox_options.add_argument("-profile")
firefox_options.add_argument(r"C:\Users\janar\AppData\Roaming\Mozilla\Firefox\Profiles\o60162pp.default-release")

# Global flag to track if a message is being sent
is_sending = False
lock = threading.Lock()  # Lock to handle multiple requests

@app.route("/")
def home():
    return render_template("index.html")  # Load frontend


# ✅ Ensure WebSocket Connection
@socketio.on("connect")
def handle_connect():
    print("Client connected")
    emit("status_update", {"status": "CONNECTED"})  # Notify client on successful connection


@app.route("/send_message", methods=["POST"])
def send_message():
    global is_sending

    data = request.get_json()
    message = data.get("message", "")
    user_id = data.get("user_id")  # Unique identifier for the sender

    if not message:
        return jsonify({"success": False, "error": "Empty message"}), 400

    group_name = "dummy"  # Replace with actual group name

    def send_whatsapp_message():
        global is_sending
        print("✅ Received request to send message!")  # Debug Log
        with lock:  # Ensure only one message is sent at a time
            if is_sending:
                return  # Prevent multiple messages from running at the same time
            is_sending = True  # Set flag as process started
            socketio.emit("status_update", {"status": "PROCESS_RUNNING"})  # Notify all users

            try:
                # Initialize WebDriver
                service = Service(geckodriver_path)
                driver = webdriver.Firefox(service=service, options=firefox_options)

                driver.get("https://web.whatsapp.com/")
                time.sleep(10)  # Allow login
                
                
                # Locate and select group chat
                search_box = WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@aria-label='Search']"))
                )
                search_box.click()
                search_box.clear()

                for letter in group_name:
                    search_box.send_keys(letter)
                    time.sleep(0.05)

                search_box.send_keys(Keys.ENTER)
                time.sleep(3)

                # Locate message box and send message
                message_box = WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@aria-label='Type a message']"))
                )
                message_box.click()
                message_box.clear()

                for letter in message:
                    message_box.send_keys(letter)
                    time.sleep(0.05)

                message_box.send_keys(Keys.ENTER)
                time.sleep(5)

                driver.quit()

                
                
                socketio.emit("status_update", {"status": "PROCESS_COMPLETED"})  # Notify all users
               # socketio.emit("message_sent", {"user_id": user_id, "message": message})  # Notify only sender

            except Exception as e:
                socketio.emit("status_update", {"status": "ERROR", "error": str(e)})
            
            finally:
                is_sending = False  # Reset flag
    
    # Run the process in a separate thread
    threading.Thread(target=send_whatsapp_message).start()

    return jsonify({"success": True, "message": "Message process started"})


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)  # Use socket.io for real-time updates
