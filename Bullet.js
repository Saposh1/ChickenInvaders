export default class Bullet{
    constructor(canvas,xVelocity,x,y,velocity,bulletImage){
        this.canvas=canvas;
        this.x=x;
        this.y=y;
        this.velocity=velocity;
        this.image=new Image();
        this.image.src=bulletImage;
        this.xVelocity=xVelocity;
        this.width=5;
        this.height=20;
    }

    draw(ctx){
        this.y-=this.velocity;
        this.x-=this.xVelocity;
        ctx.drawImage(this.image,this.x,this.y,"25","25");
    }

    collideWith(sprite){
        if(this.x+this.width > sprite.x &&
           this.x < sprite.x +sprite.width &&
           this.y + this.height > sprite.y && 
           this.y < sprite.y+sprite.height){
            return true;
        }
        else{
            return false;
        }

    }
}