

window.onload = () => {

    
    let mainSound = new Audio();
    mainSound.src = './sounds/TitleScreen.mp3';
    mainSound.volume = 1;
    mainSound.loop = true;
    mainSound.play();
    
    let winSound = new Audio();
    winSound.src = './sounds/End.mp3';

    let lostSound = new Audio();
    lostSound.src = './sounds/GameOver.mp3'



    function startGame() {
        mainSound.pause();
       //mainSound.play();

        background.draw();

        setTimeout(() => {
            enemie1.draw()
        }, 2000);

        setTimeout(() => {
            enemie2.draw()
        }, 3000);

        setTimeout(() => {
            enemie3.draw()
        }, 3800);
        
    }

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

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
        constructor(x, y, width, height, imgsrc) {
            this.posX = x;
            this.posY = y;
            this.width = width;
            this.height = height;
            const img = new Image();
            img.src = imgsrc;
            img.onload = () => {
                this.img = img

            }
        }

        draw() {
            ctx.drawImage(
                this.img,
                this.posX,
                this.posY,
                this.width,
                this.height,

            )
        };

    }

    

    function createenemies(){

    }
    const enemie1 = new Enemie(250, 130, 100, 100, './images/Sprites/Enemies/enemie1.png');
    const enemie2 = new Enemie(660, 300, 150, 150, './images/Sprites/Enemies/enemie2.png');
    const enemie3 = new Enemie(250, 300, 130, 130, './images/Sprites/Enemies/enemie3.png');

    //check shoot


    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        
        if (x >= enemie1.posX && x <= (enemie1.width + enemie1.posX) && y >= enemie1.posY && y <= (enemie1.height + enemie1.posY) === true) {
            
        }

        console.log("x: " + x + " y: " + y)
    }

    canvas.addEventListener('mousedown', function (e) {
        getCursorPosition(canvas, e)
    })

    



    document.getElementById('start-button').addEventListener("click", () => {
        startGame();

    });
};

