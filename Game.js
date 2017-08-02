/**
 * Created by Administrator on 2017/7/25.
 */
(function(w){
  function Game(option){
    this.ctx = option.ctx;
    this.cs = option.cs;
    this.imgArr = ["birds","land","pipe1","pipe2","sky"];
    this.isRun = false;
    this.startTime = new Date();
    this.endTime = 0;
    this.Dvalue = 0;
    this.roles = [];
    this.hero = null;
  }
  Game.prototype = {
    constructor:Game,
    start:function(){
      var that = this;
      this.isRun = true;
      this.loadImage(function(imgList){
        that.initGame(imgList);
        that.render();
        that.control();
      })
    },
    gameover:function(){
      this.isRun = false;
    },
    loadImage:function(callback){
      var imgList = {};
      var count = 0;
      var lenght = this.imgArr.length;
      for(var i = 0; i < this.imgArr.length; i ++){
        var obj = this.imgArr[i];
        var img = new Image();
        img.src="imgs/"+obj+".png";
        imgList[obj] = img;
        img.onload=function(){
          count++;
          if(count >= lenght){
            callback&&callback(imgList);
          }
        }
      }
    },
    initGame:function(imgs){
      //天空
      for(var i = 0; i < 3; i ++){
         var sky = new Game.Sky({
           ctx:this.ctx,
           img:imgs["sky"],
           index:i
         });
        this.roles.push(sky);
      }
      //柱子
      for(var i = 0; i < 6; i ++){
         var p = new Game.Pipe({
           ctx:this.ctx,
           upImg:imgs["pipe2"],
           downImg:imgs["pipe1"],
           index:i+1
         });
        this.roles.push(p);
      }

      //小鸟
      var bird =new Game.Bird({
        ctx:this.ctx,
        img:imgs["birds"]
      });
      this.hero = bird;
      this.roles.push(bird);

      //陆地
      for(var i = 0; i < 4; i ++){
         var land = new Game.Land({
           ctx:this.ctx,
           img:imgs["land"],
           index:i
         });
      this.roles.push(land);
      }
    },
    render:function(){
      var that = this;
      setInterval(function(){
        if(that.isRun){
          that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
          that.ctx.beginPath();
          that.endTime = new Date();
          that.Dvalue = that.endTime - that.startTime;
          that.startTime =that.endTime;
          that.roles.forEach(function(v){
            v.draw(that.Dvalue);
          });
          that.check();
        }
      },50)
    },
    control:function(){
      var that =this;
      this.cs.onclick = function(){
        that.hero.speed=-0.3;
      }
    },
    check:function(){
      if(this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-120){
        this.isRun = false;
      }
    }
  }
  w.Game = Game;
})(window)