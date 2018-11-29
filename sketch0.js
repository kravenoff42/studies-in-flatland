var divCanvas;
var canvas;
var divInput;

window.onload=function(){
  updateBtn = document.querySelector('#updateBtn');
  updateTxt = document.querySelector('#updateTxt');
  divCanvas = document.querySelector('#canvas');
  divInput = document.querySelector('#input');
  updateBtn.addEventListener('click', updateSelection, false);
  main();

}

function border(r,p){
  p.beginShape();
  for(let i = 0;i<8;i++){
    let angle = p.PI/8 + p.map(i, 0, 8, 0, p.TWO_PI);
    if(i%2==0){angle+=p.PI/16}
    else{angle-=p.PI/16}
    let x = r * p.cos(angle);
    let y = r * p.sin(angle);
    p.vertex(x,y);
  }
  p.endShape(p.CLOSE);
}

function printPicture(){
  window.print();
  return false;
}

function updateSelection(){
  pagesNum = updateTxt.value;
  main();
}

function main(){
  divCanvas.innerHTML = '';
  for(let canNum = 0, len = pagesNum;canNum<len;canNum++){
      let div = document.createElement('div');
      div.id = 'canv'+canNum;
      divCanvas.appendChild(div);
      let ctx = function( p ) { // p could be any variable name
      p.setup = function() {
      	canvas = p.createCanvas(880, 880);
        canvas.parent(divCanvas);
        p.noLoop();
        p.translate(p.width/2,p.height/2);
        p.rotate(p.PI/2);
        p.background(255);
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
          border(p.width*0.6,p);
          let r = p.floor(p.random(4,10));
          let layers =[];
          for(let j = 0;j<r;j++){
            layers.push(new Layer(p));
          }
          let large = false;
          let medium = false;
          for(let j = 0, len = layers.length;j<len;j++){
            layers[j].show(p);
            if(layers[j].isLarge(p)){
              large = true;
            }
            if(layers[j].isMedium(p)){
              medium = true;
            }
          }
          if(!large){
            border(p.width*0.5,p);
          }
          if(!medium){
            border(p.width*0.4,p);
          }
      };
    };
    let nodeID = 'canv'+canNum;
    let myp5 = new p5(ctx,nodeID);
  }
}
