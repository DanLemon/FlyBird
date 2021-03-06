/**
 * Created by Administrator on 2017/7/25.
 */
(function(Game){
  function Pipe(option){
    this.ctx= option.ctx;
    this.x = 0;
    this.y = 0;
    this.spaceX = 200;
    this.spaceY =150;

    this.upImg = option.upImg;
    this.downImg = option.downImg;
    this.index = option.index;

    this.x = this.index*this.spaceX;

    this.up = [];
    this.down = [];
    this.getPosition();

    this.count =0;
  }
  Pipe.prototype = {
    constructor:Pipe,
    draw:function(){
      this.x -=5;
      if(this.x<-this.spaceX){
        this.x = 5*this.spaceX;

        if(this.count >6){
          this.getPosition();
        }
      }
      this.count++;

      this.ctx.drawImage(this.upImg,this.up[0],this.up[1],this.up[2],this.up[3],this.x,this.up[5],this.up[6],this.up[7]);

      this.ctx.drawImage(this.downImg,
      this.down[0],this.down[1],this.down[2],this.down[3],this.x,this.down[5],this.down[6],this.down[7]);

      this.ctx.rect(this.x,this.up[5],this.up[6],this.up[7]);
      this.ctx.rect(this.x,this.down[5],this.down[6],this.down[7]);
    },
    getPosition:function(){
      this.y =100+parseInt(Math.random()*100);
      this.up = [0,this.upImg.height-this.y,this.upImg.width,this.y,this.x,0,this.upImg.width,this.y];
      var tempY = this.ctx.canvas.height-this.y-this.spaceY;
      this.down = [0,0,this.downImg.width,tempY,this.x,this.y+this.spaceY,this.downImg.width,tempY];
    }
  }
  Game.Pipe =Pipe;
})(Game)