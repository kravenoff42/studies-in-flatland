class Projection extends Matrix{
  constructor(dimensions,ortho){
    super(dimensions-1,dimensions);
    this.currentDim = dimensions;
    this.targetDim = dimensions-1;
    // this.elements = [
    //   [1,0,0],
    //   [0,1,0]
    // ];
    let row;
    if(ortho){
      for(let i = 0; i<this.targetDim; i++){
        row = [];
        for(let j = 0; j<this.currentDim; j++){
            if(i==j) row.push(1);
            else row.push(0);
        }
        this.elements.push(row);
      }
    }
  }

  calcPerspective(extraDim){
    for(let i = 0; i<this.targetDim; i++){
      let row = [];
      for(let j = 0; j<this.currentDim; j++){
          if(i==j){
            let ratio = sqrt(2) / (distance - extraDim);
            row.push(ratio);
          }else{
            row.push(0);
          }
      }
      this.elements.push(row);
    }
  }
}
