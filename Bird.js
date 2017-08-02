/**
 * Created by Administrator on 2017/7/25.
 */
(function(Game){
  function Bird(option){
    this.ctx = option.ctx;
    this.x = option.x ||100;
    this.y = option.y ||100;
    this.img = option.img;
    this.width = this.img.width/3;
    this.height = this.img.height;

    this.a = 0.0005;
    this.speed = 0;
    this.maxSpeed = 0.5;
    this.maxAngle = 45;
    this.angle = 0;
    this.index = 0;
  }

  Bird.prototype = {
    constructor:Bird,
    draw:function(Dvalue){
      this.speed = this.speed+this.a*Dvalue;
      this.y = this.y+this.speed*Dvalue+1/2*this.a*Dvalue*Dvalue;
      if(this.speed>this.maxSpeed){
        this.speed = this.maxSpeed;
      }
      var angle = this.speed/this.maxSpeed*this.maxAngle;
      this.ctx.save();
      this.ctx.translate(this.x,this.y);
      this.ctx.rotate(angle*Math.PI/180);
      this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
      this.ctx.restore();
      this.index++;
      this.index%=3;
    }

  }
  Game.Bird = Bird;
})(Game)