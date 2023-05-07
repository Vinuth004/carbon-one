from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/api/getApiKey')
def get_api_key():
    api_key = os.environ.get('OPENAI_API_KEY')
    return jsonify({'apiKey': api_key})

if __name__ == '__main__':
    app.run()

