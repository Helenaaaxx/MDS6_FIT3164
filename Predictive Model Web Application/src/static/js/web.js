// let uploadedFileName = '';

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

//display default dataset
function defaultButton(){
  var fileUploadSec = document.getElementById("fileUploadSection");
  var predictionSec = document.getElementById('predictionSection');
  var visualLabel= document.getElementById("predictionOutputLabel");
  var predictionLabel = document.getElementById('predictionLabel');
  

  fileUploadSec.innerHTML = '<div style="height:0px;">'+'</div>';
  predictionSec.innerHTML= '<div style="height:0px;">'+'</div>';
  predictionLabel.textContent="Default GDSC-CCLE Drug-Cell line sensitivity dataset";
  visualLabel.textContent = "Default GDSC-CCLE Drug-Cell Sensitivity Visualisation";

  // createTable('/Predictive Model Web Application/src/uploads/Drug_Breast_Cancer_Data_Display.csv');

  createTable(defaultDatasetUrl);


}


//use to choose manual prediction
function manualtButton(){
  var fileUploadSec = document.getElementById("fileUploadSection");
  var predictionSec = document.getElementById('predictionSection');
  var visualLabel= document.getElementById("predictionOutputLabel");
  var predictionLabel = document.getElementById('predictionLabel');
  var table = document.getElementById('table-container');
  var visual = document.getElementById('bar_chart');

  

  // fileUploadSec.innerHTML = '<div class="drop-area">'+'<p class="file-upload-instructions">'+'<img src= images/upload_logo_url alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">'+
  // 'Drop and Upload Dataset in CSV file for Prediction</p>'+'<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple hidden>'+
  // '<button class="drop-box" onclick="document.getElementById("fileInput").click();">Browse File</button>'+'<p id="uploadedFileName"></p>'+'</div>';
  // predictionSec.innerHTML= ' <div id="predictionDiv">'+' <button id="makePredictionButton">Make Prediction</button>'+'</div>';

  
  fileUploadSec.innerHTML = `
        <div class="drop-area">
            <p class="file-upload-instructions">
                <img src= ${upload_logo_url}  alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">
                Drop and Upload Dataset in CSV file for Prediction
            </p>
            <input type="file" id="fileInput" accept=".csv, .xlsx, .xls" multiple hidden>
            <button class="drop-box" id="browseButton">Browse File</button>
            <p id="uploadedFileName"></p>
        </div>
    `;

    let uploadedFileNameDisplay = document.getElementById("uploadedFileName");

  predictionSec.innerHTML = `
    <div id="predictionDiv">
        <button id="makePredictionButton" class="predictionDivBtn">Make Prediction</button>
        <button id="clearPredictionButton" class="predictionDivBtn">Clear Prediction</button>
        <p id="predictionStatus"></p>
    </div>
    `;

  predictionLabel.textContent="Prediction result";
  visualLabel.textContent = "Prediction output Visualisation";

  table.innerHTML = '<table>'  + '</table>';
  visual.innerHTML='';

  // browse file
  uploadedFileName = document.getElementById("uploadedFileName");
    var fileInput = document.getElementById("fileInput");
    var browseButton = document.getElementById("browseButton");
    var dropArea = document.querySelector(".drop-area");

    // When the "Browse File" button is clicked, simulate a click on the hidden file input
    browseButton.addEventListener('click', function () {
        fileInput.click();
    });

    // Handle file selection via the file input
    fileInput.addEventListener('change', function () {
        handleFiles(this.files);
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area on drag enter and over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    // Unhighlight drop area on drag leave and drop
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    // Handle file drop
    dropArea.addEventListener('drop', function (e) {
        var files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Function to handle and upload files
    function handleFiles(files) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
          
            uploadedFileName.textContent = data.message;
            console.log(uploadedFileName.textContent);
        })
        .catch(error => {
            uploadedFileName.textContent = 'Error uploading file: ' + error.message;
        });
        
    }

  //   makePredictionButton.addEventListener('click', function () {
  //     if (!uploadedFileName) {
  //         alert('Please upload a file before making a prediction.');
  //         return;
  //     }

  //     // Show a loading message while waiting for the prediction results
  //     predictionStatus.textContent = "LOADING...";

  //     fetch('/predict', {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({'uploaded_filename': uploadedFileName})
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //         predictionStatus.textContent = data.message;

  //         // Call createTable with the result file URL after processing is done
  //         if (data.result_filename) {
  //             createTable(`/results/${data.result_filename}`);
  //         } else {
  //             predictionStatus.textContent = "Error: No result file returned.";
  //         }
  //     })
  //     .catch(error => {
  //         predictionStatus.textContent = 'Error during prediction: ' + error.message;
  //     });
  // });

//   makePredictionButton.addEventListener('click', function () {
//     if (!uploadedFileName) {
//         alert('Please upload a file before making a prediction.');
//         return;
//     }

//     predictionStatus.textContent = "LOADING...";

//     fetch('/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 'uploaded_filename': uploadedFileName })  // Make sure this is a string
//     })
//     .then(response => response.json())
//     .then(data => {
//         predictionStatus.textContent = data.message;
//         if (data.result_filename) {
//             createTable(`/results/${data.result_filename}`);
//         } else {
//             predictionStatus.textContent = "Error: No result file returned.";
//         }
//     })
//     .catch(error => {
//         predictionStatus.textContent = 'Error during prediction: ' + error.message;
//     });
// });

// fileInput.addEventListener('change', function () {
//   // Assuming only a single file is uploaded
//   const file = this.files[0];
//   uploadedFileName = file.name;  // Update the global `uploadedFileName` variable

//   // Display the name of the uploaded file
//   uploadedFileNameDisplay.textContent = `Uploaded File: ${uploadedFileName}`;
// });

// Event listener for file uploads via input or drag-and-drop
fileInput.addEventListener('change', function () {
  const file = this.files[0];  // Assuming a single file upload
  if (file) {
      uploadedFileName = file.name;  // Update the global uploadedFileName variable
      uploadedFileNameDisplay.textContent = `Uploaded File: ${uploadedFileName}`;  // Show the file name in the DOM
  } else {
      uploadedFileNameDisplay.textContent = "No file uploaded";
  }
});

function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
          uploadedFileNameDisplay.textContent = data.message;  // Update the message from the server response
      } else {
          uploadedFileNameDisplay.textContent = "Upload failed";
      }
  })
  .catch(error => {
      uploadedFileNameDisplay.textContent = `Error: ${error.message}`;
  });
}

