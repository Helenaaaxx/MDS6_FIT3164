document.addEventListener('DOMContentLoaded', () => {
    const dropBox = document.getElementById('dropBox');
    const fileInput = document.getElementById('fileInput');
    const generateButton = document.getElementById('generateButton');
    const output = document.getElementById('predictionResult');
  
    dropBox.addEventListener('click', () => fileInput.click());
  
    fileInput.addEventListener('change', (e) => {
      // Handle file selection from the dialog
      // You might want to store the file reference for processing when the button is clicked
    });
  
    dropBox.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
  
    dropBox.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      // Handle the files, possibly store them in a variable for later use
    });
  
    generateButton.addEventListener('click', () => {
      // Call your predictive tool logic here with the file data
      // For demonstration, this is a placeholder for the result after prediction
      output.innerHTML = `
        <h2>Prediction Result:</h2>
        <p>Estimated Prediction Accuracy: [accuracy]%</p>
        <!-- The table would be dynamically filled with prediction data -->
        <table id="resultTable">
          <!-- Headers of the result table -->
          <tr>
            <th>COSMIC_ID</th>
            <th>CELL_LINE</th>
            <th>CANCER_TYPE</th>
            <th>DRUG_ID</th>
            <th>DRUG_NAME</th>
            <th>LN_IC50</th>
            <th>AUC</th>
          </tr>
          <!-- Data rows would be inserted here -->
        </table>
      `;
      // You would replace the above HTML with actual data using DOM manipulation methods
    });
  });
  