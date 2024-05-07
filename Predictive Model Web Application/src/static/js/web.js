document.addEventListener('DOMContentLoaded', () => {
  // const fileInput = document.getElementById('fileInput');
  // const clearButton = document.getElementById('clearButton');
  // const submitButton = document.getElementById('submitButton');
  // const dropBox = document.getElementById('fileUploadSection');
  // const output = document.getElementById('resultsPreview');

  // dropBox.addEventListener('click', () => fileInput.click());

  // fileInput.addEventListener('change', handleFiles);

  // dropBox.addEventListener('dragover', (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   e.dataTransfer.dropEffect = 'copy';
  // });

  // dropBox.addEventListener('drop', (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   const files = e.dataTransfer.files;
  //   fileInput.files = files;
  //   handleFiles();
  // });

  // // // clearButton.addEventListener('click', () => {
  // // //   fileInput.value = '';
  // // //   output.innerHTML = '';
  // // // });

  // // submitButton.addEventListener('click', () => {
  // //   if (fileInput.files.length) {
  // //     output.innerHTML = '<p>Processing files...</p>';
  // //     // Implement the file processing and prediction logic here
  // //   } else {
  // //     alert('Please select a file to submit.');
  // //   }
  // // });

  // // function handleFiles() {
  // //   const files = fileInput.files;
  // //   // Implement file handling logic here
  // // }



});
// Continue from the existing script.js content
// Add any specific logic for buttons and file handling
// The detailed implementation will depend on your application's backend and logic

// document.getElementById('makePredictionButton').addEventListener('click', function() {
//   // Trigger the prediction process
//   // Fetch the input value
//   var cancerType = document.getElementById('cancerTypeInput').value;
//   // Use cancerType to make a prediction, likely involving an API call or another form of data processing
//   // Then update the prediction results and accuracy
// });


function defaultButton(){
  var fileUploadSec = document.getElementById("fileUploadSection");
  var predictionSec = document.getElementById('predictionSection');
  var visualLabel= document.getElementById("predictionOutputLabel");
  var predictionLabel = document.getElementById('predictionLabel');

  fileUploadSec.innerHTML = '<div style="height:0px;">'+'</div>';
  predictionSec.innerHTML= '<div style="height:0px;">'+'</div>';
  predictionLabel.textContent="Default GDSC-CCLE Drug-Cell line sensitivity dataset";
  visualLabel.textContent = "Default GDSC-CCLE Drug-Cell Sensitivity Visualisation";

}

// function manualtButton(){
//   var fileUploadSec = document.getElementById("fileUploadSection");
//   var predictionSec = document.getElementById('predictionSection');
//   var visualLabel= document.getElementById("predictionOutputLabel");
//   var predictionLabel = document.getElementById('predictionLabel');
//   fileUploadSec.innerHTML = '<div class="drop-area">'+'<p class="file-upload-instructions">'+'<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">'+
//   'Drop and Upload Dataset in CSV file for Prediction</p>'+'<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple hidden>'+
//   '<button class="drop-box" onclick=onclick="document.getElementById("fileInput").click();">Browse File</button>'+'<p id="uploadedFileName"></p>'+'</div>';
//   predictionSec.innerHTML= ' <div id="predictionDiv">'+' <button id="makePredictionButton">Make Prediction</button>'+'</div>';

//   predictionLabel.textContent="Prediction result";
//   visualLabel.textContent = "Prediction output Visualisation";
// }

// function manualButton() {
//   var fileUploadSec = document.getElementById("fileUploadSection");
//   var predictionSec = document.getElementById('predictionSection');
//   var visualLabel = document.getElementById("predictionOutputLabel");
//   var predictionLabel = document.getElementById('predictionLabel');

//   // Update HTML to show upload area
//   fileUploadSec.innerHTML = '<div class="drop-area">' +
//       '<p class="file-upload-instructions">' +
//       '<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">' +
//       'Drop and Upload Dataset in CSV file for Prediction</p>' +
//       '<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden>' +
//       '<button class="drop-box" onclick="document.getElementById(\'fileInput\').click();">Browse File</button>' +
//       '<p id="uploadedFileName"></p>' +  // Added for displaying uploaded file name
//       '</div>';

