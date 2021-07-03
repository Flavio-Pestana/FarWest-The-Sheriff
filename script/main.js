

window.onload = () => {

    /*let mainSound = new Audio();
    mainSound.src = './sounds/TitleScreen.mp3';
    mainSound.volume = 0.1;
    mainSound.loop = true;
    //mainSound.play();*/

    let gameSound = new Audio();
    gameSound.src = './sounds/MusicGame.mp3'
    gameSound.volume = 0.1;
    gameSound.loop = true;

    let winSound = new Audio();
    winSound.src = './sounds/End.mp3';
    winSound.volume = 0.1;

    let loseSound = new Audio();
    loseSound.src = './sounds/GameOver.mp3'

    let sheriffShot = new Audio();
    sheriffShot.src = './sounds/SheriffShot_1.mp3'
    sheriffShot.volume = 0.2;

    let enemySound = new Audio();
    enemySound.src = './sounds/EnemyShooting_1.mp3'


    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let animationId = null;
    let frame = 0; //para determinar o tempo de criaçao dos inimigos
    let inimigos = []; //guarda os inimigos criados
    let score = 0;
    let enemyTimer = [];
    let enemyshot = false; //check gameover


    function startGame() {
        //mainSound.pause();
        gameSound.play();        
        background.draw();
        updateCanvas();
    }

    
    function updateCanvas() {
        frame += 1;
        clearCanvas();
        background.draw();
        ctx.font = '40px Pixel Cowboy';
        ctx.fillStyle = 'white';
        ctx.fillText(`Kills : ${score}`, 30, 200);
        updateEnemies();
        checkGameEnd();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }



    class Background {
        constructor(source) {
            this.posX = 0;
            this.posY = 0;

            const img = new Image();
            img.src = source;
            img.onload = () => {
                this.img = img;
            }
        }

        draw() {
            ctx.drawImage(
                this.img,
                this.posX,
                this.posY,
                canvas.width,
                canvas.height
            );
        }
    }
    const background = new Background('./images/gameBackground.png', 0, 0, 1100, 570);

    class Enemie {
        constructor(x, y, width, height, imgsrc, imgshoot) {
            this.posX = x;
            this.posY = y;
            this.width = width;
            this.height = height;

            this.img = new Image();
            this.img.src = imgsrc;           
                                       
            

            this.imgshooting = new Image();
            this.imgshooting.src = imgshoot;            
                                        
            
        }

        draw() {
            if (enemyshot) {
                ctx.drawImage(
                    this.imgshooting,
                    this.posX,
                    this.posY,
                    this.width,
                    this.height,
                )
            } else {
                
                ctx.drawImage(
                    this.img,
                    this.posX,
                    this.posY,
                    this.width,
                    this.height,
                )
            }
        };
    }

    const enemieposition = [
        {
            x: 250,
            y: 130,
            width: 100,
            height: 100,
        },
        {
            x: 660,
            y: 300,
            width: 150,
            height: 150,
        },
        {
            x: 250,
            y: 300,
            width: 130,
            height: 130,
        },
        {
            x: 400,
            y: 300,
            width: 130,
            height: 130,
        },
        {
            x: 600,
            y: 140,
            width: 100,
            height: 100,
        }
    ];

    const enemiesprite = [
        {
            normal: './images/Sprites/Enemies/enemie1.png',
            shooting: './images/Sprites/Enemies/shooting/shooting1.png'
        },
        {
            normal: './images/Sprites/Enemies/enemie2.png',
            shooting: './images/Sprites/Enemies/shooting/shooting2.png'
        },

        {
            normal: './images/Sprites/Enemies/enemie3.png',
            shooting: './images/Sprites/Enemies/shooting/shooting3.png'
        }
    ];



    function pickPosition(array) {
        return array[Math.floor(Math.random() * array.length)];
    };


    function createEnemies() {

        let sprite = pickPosition(enemiesprite);
        
        let posScreen = pickPosition(enemieposition);
        let enemy = new Enemie(posScreen.x, posScreen.y, posScreen.width, posScreen.height, sprite.normal, sprite.shooting);
        
        inimigos.push(enemy);
        let timer = setTimeout(() => {
            enemySound.play();
            enemyshot = true
        }, 2000);
        enemyTimer.push(timer);

    }

    function updateEnemies() {
        inimigos.forEach(inimigo => {
            inimigo.draw();
        });
        if (frame % 90 === 0) {
            createEnemies();
        }
    }

    //check shoot
    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        for (let i = 0; i < inimigos.length; i++) {

            if (x >= inimigos[i].posX && x <= (inimigos[i].width + inimigos[i].posX) && y >= inimigos[i].posY && y <= (inimigos[i].height + inimigos[i].posY) === true) {
                inimigos.splice(i, 1);
                score += 1;
                clearTimeout(enemyTimer[i]);
                enemyTimer.splice(i, 1);
                console.log(score);
            }
        }
    }

    function checkGameEnd() {
        if (score >= 20) {
            cancelAnimationFrame(animationId);
            gameWin();
            inimigos = []
        } else if (enemyshot) {
            cancelAnimationFrame(animationId);
            gameOver();
            inimigos = [];
        } else {
            animationId = requestAnimationFrame(updateCanvas);
        }
    }

    function gameWin() {

        gameSound.pause();
        winSound.play();           
        ctx.font = '70px Pixel Cowboy';
        ctx.fillStyle = 'white';
        ctx.fillText('Great job, Sheriff! ', 300, 300);
    }

    function gameOver() {
        gameSound.pause();
        loseSound.play();
        ctx.font = '70px Pixel Cowboy';
        ctx.fillStyle = 'red';
        ctx.fillText('You died', 400, 300);      

    }

    function restart(){
        inimigos = [];
        score = 0;
        frame = 0;
        animationId = null;
        enemyshot = false;
        enemyTimer = [];
        loseSound.pause();
        winSound.pause();
        clearCanvas();
        startGame();

    }


    canvas.addEventListener('click', function (e) {
        sheriffShot.play();
        getCursorPosition(canvas, e);
    })

    document.getElementById('start-button').addEventListener("click", () => {
        startGame();
        
    });

    document.getElementById('restart-button').addEventListener("click", () => {
        restart();
        
    });
};

