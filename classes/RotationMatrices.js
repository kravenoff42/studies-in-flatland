let rotationX,rotationY,rotationZ,rotationW;
class Rotation extends Matrix{
  constructor(axis1,axis2){
    super(currentDim,currentDim)
    let a1 = dimensionList.indexOf(axis1.toLowerCase());
    let a2 = dimensionList.indexOf(axis2.toLowerCase());
    for(let i=0;i<currentDim;i++){
      let row = [];
      for(let j=0;j<currentDim;j++){
        if(i==a1 && j==a2) row.push(-sin(angle));
        else if(i==a2 && j==a1) row.push(sin(angle));
        else if(i==j && (j==a1 || j==a2)) row.push(cos(angle));
        else if(i==j) row.push(1);
        else row.push(0);
      }
      this.elements.push(row);
    }
    // console.table(this.elements);
  }
}
function initRotationND(){
  let n = currentDim;
  let r = 2;
  let combos = factorialize(n)/(2*factorialize(n-2));
  for(let i=0;i<combos;i++){
    for(let j=0;j<combos;j++){

    }
  }
}
function initRotation4D(){
rotationXY = new Matrix(4, 4);
rotationY = new Matrix(4, 4);
rotationZ = new Matrix(4, 4);
rotationW = new Matrix(4, 4);

rotationXY.elements = [
  [cos(aZ), -sin(aZ),0,0],
  [sin(aZ),  cos(aZ),0,0]
  [      0,        0,1,0],
  [      0,        0,0,1]
];
rotationXZ.elements = [
  [cos(aY), 0, -sin(aY),0],
  [      0, 1,        0,0],
  [sin(aY), 0,  cos(aY),0]
  [      0, 0,        0,1],
];
rotationXW.elements = [
  [cos(aZ), 0,0, -sin(aZ)],
  [      0, 1,0,        0],
  [      0, 0,1,        0],
  [sin(aZ), 0,0,  cos(aZ)]
];
rotationYZ.elements = [
  [1,       0,        0, 0],
  [0, cos(aZ), -sin(aZ), 0],
  [0, sin(aZ),  cos(aZ), 0]
  [0,       0,        0, 1]
];
rotationYW.elements = [
  [1,      0, 0,        0],
  [0,cos(aX), 0, -sin(aX)],
  [0,      0, 1,        0],
  [0,sin(aX), 0,  cos(aX)]
];
rotationZW.elements = [
  [1,0,      0,       0],
  [0,1,      0,       0],
  [0,0,cos(aX),-sin(aX)],
  [0,0,sin(aX), cos(aX)]
];}
function initRotation3D(){
rotationX = new Matrix(3, 3);
rotationY = new Matrix(3, 3);
rotationZ = new Matrix(3, 3);

rotationX.elements = [
  [1,      0,        0],
  [0,cos(aX), -sin(aX)],
  [0,sin(aX),  cos(aX)]
];
rotationY.elements = [
  [cos(aY), 0, -sin(aY)],
  [         0, 1,     0],
  [sin(aY), 0,  cos(aY)]
];
rotationZ.elements = [
  [cos(aZ), -sin(aZ),0],
  [sin(aZ),  cos(aZ),0],
  [      0,        0,1]
];
}
function initRotation2D(){
rotationX = new Matrix(2, 3);
rotationY = new Matrix(2, 3);

rotationX.elements = [
  [cos(aX), -sin(aX),0],
  [sin(aX),  cos(aX),0]
];
rotationY.elements = [
  [cos(aY), -sin(aY),0],
  [sin(aY),  cos(aY),0],
];
}
