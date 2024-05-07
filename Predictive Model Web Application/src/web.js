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

function manualtButton(){
  var fileUploadSec = document.getElementById("fileUploadSection");
  var predictionSec = document.getElementById('predictionSection');
  var visualLabel= document.getElementById("predictionOutputLabel");
  var predictionLabel = document.getElementById('predictionLabel');
  fileUploadSec.innerHTML = '<div class="drop-area">'+'<p class="file-upload-instructions">'+'<img src="/Predictive Model Web Application/src/static/images/upload-logo.png" alt="logo" style="float:left;width:25px;height:25px;padding-right: 5px;">'+
  'Drop and Upload Dataset in CSV file for Prediction</p>'+'<input type="file" id="fileInput" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" multiple hidden>'+
  '<button class="drop-box" onclick="document.getElementById("fileInput").click();">Browse File</button>'+'<p id="uploadedFileName"></p>'+'</div>';
  predictionSec.innerHTML= ' <div id="predictionDiv">'+' <button id="makePredictionButton">Make Prediction</button>'+'</div>';

  predictionLabel.textContent="Prediction result";
  visualLabel.textContent = "Prediction output Visualisation";
}

var uniqueValues1 = new Set();

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

      tableHTML += '</tbody>';
      table.innerHTML = '<table id="drug-table">' + tableHTML + '</table>';
      var arr1 = Array.from(uniqueValues1);
      var jsonData = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "height": 1400,
        "width": 2200,
        "background": "white",
        "data": {
          "url": "https://raw.githubusercontent.com/Helenaaaxx/MDS6_FIT3164/main/Predictive%20Model%20Web%20Application/src/uploads/Drug_Breast_Cancer_Data.csv"
        },
        "mark": {"type": "bar", "cursor": "pointer"},
        "transform": [
          {"filter": "datum.COSMIC_ID == COSMIC_ID"}
        ],
        "encoding": {
          "x": {
            "field": "LN_IC50",
            "type": "quantitative",
            "title": "LN_IC50",
            "axis": {
              "titleFontSize": 18, 
              "labelFontSize": 14}
          },
          "y": {
            "field": "DRUG_NAME",
            "type": "nominal",
            "title": "Drug Name",
            "sort": "-x",
            "axis": {"titleFontSize": 18, "labelFontSize": 13}
          },
          "tooltip": [
            {"field": "DRUG_NAME", "type": "nominal"},
            {"field": "DRUG_ID", "type": "nominal"},
            {"field": "CCLE_Name", "type": "nominal"},
            {"field": "COSMIC_ID", "type": "nominal"},
            {"field": "LN_IC50", "type": "quantitative", "format": ".2f"}
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
      }).catch(console.error);
      
  }
})();


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


  var checkedValues =  new Set();
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
        checkedValues.add(event.target.value);
        if(document.getElementById("uncheckAll"+index).checked===true){
          document.getElementById("uncheckAll"+index).checked = false;
        }
      } else {
        checkedValues.delete(event.target.value);
        if(document.getElementById("checkAll"+index).checked===true){
          document.getElementById("checkAll"+index).checked = false;
        }
          
      }

      if(checkedValues.size>0){
        for(var k = 0; k<rows.length; k++){

          var row = rows[k];
          if (checkedValues.has(row.cells[index].textContent.trim()) || k===0) {
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
          checkedValues.add(box.value);
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
        if(checkedValues.has(box.value)){
          checkedValues.delete(box.value);
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



 
