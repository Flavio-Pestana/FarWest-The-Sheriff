

window.onload = () => {
    
    let mainSound = new Audio();
    mainSound.src = './sounds/TitleScreen.mp3';
    mainSound.volume = 1;
    mainSound.loop = true;
    //mainSound.play();
    
    let winSound = new Audio();
    winSound.src = './sounds/End.mp3';
    winSound.volume = 1  ;

    let lostSound = new Audio();
    lostSound.src = './sounds/GameOver.mp3'

    let sheriffShot = new Audio();
    sheriffShot.src = './sounds/SheriffShot_1.mp3'




    function startGame() {
        //mainSound.pause();
        
        background.draw();
        //inimigos[0].draw();
        updateEnemies().draw();
        
    }
    let frame = 0;

    function updateCanvas(){
        frame += 1;
        clearCanvas();
        background.draw();
        animationId = requestAnimationFrame(updateCanvas);
    }

    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        './images/Sprites/Enemies/enemie1.png',
        './images/Sprites/Enemies/enemie2.png',
        './images/Sprites/Enemies/enemie3.png' ];
   
    function pickPosition(array){
        return array[Math.floor(Math.random() * array.length)];
    };
    

    function createEnemies(x){
        for(let i = 0; i < x; i++){
            let sprite = pickPosition(enemiesprite);
            let posScreen = pickPosition(enemieposition);
            let enemy = new Enemie(posScreen.x, posScreen.y, posScreen.width, posScreen.height,sprite)
            inimigos.push(enemy);
                    
        }
        
    }
    
    let inimigos = [];

    //createEnemies(15);

    function updateEnemies (){
        if (frames % 80 === 0){
            createEnemies(15);
        }
    }


    //console.log(inimigos);
 
    //check shoot


    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        for (let i = 0; i < inimigos.length; i ++ ){
           // console.log(i); 
        if (x >= inimigos[i].posX && x <= (inimigos[i].width + inimigos[i].posX) && y >= inimigos[i].posY && y <= (inimigos[i].height + inimigos[i].posY) === true) {
          // console.log("acertou", i); 
        }
        }

        //console.log("x: " + x + " y: " + y)
    }
       
        // remove imagem no canvas?
    /*image.on("click",function(){
        this.remove();  // or this.destroy();
        layer.draw();
    });*/

    canvas.addEventListener('mousedown', function (e) {
         sheriffShot.play();         
        getCursorPosition(canvas, e)
        
    })

        document.getElementById('start-button').addEventListener("click", () => {
        startGame();

    });
};