makePredictionButton.addEventListener('click', function () {
  if (!uploadedFileName) {
      alert('Please upload a file before making a prediction.');
      return;
  }

  // Show a loading message
  predictionStatus.textContent = "LOADING...";

  // Send the uploaded filename in JSON format
  fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'uploaded_filename': uploadedFileName })
  })
  .then(response => response.json().then(data => ({ status: response.status, data })))
  .then(({ status, data }) => {
      if (status !== 200) {
          throw new Error(data.message || "Prediction request failed");
      }

      predictionStatus.textContent = data.message;
      if (data.result_filename) {
          createTable(`/results/${data.result_filename}`);
      } else {
          predictionStatus.textContent = "Error: No result file returned.";
      }
  })
  .catch(error => {
      predictionStatus.textContent = 'Error during prediction: ' + error.message;
  });
});





}



//create table using flask
//create table and visualisation, just pass the file path as parameter
function createTable(path) {
  var uniqueValues1 = new Set();
  var DELIMITER = ',';
  var NEWLINE = '\n';
  var filePath = path;
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
      var cellname = '';
      var Ic50 = '';

      headers.forEach(function(header, index) {
          var trimmedHeader = header.trim();
          if (trimmedHeader) {
            if (index === 0) {
              tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn" onclick="queue()"> <i class="fa fa-sort"></i></button></th>';
          } else if(index === 1){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn1" onclick="queue1()"> <i class="fa fa-sort"></i></button></th>';
            cellname = trimmedHeader;
          }
          else if(index === 2){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn2" onclick="queue2()"> <i class="fa fa-sort"></i></button></th>';
          }
          else if(index === 3){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn3" onclick="queue3()"> <i class="fa fa-sort"></i></button></th>';
          }
          else if(index === 4){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn4" onclick="queue4()"> <i class="fa fa-sort"></i></button></th>';
            Ic50 = trimmedHeader;
          }
          else if(index === headers.length - 1){
            tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn5" onclick="queue5()"> <i class="fa fa-sort"></i></button></th>';
          }
          }
      });
      
      tableHTML += '</tr></thead><tbody>';

      rows.forEach(function(row) {
          var trimmedRow = row.trim();
          if (trimmedRow) {
              
              var cols = trimmedRow.split(DELIMITER);
              tableHTML += '<tr>';
              cols.forEach(function(col, index) {             
                  var trimmedCol = col.trim();

                  if(index ==0){
                    
                    uniqueValues1.add(trimmedCol);
                  }
                  tableHTML += '<td>' + trimmedCol + '</td>';
              });
              tableHTML += '</tr>';
          }
      });

      console.log(Ic50)
      tableHTML += '</tbody>';
      table.innerHTML = '<table id="drug-table">' + tableHTML + '</table>';
      var arr1 = Array.from(uniqueValues1);
      var jsonData = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": {
          "text": "Bar Chart of Drug Resistance on Different Breast Cancer Cell \n",
          "align": "center",
          "fontSize": 31,
          "offset": 20
        },
        "width": 2600,
        "background": "white",
        "data": {
          "url": path
        },
        "mark": {"type": "bar", "cursor": "pointer"},
        "transform": [
          {"filter": "datum.COSMIC_ID == COSMIC_ID"}
        ],
        // "facet": {
        //   "column": {
        //     "header": {"labelAngle": 0},
        //     "field": "COSMIC_ID",
        //     "type": "nominal",
        //     "header": {"labelAngle": 0}
        //   }
        // },
        "encoding": {
          "x": {
            "field": Ic50,
            "type": "quantitative",
            "title": "LN_IC50",
            "axis": {
              "titleFontSize": 18, 
              "labelFontSize": 14}
          },
          "y": {
            "field": "DRUG_ID",
            "type": "nominal",
            "title": "Drug ID",
            // "sort": "x",
            "sort": {
              "op": "mean",
              "field": Ic50,
              "order": "ascending"
            },
            "axis": {"titleFontSize": 18, "labelFontSize": 14}
          },
          // "color": {
          //   "field": Ic50,
          //   "type": "quantitative",
          //   "scale": {
          //     "domain": [null, 3.77],
          //     "range": ["orange", "#9D9A9A"]
          //   },
          //   "title": "LN_IC50"
          // },
          // "color": {
          //   "field": Ic50,
          //   "type": "quantitative",
          //   "scale": null, // Disable scale
          //   "title": "LN_IC50",
          //   "condition": [
          //     {"test": {"field": Ic50, "lte": 3.77}, "value": "orange"}, // If Ic50 <= 3.77, set color to orange
          //     {"value": "gray"} // Otherwise, set color to gray
          //   ]
          // },
          "color": {
            "field": Ic50,
            "type": "quantitative",
            "scale": {
              "domain": [null, 3.77],
              "range": ["darkorange", "gray"],
              "clamp": true // Clamp values outside the domain to the range
            },
            "title": "LN_IC50"
          },
          // "color": {
          //   "field": "LN_IC50",
          //   "type": "quantitative",
          //   "scale": null, // Disable scale
          //   "title": "LN_IC50",
          //   "condition": {
          //     "test": "datum.LN_IC50 <= 3.77",
          //     "value": "orange"
          //   },
          //   "else": {"value": "gray"}
          // },
          "tooltip": [
            {"field": "DRUG_NAME", "type": "nominal"},
            {"field": "DRUG_ID", "type": "nominal"},
            {"field": cellname, "type": "nominal"},
            {"field": "COSMIC_ID", "type": "nominal"},
            {"field": Ic50, "type": "quantitative", "format": ".2f"},
            {"field": "Resistance_Cut-Off", "type": "nominal", "title": "Resistance"}
          ]
        },
        "params": [
          {
            "name": "COSMIC_ID",
            "value": arr1[0],
            "bind": {
              "input": "select",
              "options": arr1,
              "name": "Select Cosmic ID: "
            }
          }
        ],
        "config": {}
      };
      
      vegaEmbed('#bar_chart', jsonData, { "actions": false }).then(function (result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
        var dropdownButton = document.querySelector('.vega-bindings');
        if (dropdownButton) {
          dropdownButton.style.position = 'absolute';
          dropdownButton.style.top = '10px'; // Adjust as needed
          dropdownButton.style.left = '10px'; // Adjust as needed
          dropdownButton.style.position = 'absolute';
    dropdownButton.style.top = '10px'; // Adjust as needed
    dropdownButton.style.left = '10px'; // Adjust as needed
    dropdownButton.style.padding = '10px'; // Add padding as needed
        }
      }).catch(console.error);
      
  }
};

