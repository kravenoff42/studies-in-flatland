class TableHelper{
  constructor(input, includeHeader){
    // Valid Types: Numbers, String, Object, p5.Table, p5.TableRow
    this.rows;
    this.cols;
    this.table = new p5.Table();
    this.rLabels = [];
    this.cLabels = [];

    switch(true){

    case (isString(input)):
      this.fromString(input);
      break;
    case (isNumber(input)):
      this.fromNumber(input)
      break;
    case (isTableRow(input)):
      this.fromTableRow(input);
      break;
    case (isTable(input)):
      this.fromTable(input);
      break;
    case (isCommaList(input)):
      this.fromCommaList(input,includeHeader);
      break;
    case (isArray(input)):
      this.fromArray(input,includeHeader);
      break;
    case (isObject(input)):
      this.fromObject(input);
      break;
   }
  }

  fromArray(array, includeHeader){
    let rows = array.length;
    let cols = getLongestArray(array);
    // console.log("Rows: ",rows);
    // console.log("Columns: ",cols);
    for (let r = 0; r < rows; r++){
      let row;
      if(includeHeader && r>0) row = this.table.addRow();
      // else row = this.table.addRow();
      for (let c = 0; c < cols; c++){
          if(r==0) {
            if(includeHeader) this.table.addColumn(array[r][c].toString());
            else this.table.addColumn(c.toString());
          }else{
            if(includeHeader) row.setString(array[0][c],array[r][c]);
            else row.setString(c.toString(),array[r][c]);
          }
      }
    }
  }
  fromTableRow(tableRow){}
  fromTable(table){}
  fromObject(obj){}
  fromNumber(num){}
  fromString(str){}
  fromCommaList(list){}
  labelRows(){

  }
  labelColumns(){

  }
  fromObject(){

  }

  update(){

  }
  render(parentDiv){
    let htmlTable = createElement("table");
    let header = this.table.columns;
    if (header[0] !== '0') {
      let rowHead = createElement("tr");
      for (let k = 0; k < header.length; k++) {
        let cellHead = createElement("th",header[k]);
        cellHead.parent(rowHead);
      }
      rowHead.parent(htmlTable);
    }

console.log(this.table);
    // make rows
    for (let r = 0; r < this.table.getRowCount(); r++) {
      let row = createElement("tr");
      for (let c = 0; c < this.table.rows[r].length; c++) {
        let content = this.table.getString(r,c.toString());
        console.log(content);
        let cell = createElement("td",content);
        cell.parent(row);
      }
      row.parent(htmlTable);
    }
    htmlTable.parent(parentDiv);
  }

  log(){
    // console.table(this.table.rows);
    // let arr = [];
    // for (var r = 0; r < this.table.getRowCount(); r++){
    //   let row = [];
    //   for (var c = 0; c < this.table.getColumnCount(); c++){
    //     row.push(this.table.getString(r, c));
    //   }
    //   arr.push(row);
    // }
    let obj = {};
    for (let r = 0; r < this.table.getRowCount(); r++){
      for (let c = 0; c < this.table.rows[r].length; c++){
        if(c<=0) obj[this.table.getString(r, 0)] = {};
        else{
          obj[this.table.getString(r, 0)][this.table.columns[c]] = this.table.getString(r, c);
        // obj[this.table.columns[c]] = {};
      }

        // obj[this.table.columns[c]][r] = this.table.getString(r, c);
      }
    }
    console.table(obj);
    // console.table(arr);
  }
}


function getBiggest(array){
  let len = array.length;
  if(len==0) return null;
  let biggest = array[0];
  for(let i = 0;i<len;i++){
    if(biggest.isNaN) return null;
    if(array[i]>biggest) biggest = array[i];
  }
  return biggest;
}

function isArray(variable){
  return Array.isArray(variable);
}
function isNumber(variable){
  return (variable.constructor === Number);
}
function isString(variable){
  // if(!variable.hasOwnProperty("constructor")) return false;
  return (variable.constructor === String);
}
function isCommaList(variable){
  if(!isString(variable)) return false;
  let arr = variable.split(',');
  return (arr.length>1);
}
function isObject(variable){
  return (variable instanceof Object);
}
function isTable(variable){
  return (variable.constructor === p5.Table);
}
function isTableRow(variable){
  return (variable.constructor === p5.TableRow);
}

function getLongestArray(array){
  let len = array.length;
  if(len==0) return null;
  if(!isArray(array[0])) return null;
  let biggest = array[0].length;
  for(let i = 0;i<len;i++){
    if(!isArray(array[i])) return null;
    if(array[i].length>biggest) biggest = array[i].length;
  }
  return biggest;
}
