class Matrix{
  constructor(rows,cols) {
    this.rows = rows;
    this.cols = cols;
    this.elements = [];
  }
  fillElements(){
    for(let i = 0; i<this.rows;i++){
      let row = [];
      for(let j = 0; j<this.cols;j++){
        row.push(0);
      }
      this.elements.push(row);
    }
  }
  elemAdd(n){
    if(n instanceof Matrix){
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          this.elements[i][j] += n.elements[i][j];
        }
      }
    }
    else {
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          this.elements[i][j] += n;
        }
      }
    }
  }
  elemMultiply(n){
    if(n instanceof Matrix){
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          this.elements[i][j] *= n.elements[i][j];
        }
      }
    }
    else {
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          this.elements[i][j] *= n;
        }
      }
    }
  }
  randomize(_min,_max){
    let min = _min || 0;
    let max = _max || 100;
    for(let i = 0; i<this.rows; i++){
      for(let j = 0; j<this.cols; j++){
        this.elements[i][j] = floor(random(min,max));
      }
    }
  }

}

function transpose(m){
  let result = new Matrix(m.cols,m.rows);
  result.fillElements();
  for(let i = 0; i<result.rows; i++){
    for(let j = 0; j<result.cols; j++){
      result.elements[i][j] = m.elements[j][i];
    }
  }
}

function matrixMultiply(matrixA, matrixB){
  if (matrixB instanceof p5.Vector){
    matrixB = vectToMatrix(matrixB);
  }
  let colsA = matrixA.cols;
  let rowsA = matrixA.rows;
  let colsB = matrixB.cols;
  let rowsB = matrixB.rows;

  if(colsA != rowsB){
    console.log("Matrix A Cols must equal Matrix B Rows.");
    console.log("Matrix A - cols = "+colsA);
    console.log("Matrix B - rows = "+rowsB);
    return null;
  }
  let result = new Matrix(rowsA,colsB);
  result.fillElements();

  for(let i = 0; i<result.rows; i++){
    for(let j = 0; j<result.cols; j++){
      let sum = 0;
      for(let k = 0 ; k<colsA;k++){
        sum += matrixA.elements[i][k] * matrixB.elements[k][j];
        result.elements[i][j] = sum;
      }
    }
  }
  return result;
}

function vectToMatrix(vector){
  let m = new Matrix(3,1);
  m.fillElements();
  m.elements[0][0] = vector.x;
  m.elements[1][0] = vector.y;
  m.elements[2][0] = vector.z;
  if(vector.count>3){
    for(let i =3;i<vector.count;i++){
      m.elements[i][0] = vector[extraDims[i]];
    }
  }
  return m;
}

function matrixToVect(matrix){
  let v = new p5.Vector(matrix.elements[0][0], matrix.elements[1][0]);
  if(matrix.rows>2){
    v.z = matrix.elements[2][0];
  }
  if(matrix.rows>3){
    v.w = matrix.elements[3][0];
  }
  return v;
}

function factorialize(n){
  let f = 1;
  for(let i = 1;i<=n;i++){
    f *= i;
  }
  return f;
}
