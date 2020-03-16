class Color
{
  constructor(h, s, l)
  {
    this.h = h; // 0 - 360
    this.s = s; // 0 - 100
    this.l = l; // 0 - 100
  }
  
  getColor()
  {  
    return 'hsl('+ this.h +','+this.s+'%,'+this.l+'%)';
  }
}

// colors A and B mix by percentage t
function MixColor(A, B, t) 
{
  return new Color(A.h * (1-t) + B.h * t, A.s * (1-t) + B.s * t, A.l * (1-t) + B.l * t);
}

function RandomColorBetween(A, B)
{
  return new Color(Math.random() * (B.h-A.h) + A.h, Math.random() * (B.s-A.s) + A.s, Math.random() * (B.l-A.l) + A.l);
}