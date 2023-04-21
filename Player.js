export default class Player{
    rightPressed=false;
    leftPressed=false;
    upPressed=false;
    downPressed=false;
    shootPressed=false;

    constructor(canvas, velocity,bulletController){
        this.canvas=canvas;
        this.velocity=velocity;
        this.bulletController=bulletController;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height -75;
        this.width = 75;
        this.height = 75;
        this.image = new Image();
        this.key;
        this.image.src = "media/photos/spaceship1.png";
   
   document.addEventListener("keydown",this.keydown);
   document.addEventListener("keyup",this.keyup);
    }



    draw(ctx){
        if(this.shootPressed==true){
            this.bulletController.shoot(this.x+this.width/2,this.y,4,10);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    collideWithWalls(){
        if(this.x < 0){
           this.x=0; 
        }
        if(this.y < this.canvas.height-this.canvas.height*0.4){
            this.y=this.canvas.height-this.canvas.height*0.4; 
         }
        if(this.x >this.canvas.width-this.width){
            this.x = this.canvas.width-this.width;
        }
        if(this.y >this.canvas.height-this.height){
            this.y = this.canvas.height-this.height;
        }
    
    }
    move(){
        if(this.rightPressed){
            this.x+=this.velocity;
        }
        else if(this.leftPressed){
            this.x+=-this.velocity;
        }
        else if(this.upPressed){
            this.y+=-this.velocity;
        }
        else if(this.downPressed){
            this.y+=this.velocity;
        }
        if(this.rightPressed&&this.upPressed){
            this.x+=this.velocity;
            this.y-=this.velocity;
        }
        else if(this.leftPressed&&this.upPressed){
            this.x-=this.velocity;
            this.y-=this.velocity;
        }
        else if(this.downPressed&&this.rightPressed){
            this.y+=this.velocity;
            this.x+=this.velocity;
        }
        else if(this.downPressed&&this.leftPressed){
            this.y+=this.velocity;
            this.x-=this.velocity;
        }
    }

    keydown = event =>{
        if(event.code == 'ArrowRight'){
            this.rightPressed=true;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed=true;
        }
        if(event.code == 'ArrowUp'){
            this.upPressed=true;
        }
        if(event.code == 'ArrowDown'){
            this.downPressed=true;
        }
        if(event.code==this.key){
            this.shootPressed=true;
        }

    };

    keyup = event =>{
        if(event.code == 'ArrowRight'){
            this.rightPressed=false;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed=false;
        }
        if(event.code == 'ArrowUp'){
            this.upPressed=false;
        }
        if(event.code == 'ArrowDown'){
            this.downPressed=false;
        }
        if(event.code==this.key){
            this.shootPressed=false;
        }

    };
    setkey(key){
        this.key=key;
    }
}