//   // Prediction button area, initially visible
//   predictionSec.innerHTML = '<div id="predictionDiv">' +
//       '<button id="makePredictionButton">Make Prediction</button>' +
//       '</div>';

//   predictionLabel.textContent = "Prediction result";
//   visualLabel.textContent = "Prediction output Visualisation";

//   // Setup file input to handle file selection
//   setupFileUpload();
// }

// function setupFileUpload() {
//   var fileInput = document.getElementById('fileInput');
//   var uploadedFileName = document.getElementById('uploadedFileName');
//   var makePredictionButton = document.getElementById('makePredictionButton');

//   fileInput.addEventListener('change', function() {
//     if (this.files.length > 0) {
//       var file = this.files[0];  // Assuming single file selection
//       var formData = new FormData();
//       formData.append('file', file);

//       fetch('/upload', {
//         method: 'POST',
//         body: formData
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.filename) {
//           uploadedFileName.textContent = 'Uploaded File: ' + data.filename;
//           makePredictionButton.style.display = 'block';  // Ensure the button is visible when file is successfully uploaded
//         } else {
//           uploadedFileName.textContent = 'Failed to upload file. ' + (data.error ? data.error : 'No error message.');
//           makePredictionButton.style.display = 'none';  // Hide button if upload fails
//         }
//       })
//       .catch(error => {
//         console.error('Error uploading file:', error);
//         uploadedFileName.textContent = 'Failed to upload file.';
//         makePredictionButton.style.display = 'none';  // Hide button on error
//       });
//     }
//   });
// }

function manualButton() {
  var fileUploadSec = document.getElementById("fileUploadSection");
  var predictionSec = document.getElementById('predictionSection');
  var visualLabel = document.getElementById("predictionOutputLabel");
  var predictionLabel = document.getElementById('predictionLabel');

  // Update HTML to show upload area
  fileUploadSec.innerHTML = '<div class="drop-area">' +
      '<p class="file-upload-instructions">' +
      '<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">' +
      'Drop and Upload Dataset in CSV file for Prediction</p>' +
      '<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden>' +
      '<button class="drop-box" onclick="document.getElementById(\'fileInput\').click();">Browse File</button>' +
      '<p id="uploadedFileName"></p>' +  // Added for displaying uploaded file name
      '</div>';
  // fileUploadSec.innerHTML = '<div class="drop-area">'+'<p class="file-upload-instructions">'+'<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">'+
  // 'Drop and Upload Dataset in CSV file for Prediction</p>'+'<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple hidden>'+
  // '<button class="drop-box" onclick=onclick="document.getElementById("fileInput").click();">Browse File</button>'+'<p id="uploadedFileName"></p>'+'</div>';
  // predictionSec.innerHTML= ' <div id="predictionDiv">'+' <button id="makePredictionButton">Make Prediction</button>'+'</div>';

  // Initially hide the Make Prediction button
  predictionSec.innerHTML = '<div id="predictionDiv">' +
      '<button id="makePredictionButton" style="display:none;">Make Prediction</button>' +
      '</div>';

  predictionLabel.textContent = "Prediction result";
  visualLabel.textContent = "Prediction output Visualisation";

  // Setup file input to handle file selection
  setupFileUpload();

   // Now that the button is added to the DOM, set up the click event listener
   var makePredictionButton = document.getElementById('makePredictionButton');
   makePredictionButton.style.display = 'block'; // Make the button visible
   makePredictionButton.addEventListener('click', function() {
       const uploadedFileName = document.getElementById('uploadedFileName').textContent.split(': ')[1].trim(); // Assuming the filename follows "Uploaded File: filename.csv"
       document.getElementById('resultsPreview').textContent = 'LOADING...';

       fetch('/run-model', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ filename: uploadedFileName })
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               updateTable(data.resultFilePath);
               document.getElementById('resultsPreview').textContent = 'SUCCESS, PRESS ON REFRESH TO SEE THE TABLE';
           } else {
               document.getElementById('resultsPreview').textContent = 'Error: ' + (data.error ? data.error : 'Unknown error.');
           }
       })
       .catch(error => {
           console.error('Error:', error);
           document.getElementById('resultsPreview').textContent = 'Failed to run model';
       });
   });

   function updateTable(filePath) {
    // Assuming the result is a CSV file hosted on the server
    fetch(filePath)
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split('\n').map(row => row.split(','));
        let html = '<table>';
        rows.forEach((cells, idx) => {
            html += '<tr>';
            cells.forEach(cell => {
                html += `<td>${cell}</td>`;
            });
            html += '</tr>';
        });
        html += '</table>';
        document.getElementById('table-container').innerHTML = html;
    })
    .catch(error => console.error('Error loading table:', error));
  }
}

