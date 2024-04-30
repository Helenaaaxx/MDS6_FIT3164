document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const clearButton = document.getElementById('clearButton');
  const submitButton = document.getElementById('submitButton');
  const dropBox = document.getElementById('fileUploadSection');
  const output = document.getElementById('resultsPreview');

  dropBox.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', handleFiles);

  dropBox.addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  dropBox.addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    fileInput.files = files;
    handleFiles();
  });

  clearButton.addEventListener('click', () => {
    fileInput.value = '';
    output.innerHTML = '';
  });

  submitButton.addEventListener('click', () => {
    if (fileInput.files.length) {
      output.innerHTML = '<p>Processing files...</p>';
      // Implement the file processing and prediction logic here
    } else {
      alert('Please select a file to submit.');
    }
  });

  function handleFiles() {
    const files = fileInput.files;
    // Implement file handling logic here
  }
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




  (function(){
    var DELIMETER =',';
    var NEWLINE='\n';
    var filePath ="preprocessed_datasets/Drug_Breast_Cancer_Dataset.csv";
    var filename = filePath.split('/').pop();
    var file = new File([filename], filePath, { type: "csv" });
    var i = document.getElementById("file");
    var table = document.getElementById('table-container');
  
    if(!i){
      return;
    }

    i.addEventListener("change", function (){
      if(!!i.files && i.files.length >0){
        parseCSV(i.files[0]);

      }
    });

    function parseCSV(file){
      if(!file || !FileReader){
        return;
      }

      var reader = new FileReader();

      reader.onload =  function(e){

        toTable(e.target.result);
      }

      reader.readAsText(file);

    }

    function toTable(text){

      if(!text || ! table){
        return;
      }

      while(!!table.lastElementChild){
        table.removeChild(table.lastElementChild);
      }

      var rows = text.split(NEWLINE);
      var headers =  rows.shift().trim().split(DELIMETER);

      var htr = document.createElement('tr');
      headers.forEach(function (h) {
        
          var th = document.createElement('th');
          var ht = h.trim();
        

        if(!ht){
          return;
        }

        th.textContent = ht;
        htr.appendChild(th);
        
      });

      table.appendChild(htr);

      var rtr;

      rows.forEach(function (r){

        r= r.trim();

        if(!r){
          return;
        }

        var cols = r.split(DELIMETER);

        if(cols.length ===0){
          return;
        }

        rtr = document.createElement('tr');

        cols.forEach(function (c){
          var td = document.createElement('td');
          var tc = c.trim();

          td.textContent = tc;
          rtr.appendChild(td);

        });
        table.appendChild(rtr);
      });

    }
    
  })();



  

