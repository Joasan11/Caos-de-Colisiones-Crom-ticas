const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth; // Puede que falte en el examen !!!¡¡¡
const height = canvas.height = window.innerHeight; // Puede que falte en el examen !!!¡¡¡

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomRGB = () => {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(){
        // Verifica la posición x de la pelota más su tamaño supera el ancho del lienzo
        if((this.x + this.size) >=  width) {
            // Si hay colisión con el borde derecho se invierte la dirección horizontal
            this.velX = -(Math.abs(this.velX));
        }
        // Verifica si la posición x de la pelota menos su tamaño es menor o igual a cero
        if((this.x + this.size) <= 0 ) {
            // Si hay colisión con el borde izquierdo se invierte la dirección horizontal
            this.velX = +(Math.abs(this.velX));
        }
        // Verifica si la posición y de la pelota más su tamaño supera el largo del lienzo
        if((this.y + this.size) >= height) {
            // Si hay colisión con el borde de abajo se invierte la dirección vertical
            this.velY = -(Math.abs(this.velY));
        }
        // Verifica si la posición y de la pelota menos su tamaño es menor o igual a cero
        if((this.y + this.size) <= 0) {
            // Si hay colisión con el borde de arriba se invierte la dirección vertical
            this.velY = +(Math.abs(this.velY));
        }

        // Se actualiza las coordenadas de la pelota segun las velocidades actuales
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetected() {
        for(const ball of balls){
            // Verficamos si la pelota actual no es la misma que la pelota de la iteración
            if (!(this === ball)){
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;

                // Calcular la distancia entre el centro de la pelota actual y la pelota de la iteración
                const distance = Math.sqrt(dx * dx + dy * dy); // Puede que haya que cambiarlo en el examen !!!¡¡¡

                if (distance < this.size + ball.size){
                    ball.color = this.color = randomRGB();
                }
            }
        }

        /*
        for (let i = 0; balls < array.length; i++){
            const ball = balls[i];
        }

        array.forEach(ball => {
            
        });
        */
    }
}

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);

    const ball = new Ball(
        // Generar la posición en x de forma aleatoria para esta bola en el lienzo
        random(0 + size, width - size),
        random(0 + size, height - size),
        // La velocidad en la dirección de x se establece de forma aleatoria en tre -7 y 7
        random(-7, 7),
        random(-7, 7),
        randomRGB,
        size
    )

    balls.push(ball);
}

const loop = () => {
    // Establece un color de fondo semitranparente (0.25)
    ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls){
        ball.draw() // Dibujamos la pelota
        ball.update() // Actualiza la posición de la pelota
        ball.collisionDetected() // Detectamos la colisión de la pelota
    }

    requestAnimationFrame(loop); // Solicita al navegador que llame a la funcion loop
}

loop() // Inicia el bucle principal