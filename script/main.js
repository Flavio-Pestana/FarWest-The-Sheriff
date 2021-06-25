window.onload = () => {
    document.getElementById('start-button').addEventListener("click", () => {
        startGame();

    });

    function startGame() {
      background.draw();
      aim.draw();

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
    const background = new Background('./images/gameBackground.jpg');
};

// movimento mouse

/*class Aim {
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
const aim = new Aim('./images/Aim/aimtest.png');
};


/*const mira = new Image();
  mira.onload = ()
  mira.src = "./images/Aim/aim.png"
  mira.addEventListener('load', function(){
      loop();
  }, false)

let mouse = {}
    cnv.addEventListener ('mousemove', function(event){
        mouse.x = event.clientX - cnv.offsetLeft;
        mouse.y = event.clientY - cnv.offsetTop;
    })


function update(){

}

function render(){
    ctx.clearReact(0, 0, canvas.width, canvas.height);
    ctx.save();
    draw();
}
function loop() {
    requestAnimationFrame(loop, cnv);
    update();
    render();
    
    
}
*/
