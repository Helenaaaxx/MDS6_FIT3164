from flask import Flask, render_template, send_from_directory, jsonify, request 
from werkzeug.utils import secure_filename
import csv
import pandas as pd
from model.model import run_model
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

IMAGE_FOLDER = 'static/images'
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER

USER_FOLDER = 'user_file'
app.config['USER_FOLDER'] = USER_FOLDER

MODEL_FOLDER = 'uploads/NEW_FINAL_PREDICTION.h5'
app.config['MODEL_FOLDER'] = MODEL_FOLDER

RESULT_FOLDER = 'result'
app.config['RESULT_FOLDER'] = RESULT_FOLDER

# Define the folders
# UPLOAD_FOLDER = 'uploads'
# USER_FOLDER = 'user_file'
# RESULT_FOLDER = 'result'
# MODEL_PATH = os.path.join(UPLOAD_FOLDER, 'PREDICTION.h5')
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['USER_FOLDER'] = USER_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

for folder in [UPLOAD_FOLDER, USER_FOLDER, RESULT_FOLDER, IMAGE_FOLDER]:
    if not os.path.exists(folder):
        os.makedirs(folder)

@app.route('/predict', methods=['POST'])
def make_prediction():
    data = request.json
    print("Received JSON data:", data)  # Debugging information

    # Extract the filename and ensure it's a valid string
    uploaded_filename = data.get('uploaded_filename', '')
    if not uploaded_filename or not isinstance(uploaded_filename, str):
        print("Error: Invalid or missing filename.")
        return jsonify({'message': 'Invalid or missing filename'}), 400

    # Construct the path for the uploaded file
    csv_path = os.path.join(app.config['USER_FOLDER'], uploaded_filename)
    print("Constructed CSV path:", csv_path)  # Debugging information

    # Check if the file exists
    if not os.path.exists(csv_path):
        print("Error: File not found.")
        return jsonify({'message': 'File not found'}), 404

    # Run the model and handle exceptions gracefully
    try:
        prediction_df = run_model(MODEL_FOLDER, csv_path)
    except Exception as e:
        print(f"Error during model prediction: {e}")
        return jsonify({'message': 'Error during model prediction', 'details': str(e)}), 500

    # Save the results to a CSV file
    result_filename = 'user_prediction_result.csv'
    result_path = os.path.join(app.config['RESULT_FOLDER'], result_filename)
    prediction_df = prediction_df[['COSMIC_ID', 'CELL_LINE_NAME', 'DRUG_ID', 'DRUG_NAME', 'PRED_LN_IC50', 'Resistance_Cut-Off']]
    prediction_df.to_csv(result_path, index=False)

    return jsonify({'message': 'Prediction completed', 'result_filename': result_filename})


# @app.route('/predict', methods=['POST'])
# def make_prediction():
#     # Retrieve the uploaded filename from the JSON data
#     data = request.json
#     uploaded_filename = data.get('uploaded_filename', '')

#     if not uploaded_filename or not isinstance(uploaded_filename, str):
#         return jsonify({'message': 'Invalid or missing filename'}), 400

#     # Construct the path for the uploaded CSV file
#     csv_path = os.path.join(app.config['USER_FOLDER'], uploaded_filename)

#     # Check if the CSV file exists
#     if not os.path.exists(csv_path):
#         return jsonify({'message': 'File not found'}), 404

#     # Run the prediction using the provided model
#     try:
#         prediction_df = run_model(MODEL_PATH, csv_path)
#     except Exception as e:
#         return jsonify({'message': 'Error during model prediction', 'details': str(e)}), 500

#     # Write the prediction DataFrame to a CSV file in the results folder
#     result_filename = 'user_prediction_result.csv'
#     result_path = os.path.join(app.config['RESULT_FOLDER'], result_filename)
#     prediction_df.to_csv(result_path, index=False)

#     return jsonify({'message': 'Prediction completed', 'result_filename': result_filename})