function setupFileUpload() {
  var fileInput = document.getElementById('fileInput');
  var uploadedFileName = document.getElementById('uploadedFileName');
  var makePredictionButton = document.getElementById('makePredictionButton');

  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      var file = this.files[0];  // Assuming single file selection
      var formData = new FormData();
      formData.append('file', file);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.filename) {
          uploadedFileName.textContent = 'Uploaded File: ' + data.filename;
          makePredictionButton.style.display = 'block';  // Show the button only when file is successfully uploaded
        } else {
          uploadedFileName.textContent = 'Failed to upload file. ' + (data.error ? data.error : 'No error message.');
          makePredictionButton.style.display = 'none';  // Keep button hidden if upload fails
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        uploadedFileName.textContent = 'Failed to upload file.';
        makePredictionButton.style.display = 'none';  // Keep button hidden on error
      });
    }
  });
}

// document.getElementById('makePredictionButton').addEventListener('click', function() {
//   const uploadedFileName = document.getElementById('uploadedFileName').textContent.split(': ')[1].trim(); // Assuming the filename follows "Uploaded File: filename.csv"
//   document.getElementById('resultsPreview').textContent = 'LOADING...';

//   // API call to run the model
//   fetch('/run-model', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({filename: uploadedFileName})
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data.success) {
//           updateTable(data.resultFilePath);
//           document.getElementById('resultsPreview').textContent = 'SUCCESS';
//       } else {
//           document.getElementById('resultsPreview').textContent = 'Error: ' + (data.error ? data.error : 'Unknown error.');
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       document.getElementById('resultsPreview').textContent = 'Failed to run model';
//   });

//   function updateTable(filePath) {
//     // Assuming the result is a CSV file hosted on the server
//     fetch(filePath)
//     .then(response => response.text())
//     .then(csv => {
//         const rows = csv.split('\n').map(row => row.split(','));
//         let html = '<table>';
//         rows.forEach((cells, idx) => {
//             html += '<tr>';
//             cells.forEach(cell => {
//                 html += `<td>${cell}</td>`;
//             });
//             html += '</tr>';
//         });
//         html += '</table>';
//         document.getElementById('table-container').innerHTML = html;
//     })
//     .catch(error => console.error('Error loading table:', error));
//   }
// });

document.addEventListener('DOMContentLoaded', function() {
  manualButton();  // Ensure manualButton is called to setup the initial state
});


// function manualButton() {
//   var fileUploadSec = document.getElementById("fileUploadSection");
//   var predictionSec = document.getElementById('predictionSection');
//   var visualLabel = document.getElementById("predictionOutputLabel");
//   var predictionLabel = document.getElementById('predictionLabel');

//   // Update HTML to show upload area and make prediction button
//   fileUploadSec.innerHTML = '<div class="drop-area">' +
//       '<p class="file-upload-instructions">' +
//       '<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">' +
//       'Drop and Upload Dataset in CSV file for Prediction</p>' +
//       '<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden>' +
//       '<button class="drop-box" onclick="document.getElementById(\'fileInput\').click();">Browse File</button>' +
//       '</div>';

//   predictionSec.innerHTML = '<div id="predictionDiv">' +
//       '<button id="makePredictionButton" style="display:none;">Make Prediction</button>' +
//       '</div>';

//   predictionLabel.textContent = "Prediction result";
//   visualLabel.textContent = "Prediction output Visualisation";

//   // Setup file input to handle file selection
//   setupFileUpload();
// }

// function setupFileUpload() {
//   var fileInput = document.getElementById('fileInput');
//   var uploadedFileName = document.getElementById('uploadedFileName');

//   fileInput.addEventListener('change', function() {
//     if (this.files.length > 0) {
//       var file = this.files[0];  // Assuming single file selection
//       var formData = new FormData();
//       formData.append('file', file);

//       fetch('/upload', {
//         method: 'POST',
//         body: formData
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.filename) {
//           uploadedFileName.textContent = 'Uploaded File: ' + data.filename;
//           document.getElementById('makePredictionButton').style.display = 'block';
//         } else {
//           uploadedFileName.textContent = 'Failed to upload file. ' + (data.error ? data.error : 'No error message.');
//         }
//       })
//       .catch(error => {
//         console.error('Error uploading file:', error);
//         uploadedFileName.textContent = 'Failed to upload file.';
//       });
//     }
//   });
// }



// function updateTable(filePath) {
//   // Assuming the result is a CSV file hosted on the server
//   fetch(filePath)
//   .then(response => response.text())
//   .then(csv => {
//       const rows = csv.split('\n').map(row => row.split(','));
//       let html = '<table>';
//       rows.forEach((cells, idx) => {
//           html += '<tr>';
//           cells.forEach(cell => {
//               html += `<td>${cell}</td>`;
//           });
//           html += '</tr>';
//       });
//       html += '</table>';
//       document.getElementById('table-container').innerHTML = html;
//   })
//   .catch(error => console.error('Error loading table:', error));
// }


document.addEventListener('DOMContentLoaded', function() {
  setupFileUpload();
});

document.getElementById('makePredictionButton').addEventListener('click', function() {
  var uploadedFileName = document.getElementById('uploadedFileName').textContent.split(': ')[1].trim(); // Extract the filename
  document.getElementById('resultsPreview').textContent = 'LOADING...';

  // API call to run the model
  fetch('/run-model', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({filename: uploadedFileName})
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          updateTable(data.resultFilePath);
          document.getElementById('resultsPreview').textContent = 'SUCCESS';
      } else {
          document.getElementById('resultsPreview').textContent = 'Error: ' + data.error;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('resultsPreview').textContent = 'Failed to run model';
  });
});

