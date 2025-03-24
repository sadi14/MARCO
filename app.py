from flask import Flask, request, jsonify, render_template
import openai
import os

app = Flask(__name__)

# Replace with your actual OpenAI API key
openai.api_key = os.environ.get("OPENAI_API_KEY")  # Ensure to set up your API key as an environment variable


@app.route('/')
def writing_page():
    return render_template('writing.html')

@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        prompt = data['prompt']

        response = client.chat.completions.create(

            model="gpt-4o-mini",  # or another suitable model

            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        generated_text = response.choices[0].message.content
        return jsonify({'generated_text': generated_text})

    except Exception as e:
        app.logger.error(f"Error: {e}")  # Log the error for debugging.


        return jsonify({'error': str(e)}), 500 # Return error message and appropriate status code

if __name__ == '__main__':
    app.run(debug=True) # Set to False in production
