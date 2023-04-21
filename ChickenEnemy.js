import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class ChickenEnemy{

    chickenMap = [
        [3,4,1,2,5],
        [5,2,3,1,4],
        [2,1,4,5,3],
        [5,3,2,1,4],
    ];
    enemyRows=[];

    currentDirection=MovingDirection.right;
    xVelocity=0;
    yVelocity=0;
    defaultXVelocity=1;
    defaultYVelocity=1;
    fireBulletTimerD=150;
    points=0;
    fireBulletTimer=this.fireBulletTimerD;

    constructor(canvas,enemyBulletController,playerBulletController){
        this.canvas=canvas;
        this.enemyBulletController=enemyBulletController;
        this.playerBulletController=playerBulletController;
        this.enemyDeathSound = new Audio("media/sounds/sounds_enemy-death.mp3");
        this.enemyDeathSound.volume = 1;
        this.createEnemies();
    }

    draw(ctx){
        this.updateVelocityAndDirection();
        this.collision();
        this.drawChickens(ctx);
        this.fireBullet();
        ctx.font = "bold 30px calibri";
        ctx.fillStyle="red";
        ctx.fillText("Score: " + this.points, 500, 10);
        
    }

    collision(){
        var chickenpoints=25;
        this.enemyRows.forEach(enemyRow=>{chickenpoints-=5;
            enemyRow.forEach((enemy,enemyIndex)=>{
                if(this.playerBulletController.collideWith(enemy)){
                    this.enemyDeathSound.currentTime=0.3;
                    this.enemyDeathSound.play();
                    enemyRow.splice(enemyIndex,1);
                    this.points+=chickenpoints;

                }
            });
        });

        this.enemyRows=this.enemyRows.filter((enemyRow) => enemyRow.length>0);
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer<=0){
            this.fireBulletTimer=this.fireBulletTimerD;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x,enemy.y,-3);
        }
    }

    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection === MovingDirection.right){
                this.xVelocity=this.defaultXVelocity;
                this.yVelocity=0;
                const rightMostEnemy = enemyRow[enemyRow.length-1];
                if(rightMostEnemy.x+rightMostEnemy.width>=this.canvas.width){
                    if(rightMostEnemy.y<80){
                    this.currentDirection = MovingDirection.downLeft;
                    this.yVelocity=0;
                    this.xVelocity=0;
                    break;
                    }
                    else{
                        this.currentDirection = MovingDirection.upLeft;
                        this.yVelocity=0;
                        this.xVelocity=0;
                        break;
                    }
                }
            }

            else if(this.currentDirection===MovingDirection.downLeft){
                this.xVelocity=-this.defaultXVelocity;
                this.yVelocity=this.defaultYVelocity;
                const leftMostEnemy = enemyRow[0];                
                if(leftMostEnemy.x<=0){
                    this.currentDirection = MovingDirection.right;
                    this.xVelocity=0;
                    this.yVelocity=0;
                    break;
                }
            }

            else if(this.currentDirection===MovingDirection.left){
                this.xVelocity=-this.defaultXVelocity;
                this.yVelocity=0;
                const leftMostEnemy = enemyRow[0];
                if(leftMostEnemy.x<=0){
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            }
            else if(this.currentDirection===MovingDirection.upLeft){
                this.xVelocity=-this.defaultXVelocity;
                this.yVelocity=-this.defaultYVelocity;
                const leftMostEnemy = enemyRow[0];                
                if(leftMostEnemy.x<=0){
                    this.yVelocity=0;
                    this.currentDirection = MovingDirection.right;
                    break;
                }
            }
            
        }
    }

    drawChickens(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity,this.yVelocity);
            enemy.draw(ctx);
        });
    }

    createEnemies(){
        this.chickenMap.forEach((row,rowIndex)=>{
        this.enemyRows[rowIndex]=[];
        row.forEach((enemyNumber,enemyIndex)=>{
            if(enemyNumber>0){
                this.enemyRows[rowIndex].push(new Enemy(enemyIndex*80,rowIndex*80,enemyNumber))
            }
        });
    });
    }

    collideWith(sprite){
        return this.enemyRows.some((enemyRow)=>enemyRow.some((enemy)=>enemy.collideWith(sprite)));

    }
    howManyPoint(){
        return this.points;
    }

}