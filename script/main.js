window.onload = () => {
    

    function startGame() {
        background.draw();
        setTimeout ( () =>{
            enemie1.draw()
        },2000) 
            

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
      const enemie1 = new Enemie(250, 130, 100, 100, './images/Sprites/Enemies/enemie1.png');

      
      
      function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if (x >= enemie1.posX && x <= (enemie1.width + enemie1.posX) && y >= enemie1.posY && y <= (enemie1.height + enemie1.posY) ){
            console.log('teste');
        } return false
        console.log("x: " + x + " y: " + y)
    }
    
        canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e)
    })

document.getElementById('start-button').addEventListener("click", () => {
        startGame();

    });
};

// counterKills(){};



//class MaidsAppears(){};

// gameOver(){};

/*function mudarNome()
{
 if(document.getElementById("button").value == "Start Game")
 {
  document.getElementById("button").value = "Restart";
 }
 else
 {
  document.getElementById("button").value = "Start Game";
 }
}*/


// movimento mouse

/*let mouse = {}
cnv.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX - cnv.offsetLeft;
    mouse.y = event.clientY - cnv.offsetTop;
});

function render() {
    ctx.clearReact(0, 0, canvas.width, canvas.height);
    ctx.save();
    draw();
}
function loop() {
    requestAnimationFrame(loop, cnv);
    update();
    render();
}*/

/*const mira = new Image();
  mira.onload = ()
  mira.src = "./images/Aim/aim.png"
  mira.addEventListener('load', function(){
      loop();
  }, false)

function update(){

}*/
