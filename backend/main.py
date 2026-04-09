from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    vehicles = data.get("vehicles", 0)

    if vehicles < 100:
        level = "Low"
    elif vehicles < 200:
        level = "Medium"
    else:
        level = "High"

    return jsonify({
        "vehicles": vehicles,
        "traffic_level": level
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)