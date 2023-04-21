import Bullet from "./Bullet.js";
export default class BulletController{
    bullets=[];
    timeNextBullet=0;

    constructor(canvas,maxBullets,bulletImage,sound){
        this.canvas=canvas;
        this.maxBullets=maxBullets;
        this.bulletImage=new Image();
        this.bulletImage.src=bulletImage;
        this.sound=sound;

        this.shootSound=new Audio("media/sounds/sounds_shoot.wav");
        this.shootSound.volume=0.2;
    }

    draw(ctx){
        this.bullets=this.bullets.filter(bullet=>bullet.y+bullet.width>0 && bullet.y <= this.canvas.height);
        this.bullets.forEach(bullet=>bullet.draw(ctx));
        if(this.timeNextBullet > 0){
            this.timeNextBullet--;
        }

    }

    collideWith(sprite){
        const bulletThatHit=this.bullets.findIndex(bullet=>bullet.collideWith(sprite)
        );
        if(bulletThatHit>=0){
            this.bullets.splice(bulletThatHit,1);
            return true;
        }
        return false;
        }
    
    shoot(x,y,velocity,timeNextBullet=0){
        if(this.timeNextBullet<=0 && this.bullets.length< this.maxBullets){
            var case1=Math.floor(Math.random() * 3);
            var xVelocity=0;
            switch(case1){
                case 0:
                    xVelocity-=velocity;
                    break;
                case 1:
                    xVelocity+=velocity;
                    break;
                case 2:
                    break;
            }
            const bullet = new Bullet(this.canvas,xVelocity,x,y,velocity,this.bulletImage.src);
            this.bullets.push(bullet);
            if(this.sound){
                this.shootSound.currentTime=0;
                this.shootSound.play();
            }
            this.timeNextBullet=timeNextBullet;
        }
    }
}