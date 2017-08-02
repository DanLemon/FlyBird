/**
 * Created by Administrator on 2017/7/25.
 */
(function(Game){
  function Land(option){
    this.ctx = option.ctx;
    this.index = option.index;
    this.img = option.img;
    this.x = this.index*this.img.width;
    this.y = this.ctx.canvas.height - this.img.height;
    this.width = this.img.width;
    this.height = this.img.height;
    this.offset = 0;
  }

  Land.prototype = {
    constrctor:Land,
    draw:function(Dvalue){
      this.offset -= 20;
      if(this.offset<=-this.width){
        this.offset =0;
      }
      var x = this.x + this.offset;
      this.ctx.drawImage(this.img,0,0,this.width,this.height,x,this.y,this.width,this.height);
    }
  }
  Game.Land = Land;
})(Game)