// download table
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


function download(){
  var link = document.getElementById("downloadSample");
  link.download = "sample_user_data.csv";

  

}

var isAscending = 1;


//sort function for column1
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
//sort function for column2
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
//sort function for column3
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
//sort function for column4
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
//sort function for column5
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

//sort function for column6
var isAscending5 = 1;

function queue5(){
  isAscending5+=1;
  var table = document.getElementById("drug-table");
  if (!table) {
      console.error("Table not found.");
      return;
  }

  
  var index = 5; 

  
  var rows = Array.from(table.rows);
  rows.shift();

 
  rows.sort(function(row1, row2) {
      var value1 = row1.cells[index].textContent.trim();
      var value2 = row2.cells[index].textContent.trim();
      if(isAscending5%2 ===0){
        
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


var checkedValues = [[],[],[],[]];
var checkedIndex = [];
//filter function
function filter(index, element) {
  
  

  var dropdown1 = element;
  var table = document.getElementById("drug-table");
  

  var uniqueValues = new Set();
  for(var i = 1; i < table.rows.length; i++){

    var cellValue = table.rows[i].cells[index].textContent.trim();
    uniqueValues.add(cellValue);
  }

  var arr = Array.from(uniqueValues);
  var allcheckBox = [];
  var allLabel = [];


  
  var rows = Array.from(table.rows);

  
  var textField = document.createElement("input");
  textField.type = "text";
  textField.placeholder = "Search";
  textField.id="search"+index;
  textField.className="search";
  dropdown1.appendChild(textField);
  dropdown1.appendChild(document.createElement("br"));


  //Create Select All Button
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = "Select All";
  checkbox.id="checkAll"+index;
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode("Select All"));
  dropdown1.appendChild(label);
  dropdown1.appendChild(document.createElement("br"));

  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = "Unselect All";
  checkbox.id="uncheckAll"+index;
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode("Unselect All"));
  dropdown1.appendChild(label);
  dropdown1.appendChild(document.createElement("br"));


  arr.forEach(function(value) {
    
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    allcheckBox.push(checkbox);
    
    checkbox.addEventListener("change", function(event) {
      
      // Call a function when the checkbox is checked
      if (event.target.checked) {
        if(!checkedValues[index].includes(event.target.value)){
          checkedValues[index].push(event.target.value);
          
          
        }
        if(document.getElementById("uncheckAll"+index).checked===true){
          document.getElementById("uncheckAll"+index).checked = false;
        }
      } else {
        var num = checkedValues[index].indexOf(event.target.value);
        if(checkedValues[index].length===1){
          checkedValues[index].pop();
         
        }
        else{
          checkedValues[index].splice(num, 1);
          console.log(checkedValues);
          console.log('delete');
        
        }
      

        if(document.getElementById("checkAll"+index).checked===true){
          document.getElementById("checkAll"+index).checked = false;
        }
          
      }

      if(checkedValues[0].length>0 || checkedValues[1].length>0 ||checkedValues[2].length>0 ||checkedValues[3].length>0){
        console.log(checkedValues);
        console.log('check');
        for(var k = 0; k<rows.length; k++){

          
          var row = rows[k];
          var bool = false;
          var bool1 = false;
          var bool2=false;
          var bool3=false;
          if (checkedValues[0].length===0 || checkedValues[0].includes(row.cells[0].textContent.trim())){
            bool = true
          }
          if (checkedValues[1].length===0 || checkedValues[1].includes(row.cells[1].textContent.trim())){
            bool1 = true
          }
          if (checkedValues[2].length===0 || checkedValues[2].includes(row.cells[2].textContent.trim())){
            bool2 = true
          }
          if (checkedValues[3].length===0 || checkedValues[3].includes(row.cells[3].textContent.trim())){
            bool3 = true
          }
          

            if ((bool && bool1 && bool2&&bool3) || k===0) {
             
                row.style.visibility  = "visible";
                row.style.display="table-row";
              
           }
           else{
           
              row.style.visibility  = "hidden";
              row.style.display = "none";
           }
          
          }
      
    }
      else{
        
          rows.forEach(function(row) { 
       
           row.style.visibility  = "visible";
           row.style.display="table-row";
        
    });
      }
    
      
  });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(value));
    label.style.display="block";
    allLabel.push(label);
    dropdown1.appendChild(label);
    
});

    document.getElementById("checkAll"+index).addEventListener("change", function(event) {     
      // Call a function when the checkbox is checked
      if (event.target.checked) {
        allcheckBox.forEach(function(box){

          box.checked =true;
          checkedValues[index].push(box.value);
          var changeEvent = new Event("change");
          box.dispatchEvent(changeEvent);
    
        });
      }
  });

  document.getElementById("uncheckAll"+index).addEventListener("change", function(event) {
      
    // Call a function when the checkbox is checked
    if (event.target.checked) {
      allcheckBox.forEach(function(box){

        box.checked =false;
        if(checkedValues[index].includes(box.value)){
          var num1= checkedValues[index].indexOf(box.value);
          if(checkedValues[index].length==1){
            
            
          }
          else{
            checkedValues[index].splice(num1, 1);
         
          }
          
        }
        var changeEvent = new Event("change");
        box.dispatchEvent(changeEvent);
  
      });
    } 
    
});

document.getElementById("search"+index).addEventListener("keyup", function(event) {
  
  const filter = event.target.value.toUpperCase();

  for(var m = 0; m < allcheckBox.length; m++){

    var box = allcheckBox[m];
    if(box.value.toUpperCase().substring(0,filter.length)===filter){
      allLabel[m].style.display="block";
      
    }

    else{
      allLabel[m].style.display="none";
     
    }

  };

  // for (let i = 1; i < checkboxTag.length; i++) {
  //   txtValue = checkboxTag[i].value || checkboxTag[i].innerText;
  //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
      
  //     checkboxTag[i].style.display = "input";
  //   } else {
      
  //     checkboxTag[i].style.display = "none";
  //   }
  // }

});

dropdown1.classList.toggle("show");
 
}



 
