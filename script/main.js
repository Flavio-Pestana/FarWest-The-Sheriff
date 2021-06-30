

window.onload = () => {
    
    let mainSound = new Audio();
    mainSound.src = './sounds/TitleScreen.mp3';
    mainSound.volume = 0.2;
    // mainSound.loop = true;
    //mainSound.play();
    
    let winSound = new Audio();
    winSound.src = './sounds/End.mp3';
    winSound.volume = 1  ;

    let lostSound = new Audio();
    lostSound.src = './sounds/GameOver.mp3'

    let sheriffShot = new Audio();
    sheriffShot.src = './sounds/SheriffShot_1.mp3' 
    sheriffShot.volume = 0.5;   
        
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let frame = 0; //para determinar o tempo de criaçao dos inimigos
    let inimigos = []; //guarda os inimigos criados
    let score = 0; 

    function startGame() {
      mainSound.play();        
      background.draw();
      updateCanvas();
    }


    function updateCanvas(){
      frame += 1;
      clearCanvas();
      background.draw();
      ctx.font = '40px Pixel Cowboy';
      ctx.fillStyle = 'white';
      ctx.fillText(`Kills : ${score}`, 30, 200);
      updateEnemies();
      gameWin();
      animationId = requestAnimationFrame(updateCanvas);
    }

    function clearCanvas(){
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
        constructor(x, y, width, height, imgsrc) {
            this.posX = x;
            this.posY = y;
            this.width = width;
            this.height = height;

            const img = new Image();
              img.src = imgsrc;
              img.onload = () => {
                this.img = img 
                this.draw();              
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
    

    function createEnemies(){
        
            let sprite = pickPosition(enemiesprite);
            console.log(sprite);
            let posScreen = pickPosition(enemieposition);
            let enemy = new Enemie(posScreen.x, posScreen.y, posScreen.width, posScreen.height,sprite)
            console.log(enemy);
            inimigos.push(enemy);                   
                
    } 
    
    function updateEnemies (){        
        inimigos.forEach(inimigo => {
            inimigo.draw();            
        });
        if (frame % 90 === 0){
            createEnemies();            
        }
    }     
    
    //check shoot
    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        
        for (let i = 0; i < inimigos.length; i ++ ){
           
        if (x >= inimigos[i].posX && x <= (inimigos[i].width + inimigos[i].posX) && y >= inimigos[i].posY && y <= (inimigos[i].height + inimigos[i].posY) === true) {
          inimigos.splice(i, 1); 
          score +=1;
          console.log(score);  
        }
        }        
    }

    function gameWin(){
        if( score === 20){
          winSound.play();           
          ctx.font = '50px Pixel Cowboy';
          ctx.fillStyle = 'white';
          ctx.fillText('Great job, Sheriff! ', 300, 300);
          cancelAnimationFrame();                      
        }
    }

    function gameOver(){

    }
       
       
    canvas.addEventListener('click', function (e) {
         sheriffShot.play();         
        getCursorPosition(canvas, e);        
    })

        document.getElementById('start-button').addEventListener("click", () => {
        startGame();

    });
};

