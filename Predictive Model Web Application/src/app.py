from flask import Flask, render_template, send_from_directory
import csv
import os

app = Flask(__name__)

# Route to serve the CSV file directly
@app.route('/Drug_Breast_Cancer_Data.csv')
def serve_csv():
    csv_path = "C:/Users/Ali Azhar/Documents/DrugRes/MDS6_FIT3164/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data.csv"
    directory = os.path.dirname(csv_path)
    csv_filename = os.path.basename(csv_path)
    return send_from_directory(directory, csv_filename, as_attachment=True)

# Home page route that also passes CSV data to the webpage
@app.route('/')
def home():
    data = []
    csv_path = "C:/Users/Ali Azhar/Documents/DrugRes/MDS6_FIT3164/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data.csv"
    try:
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            csv_reader = csv.reader(csvfile)
            data = [row for row in csv_reader]
    except FileNotFoundError:
        data = [["Error", "File not found."]]
    
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)