// function updateTable(filePath) {
//   // Assuming the result is a CSV file hosted on the server
//   fetch(filePath)
//   .then(response => response.text())
//   .then(csv => {
//       const rows = csv.split('\n').map(row => row.split(','));
//       let html = '<table>';
//       rows.forEach((cells, idx) => {
//           html += '<tr>';
//           cells.forEach(cell => {
//               html += `<td>${cell}</td>`;
//           });
//           html += '</tr>';
//       });
//       html += '</table>';
//       document.getElementById('table-container').innerHTML = html;
//   })
//   .catch(error => console.error('Error loading table:', error));
// }



(function() {
  var DELIMITER = ',';
  var NEWLINE = '\n';
  var filePath = "/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data.csv";
  var table = document.getElementById('table-container');

  if (!table) {
      return;
  }

  fetch(filePath)
      .then(response => response.text())
      .then(text => {
          toTable(text);
      })
      .catch(error => console.error('Error fetching file:', error));

  function toTable(text) {
      if (!text) {
          return;
      }

      var rows = text.split(NEWLINE);
      var tableHTML = '<thead><tr>';
      var headers = rows.shift().trim().split(DELIMITER);
      headers.forEach(function(header, index) {
          var trimmedHeader = header.trim();
          if (trimmedHeader) {
            if (index === 0) {
            
              tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn" onclick="queue()"> <i class="fa fa-sort"></i></button></th>';
          } else if(index === 1){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn1" onclick="queue1()"> <i class="fa fa-sort"></i></button></th>';
          }
          else if(index === 2){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn2" onclick="queue2()"> <i class="fa fa-sort"></i></button></th>';
          }
          else if(index === 3){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn3" onclick="queue3()"> <i class="fa fa-sort"></i></button></th>';
          }
          else if(index === headers.length - 1){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn4" onclick="queue4()"> <i class="fa fa-sort"></i></button></th>';
          }
          }
      });
      
      tableHTML += '</tr></thead><tbody>';

      rows.forEach(function(row) {
          var trimmedRow = row.trim();
          if (trimmedRow) {
              var cols = trimmedRow.split(DELIMITER);
              tableHTML += '<tr>';
              cols.forEach(function(col) {
                  var trimmedCol = col.trim();
                  tableHTML += '<td>' + trimmedCol + '</td>';
              });
              tableHTML += '</tr>';
          }
      });

      tableHTML += '</tbody>';
      table.innerHTML = '<table id="drug-table">' + tableHTML + '</table>';
  }
})();


