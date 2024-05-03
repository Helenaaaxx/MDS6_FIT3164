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

  // // clearButton.addEventListener('click', () => {
  // //   fileInput.value = '';
  // //   output.innerHTML = '';
  // // });

  // submitButton.addEventListener('click', () => {
  //   if (fileInput.files.length) {
  //     output.innerHTML = '<p>Processing files...</p>';
  //     // Implement the file processing and prediction logic here
  //   } else {
  //     alert('Please select a file to submit.');
  //   }
  // });

  // function handleFiles() {
  //   const files = fileInput.files;
  //   // Implement file handling logic here
  // }



});
// Continue from the existing script.js content
// Add any specific logic for buttons and file handling
// The detailed implementation will depend on your application's backend and logic

document.getElementById('makePredictionButton').addEventListener('click', function() {
  // Trigger the prediction process
  // Fetch the input value
  var cancerType = document.getElementById('cancerTypeInput').value;
  // Use cancerType to make a prediction, likely involving an API call or another form of data processing
  // Then update the prediction results and accuracy
});




(function() {
  var DELIMITER = ',';
  var NEWLINE = '\n';
  var filePath = "Drug_Breast_Cancer_Data.csv";
  var table = document.getElementById('drug-table');

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
            if (index === headers.length - 1) {
            
              tableHTML += '<th>' + trimmedHeader + '<button id="sortBtn" onclick="queue()"> <i class="fa fa-sort"></i></button></th>';
          } else {
              tableHTML += '<th>' + trimmedHeader + '</th>';
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
      table.innerHTML = '<table>' + tableHTML + '</table>';
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

  
  var index = 4; 

  
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



  

