class VectorND extends p5.Vector{
  constructor(matrix){
    super(matrix.elements[0],matrix.elements[1],matrix.elements[2]);
    this.count = matrix.elements.length;
    if(this.count>3){
      for(let i =3;i<this.count;i++){
        this[extraDims[i]] = matrix.elements[i][0];
      }
    }
  }
}

let extraDims = ["x","y","z","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"];