@app.route('/results/<filename>')
def download_result(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

# Ensure the folders exist
# for folder in [UPLOAD_FOLDER, RESULT_FOLDER]:
#     if not os.path.exists(folder):
#         os.makedirs(folder)

# @app.route('/upload', methods=['POST'])
# def file_upload():
#     file = request.files['file']
#     if file:
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         return jsonify({'filename': filename})
#     return jsonify({'error': 'No file uploaded'})

# # Route to serve the CSV file directly
# @app.route('/Drug_Breast_Cancer_Data.csv')
# def serve_csv():
#     csv_path = "C:/Users/Ali Azhar/Documents/DrugRes/MDS6_FIT3164/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data.csv"
#     directory = os.path.dirname(csv_path)
#     csv_filename = os.path.basename(csv_path)
#     return send_from_directory(directory, csv_filename, as_attachment=True)

# Home page route that also passes CSV data to the webpage
@app.route('/')
def home():
    # data = []
    # csv_path = "C:/Users/Ali Azhar/Documents/DrugRes/MDS6_FIT3164/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data.csv"
    # try:
    #     with open(csv_path, newline='', encoding='utf-8') as csvfile:
    #         csv_reader = csv.reader(csvfile)
    #         data = [row for row in csv_reader]
    # except FileNotFoundError:
    #     data = [["Error", "File not found."]]
    
    return render_template('index.html')



@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/static/images/<filename>')
def uploaded_image(filename):
    return send_from_directory(app.config['IMAGE_FOLDER'], filename)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['USER_FOLDER'], filename)
    file.save(file_path)

    return jsonify({'message': f'Uploaded file: {filename}', 'filename': filename})


# @app.route('/predict', methods=['POST'])
# def make_prediction():
#     # Retrieve the uploaded file's name and the model path
#     data = request.json
#     print("Received data:", data)  # Debugging info
#     uploaded_filename = data.get('uploaded_filename')
#     # uploaded_filename = request.json.get('uploaded_filename')
#     model_path = MODEL_FOLDER

#     # Make sure the uploaded file exists
#     file_path = os.path.join(app.config['USER_FOLDER'], uploaded_filename)
#     if not os.path.exists(file_path):
#         return jsonify({'message': 'File not found'}), 404

#     # Run the model prediction
#     result_df = run_model(model_path, file_path)

#     # Save the result as a CSV
#     result_filename = f'result_{uploaded_filename}'
#     result_path = os.path.join(app.config['RESULT_FOLDER'], result_filename)
#     result_df.to_csv(result_path, index=False)

#     return jsonify({'message': 'Prediction completed', 'result_filename': result_filename})

# @app.route('/predict', methods=['POST'])
# def make_prediction():
#     # Retrieve the uploaded file name from the JSON request data
#     data = request.json
#     uploaded_filename = data.get('uploaded_filename', '')

#     if not uploaded_filename or not isinstance(uploaded_filename, str):
#         return jsonify({'message': 'Invalid filename type or missing filename'}), 400

#     # Build the file path and ensure it exists
#     file_path = os.path.join(app.config['USER_FOLDER'], uploaded_filename)
#     if not os.path.exists(file_path):
#         return jsonify({'message': 'File not found'}), 404

#     # Run model predictions using the uploaded file
#     result_df = run_model(MODEL_FOLDER, file_path)

#     # Save the results to a CSV file in the results folder
#     result_filename = f'result_{uploaded_filename}'
#     result_path = os.path.join(app.config['RESULT_FOLDER'], result_filename)
#     result_df.to_csv(result_path, index=False)

#     return jsonify({'message': 'Prediction completed', 'result_filename': result_filename})

# @app.route('/results/<filename>')
# def download_result(filename):
#     return send_from_directory(app.config['RESULT_FOLDER'], filename)



if __name__ == '__main__':
    app.run(debug=True)