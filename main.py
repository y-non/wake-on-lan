from flask import Flask, request, jsonify
import paramiko

# Initialize Flask app
app = Flask(__name__)

def execute_remote_command(host, username, password, command):
    """
    General function to execute a command on the remote PC.
    """
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect to the target PC
        print(f"Connecting to {host}...")
        client.connect(hostname=host, username=username, password=password)
        print("Connected successfully.")

        # Execute the given command
        print(f"Executing command: {command}")
        stdin, stdout, stderr = client.exec_command(command)
        output = stdout.read().decode()
        error = stderr.read().decode()

        if error:
            print(f"Error: {error}")
            return {"success": False, "error": error}
        else:
            print("Command executed successfully.")
            return {"success": True, "output": output}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "error": str(e)}
    finally:
        client.close()
        print("Connection closed.")

@app.route("/sleep", methods=["POST"])
def sleep_remote_pc():
    """
    Endpoint to put the remote PC to sleep.
    """
    host = "192.168.1.2"
    username = "yonno"
    password = "0948811722aA"

    if not host or not username or not password:
        return jsonify({"success": False, "message": "Missing required parameters"}), 400

    # Normal sleep command for Windows
    command = "rundll32.exe powrprof.dll,SetSuspendState 0,1,0"
    result = execute_remote_command(host, username, password, command)
    return jsonify(result)

@app.route("/shutdown", methods=["POST"])
def shutdown_remote_pc():
    """
    Endpoint to shut down the remote PC.
    """
    host = "192.168.1.2"
    username = "yonno"
    password = "0948811722aA"

    if not host or not username or not password:
        return jsonify({"success": False, "message": "Missing required parameters"}), 400

    # Shutdown command for Windows
    command = "shutdown /s /t 0"
    result = execute_remote_command(host, username, password, command)
    return jsonify(result)

if __name__ == "__main__":
    # Run the Flask server
    app.run(host="0.0.0.0", port=5000)
