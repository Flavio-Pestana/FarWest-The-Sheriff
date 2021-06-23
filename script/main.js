window.onload = () => {
  document.getElementById('start-button').addEventListener("click", () => {
      startGame();
        
  });


    function startGame() {
      background.draw();
     
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


