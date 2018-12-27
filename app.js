//Taking Rows and columns from user

//Creating First Input

var inputDiv = document.createElement("div");
inputDiv.className = "inputDiv";
var label1 = document.createElement("label");
label1.name = "enterRows";
label1.id = "enterRows";
label1.textContent = "Enter Rows: ";
var rows = document.createElement("input");
rows.name = "rows";
rows.placeholder = "Enter Number Of Rows";
rows.id = "rows";

//Creating Second Input
var label2 = document.createElement("label");
label2.name = "enterColumns";
label2.id = "enterColumns";
label2.textContent = "Enter Columns: ";
var columns = document.createElement("input");
columns.name = "columns";
columns.placeholder = "Enter Number Of columns";
columns.id = "columns";

//--------------------Creating Buttons-------------------------------
var loadGrid = document.createElement("button");
var newColumn = document.createElement("button");
var newRow = document.createElement("button");

//loadGrid button
loadGrid.name = "loadGrid";
loadGrid.id = "loadGrid";
loadGrid.addEventListener("click", load);
loadGrid.textContent = "Load Grid";
//---------------------------------
//newRow button
newRow.name = "newRow";
newRow.id = "newRow";
newRow.textContent = "Add New Row";
newRow.addEventListener("click", addNewRow);
//---------------------------------------------------
//newColumn button
newColumn.name = "newColumn";
newColumn.id = "newColumn";
newColumn.textContent = "Add New Column";
newColumn.addEventListener("click", addNewColumn);
var lineBreak = document.createElement("br");
var lineBreak2 = document.createElement("br");
//-------------------------------------------

//Appending nodes
inputDiv.appendChild(label1);
inputDiv.appendChild(rows);
inputDiv.appendChild(lineBreak);
inputDiv.appendChild(lineBreak2);
inputDiv.appendChild(label2);
inputDiv.appendChild(columns);
inputDiv.appendChild(loadGrid);
inputDiv.appendChild(newColumn);
inputDiv.appendChild(newRow);
document.body.appendChild(inputDiv);
console.log(inputDiv);

//Load Grid Function
function load() {
  var rows = document.getElementById("rows").value;
  var columns = document.getElementById("columns").value;
  var tableDiv = document.createElement("div");
  tableDiv.setAttribute("id", "tableDiv");
  var table = document.createElement("table");
  table.setAttribute("id", "tableGrid");
  table.setAttribute("border", "1");

  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < columns; j++) {
      var td = document.createElement("td");
      td.setAttribute("width", "100");
      var span = document.createElement("span");
      if (columns - 1 == j && rows - 1 == i) {
        span.addEventListener("keydown", function(event) {
          createNewRow(event);
        });
      }

      var tdtext = document.createTextNode(i + "," + j);
      span.setAttribute("contenteditable", true);
      span.setAttribute("width", "95");
      span.setAttribute("id", i + "," + j);
      span.appendChild(tdtext);
      td.appendChild(span);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  tableDiv.appendChild(table);
  document.body.appendChild(tableDiv);
}

//Creating New Row After pressing tab on last column
function createNewRow(e) {
  var obj = e.target;
  obj.removeEventListener("keydown", createNewRow);
  var columns = document.getElementById("columns").value;

  var tableRow = document.createElement("tr");
  obj.parentNode.parentNode.parentNode.appendChild(tableRow);
  for (var i = 0; i < columns; i++) {
    var td = document.createElement("td");
    var span = document.createElement("span");
    span.setAttribute("contentEditable", "true");
    if (columns - 1 == i) {
      span.addEventListener("keydown", createNewRow);
    }

    span.textContent = "new" + i;

    td.appendChild(span);
    tableRow.appendChild(td);
  }

  obj.parentNode.parentNode.parentNode.appendChild(tableRow);
}

function addNewRow() {
  var table = document.getElementById("tableGrid");
  var newTr = document.createElement("tr");
  var count = cellCount();
  console.log(count);
  for (var i = 0; i < count; i++) {
    var td = document.createElement("td");
    var span = document.createElement("span");
    span.setAttribute("contenteditable", true);
    var tdText = document.createTextNode("new row");
    span.appendChild(tdText);
    td.appendChild(span);
    newTr.appendChild(td);
  }

  table.appendChild(newTr);
  document.body.appendChild(table);
}

function addNewColumn() {
  var newColumn = createTdElement();

  console.log(newColumn);
  var allRows = document.getElementsByTagName("tr");
  //   console.log(allRows);
  for (var i = 0; i < allRows.length; i++) {
    var newTd = createTdElement();
    allRows[i].appendChild(newTd);
  }
}

function cellCount() {
  var totalRows = document.getElementsByTagName("tr").length;
  var totalTd = document.getElementsByTagName("td").length;
  var cellCount = totalTd / totalRows;
  return cellCount;
}

function createTdElement() {
  var td = document.createElement("td");
  var span = document.createElement("span");
  span.setAttribute("contentEditable", true);
  td.setAttribute("width", "100");
  td.setAttribute("id", "table1");
  var innerTxt = document.createTextNode("new Column");
  span.appendChild(innerTxt);
  td.appendChild(span);
  return td;
}

function checkLastCell() {
  var lastCell = document.getElementsByTagName("td");
  var rowsLength = document.getElementsByTagName("tr").length;
  var columns = cellCount();
  console.log("Total Rows-" + rowsLength + " and columns= " + columns);

  for (var i = 0; i < rowsLength; i++) {
    for (var j = 0; j < columns; j++) {
      if (rowsLength - 1 == i && columns - 1 == j) {
        var lastCell = lastCell[lastCell.length - 1];
        // lastCell.children[0].setAttribute("style", "color:red;");
        lastCell.children[0].addEventListener("keydown", function(event) {
          createNewRow(event);
        });
      }
    }
  }
}

/* 
functions to implement



*/
