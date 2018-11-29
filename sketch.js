let divCanvas;
let canvas;
let divInput;
let btnMinusDim, spanCurrentDim, btnPlusDim;
let btnMinusSides, spanCurrentSides, btnPlusSides;
let currentDim, currentSides;
let tableMatrix;
let slideX,slideY,slideZ;

let projection_g;
let distance;
let unit;
let a,aX,aY,aZ;

let angle;
let angles = [];
let points = [];

const shapeList = ["point","line","plane","volume","hypevolume","5-volume","6-volume","7-volume","8-volume","9-volume","10-volume","11-volume","12-volume"];
const dimensionLabelList = ["X","Y","Z","W","V","U","T","S","R","Q","P","O","N","M","L","K","J","I","H","G","F","E","D","C","B","A"];
const dimensionList = ["x","y","z","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"];

function setup(){
  divCanvas = select('#canvas');
  divInput = select('#input');
  tableMatrix = select('#tableMatrix');


  canvas = createCanvas(500, 500);
  canvas.parent(divCanvas);
  slideX = createSlider(0,TWO_PI,PI,0.01);
  slideY = createSlider(0,TWO_PI,PI,0.01);
  slideZ = createSlider(0,TWO_PI,PI,0.01);

  angle = PI;
  aX = aY = aZ = 0;
  // aX = QUARTER_PI;
  // aY = QUARTER_PI;
  // aZ = QUARTER_PI;
  currentDim = 4;
  distance = 2.75;
  currentSides = 0;
  unit = 300;

    let test = [
    ["axis","X","Y","Z"],
    ["X",1,0,0],
    ["Y",0,1,0]
  ];
  // let th = new TableHelper(test);
  // th.log();
  // th.render(divInput);

  updateHTML();
  populateMatrixTable();
  populatePoints(currentDim);
}

function draw(){
  background(0);

  // initRotation3D();

  // renderPlanes();
  renderLines();
  renderPoints();
  // aX += 0.01;
  // aY += 0.01;
  // aZ += 0.01;
  angle = (angle + 0.01)% TWO_PI;
  // aX = slideX.value();
  // aY = slideY.value();
  // aZ = slideZ.value();
}

function calcStereo(zed){
  let z = sqrt(2) / (distance - zed);
  let m = new Matrix(2,3);
  m.elements = [
    [z,0,0],
    [0,z,0]
  ];
  return m;
}

function updateHTML(){
  let header = createElement("h3","Parameters");
  header.parent(divInput);
  let lblDim = createElement("label","Dimensions:");
  lblDim.parent(divInput);
  let numDim = createInput(currentDim.toString(),"number");
  numDim.parent(divInput);
  let lblSides = createElement("label","Sides:");
  lblSides.parent(divInput);
  let numSides = createInput(currentSides.toString(),"number");
  numSides.parent(divInput);
  let lblDist = createElement("label","Distance:");
  lblDist.parent(divInput);
  let numDist = createInput(distance.toString(),"number");
  numDist.parent(divInput);
  let lblZoom = createElement("label","Zoom:");
  lblZoom.parent(divInput);
  let numZoom = createInput(unit.toString(),"number");
  numZoom.parent(divInput);

  // spanCurrentDim.html(currentDim);
  // spanCurrentSides.html(currentSides)
}

function populatePoints(currentDim){
  let n = currentDim;
  for (let i = 0; i < (1 << n); i++){
    let m = new Matrix(n,1);
    m.fillElements();
    for (let j = 0; j < n; j++){
      if ((i & (1 << j)) > 0){
        m.elements[j][0] = -1;
      }else{
        m.elements[j][0] = 1;
      }
    }
    points.push(m);
  }
}

function populateMatrixTable(){

  let p = new Projection(currentDim,false);
  let target = currentDim-1;
  p.calcPerspective(target);
  let th = new TableHelper(p.elements,false);
  // th.log();
  th.render(divInput);
  //
  // for (var r = 0; r <= target; r++) {
  //   let row = createElement("tr");
  //   for (var c = 0; c <= target; c++) {
  //     let cell;
  //     if(r==0) cell = createElement("th");
  //     else cell = createElement("td");
  //
  //     if(r==0 && c==0)      cell.html("axis");
  //     else if(c>0 && r==0)  cell.html(dimensionLabelList[c-1]);
  //     else if(r>0 && c==0)  cell.html(dimensionLabelList[r-1]);
  //     else if (r==c)        cell.html("1");
  //     else                  cell.html("0");
  //
  //     cell.parent(row);
  //   }
  //   row.parent(tableMatrix);
  // }
}

