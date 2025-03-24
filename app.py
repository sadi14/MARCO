from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = "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"  # Replace with your actual API key

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        response = openai.Completion.create(
            engine="text-davinci-003",  # Or another suitable engine
            prompt=prompt,
            max_tokens=200,  # Adjust as needed
            temperature=0.7,  # Adjust as needed
            n=1,
            stop=None,
        )

        generated_text = response.choices[0].text.strip()
        return jsonify({"generated_text": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