// document.getElementById('makePredictionButton').addEventListener('click', function() {
//   var uploadedFileName = document.getElementById('uploadedFileName').textContent;
//   var filePath = '/user_file/' + uploadedFileName.split(': ')[1];  // Adjust based on how filename is displayed

//   // Display loading text
//   document.getElementById('resultsPreview').textContent = 'LOADING....';

//   // Make the API call to run the prediction
//   fetch('/predict', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({latestFilePath: filePath})
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Update the UI with the new data
//       updateTable(data.resultFilePath);
//       document.getElementById('resultsPreview').textContent = 'Success';
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       document.getElementById('resultsPreview').textContent = 'Failed to load predictions';
//   });
// });

// function updateTable(resultFilePath) {
//   fetch(resultFilePath)
//   .then(response => response.text())
//   .then(data => {
//       // Assuming the data is in CSV format
//       var rows = data.split('\n');
//       var html = '<table><thead><tr>';
//       var headers = rows[0].split(',');
//       headers.forEach(header => {
//           html += `<th>${header}</th>`;
//       });
//       html += '</tr></thead><tbody>';
//       rows.slice(1).forEach(row => {
//           html += '<tr>';
//           row.split(',').forEach(cell => {
//               html += `<td>${cell}</td>`;
//           });
//           html += '</tr>';
//       });
//       html += '</tbody></table>';
//       document.getElementById('table-container').innerHTML = html;
//   })
//   .catch(error => console.error('Error loading the table:', error));
// }


exportBtn.addEventListener("click", function() {
    
  var table = document.getElementById("drug-table");
  
    
    var csv = [];
    var rows = table.rows;
  
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].cells;
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      csv.push(row.join(","));
    }
    csv = csv.join("\n");

  
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

 
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Drug_Breast_Cancer_Data.csv";

  
  link.click();
});

var isAscending = 1;

function queue(){
  isAscending+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 0; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending%2 ===0){
        
        return value1.localeCompare(value2);
      }
      else{
        return value2.localeCompare(value1);
      }
      
  });

  
  var tbody = table.querySelector("tbody");
  rows.forEach(function(row) {
      tbody.appendChild(row);
  });
};


var isAscending1 = 1;

function queue1(){
  isAscending1+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 1; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending1%2 ===0){
        
        return value1.localeCompare(value2);
      }
      else{
        return value2.localeCompare(value1);
      }
      
  });

  
  var tbody = table.querySelector("tbody");
  rows.forEach(function(row) {
      tbody.appendChild(row);
  });
};


var isAscending2 = 1;

function queue2(){
  isAscending2+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 2; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending2%2 ===0){
        
        return value1.localeCompare(value2);
      }
      else{
        return value2.localeCompare(value1);
      }
      
  });

  
  var tbody = table.querySelector("tbody");
  rows.forEach(function(row) {
      tbody.appendChild(row);
  });
};
  

var isAscending3 = 1;

function queue3(){
  isAscending3+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 3; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending3%2 ===0){
        
        return value1.localeCompare(value2);
      }
      else{
        return value2.localeCompare(value1);
      }
      
  });

  
  var tbody = table.querySelector("tbody");
  rows.forEach(function(row) {
      tbody.appendChild(row);
  });
};

var isAscending4 = 1;

function queue4(){
  isAscending4+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 4; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending4%2 ===0){
        
        return value1.localeCompare(value2);
      }
      else{
        return value2.localeCompare(value1);
      }
      
  });

  
  var tbody = table.querySelector("tbody");
  rows.forEach(function(row) {
      tbody.appendChild(row);
  });
};