function projectTo2D(p){
  let dimension = p.elements.length;
  if(dimension==2) return p;
  let projection = new Projection(dimension,false);
  let last = p.elements[dimension-1][0];
  projection.calcPerspective(last);
  let convertedPoint = matrixMultiply(projection,p);
  return projectTo2D(convertedPoint);
}

function rotatePoint(p,a,b){
  let rotation = new Rotation(a,b);
  let r = matrixMultiply(rotation, p);
  // r = matrixMultiply(rotationY, r);
  // r = matrixMultiply(rotationZ, r);
  return r;
}

function isEdge(a,b){
  let pa = matrixToVect(points[a]);
  let pb = matrixToVect(points[b]);
  // let bPoints = b.elements;
  let mod = b%8;
  return (
    a+8 == b ||
    ((a+1 == b || a+2 == b) && dist(pa.x,pa.y,pa.z,pb.x,pb.y,pb.z) == 2) ||
    (a+4 ==b && !(mod>=0 && mod<=3))
  )
}
function isPlane(){ return false;}

function minusSides(){}

function plusSides(){}

function minusDim(){}

function plusDim(){}

function renderPoints(){
  for(let i = 0, len =points.length; i<len;i++){
    let rotated = rotatePoint(points[i],"y","z");
    rotated = rotatePoint(rotated,"x","w");
    // rotated = rotatePoint(rotated,"y","v");
    let projected = projectTo2D(rotated);
    let v = matrixToVect(projected);
    push();
    translate(width/2,height/2);
    stroke(255);
    noFill();
    strokeWeight(0.5);
    // text(i,v.x*unit,v.y*unit);
    strokeWeight(5);
    point(v.x*unit,v.y*unit);
    pop();
  }
}
function renderLines(){
  for(let i = 0, len =points.length; i<len;i++){
    let pa = points[i];
    for(let j = 0; j<len;j++){
      let pb = points[j];
      if(isEdge(i,j)){
        // console.log(dist(pa.x,pa.y,pa.z,pb.x,pb.y,pb.z));
        let rotatedA = rotatePoint(pa,"y","z");
        rotatedA = rotatePoint(rotatedA,"x","w");
        // rotatedA = rotatePoint(rotatedA,"y","v");
        let projectedA = projectTo2D(rotatedA);
        let va = matrixToVect(projectedA);

        let rotatedB = rotatePoint(pb,"y","z");
        rotatedB = rotatePoint(rotatedB,"x","w");
        // rotatedB = rotatePoint(rotatedB,"y","v");
        let projectedB = projectTo2D(rotatedB)
        let vb = matrixToVect(projectedB);
        push();
        translate(width/2,height/2);
        stroke(255,128,128);
        let d = dist(va.x*unit,va.y*unit,vb.x*unit,vb.y*unit);
        let w = map(d,unit/4,width,1,7);
        strokeWeight(w);
        noFill();
        line(va.x*unit,va.y*unit,vb.x*unit,vb.y*unit);
        pop();
      }
    }
  }
}
function renderPlanes(){
  for(let i = 0, len =points.length; i<len;i++){
    let pa = points[i];
    for(let j = 0; j<len;j++){
      let pb = points[j];
      for(let k = 0; k<len;k++){
        let pc = points[k];
        for(let l = 0; l<len;l++){
          let pd = points[l];
          let diag = sqrt(4+4);
          if(isPlane()
          // dist(pc.x,pc.y,pc.z,pd.x,pd.y,pd.z)==2 &&
          // dist(pd.x,pd.y,pd.z,pa.x,pa.y,pa.z)==2
          ){
            let rotatedA = rotatePoint(pa);
            let projectedA = projectTo2D(rotatedA);
            let va = matrixToVect(projectedA);
            let rotatedB = rotatePoint(pb);
            let projectedB = projectTo2D(rotatedB);
            let vb = matrixToVect(projectedB);
            let rotatedC = rotatePoint(pc);
            let projectedC = projectTo2D(rotatedC);
            let vc = matrixToVect(projectedC);
            let rotatedD = rotatePoint(pd);
            let projectedD = projectTo2D(rotatedD);
            let vd = matrixToVect(projectedD);

            push();
            translate(width/2,height/2);
            fill(100,100,255);
            noStroke();
            quad(va.x*unit,va.y*unit,vb.x*unit,vb.y*unit,vc.x*unit,vc.y*unit,vd.x*unit,vd.y*unit);
            pop();
          }
        }
      }
    }
  }
}
