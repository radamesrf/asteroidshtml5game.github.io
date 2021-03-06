function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight
}

function init() {

    audio.play();
    audio.loop = true;
    resizeCanvas();

    for (var e = 0; e < qtenaves; e++) {
        naves[e] = new Nave
    }

    start = new Level(1, 1);

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false)
}

function draw() {

    clearCtxBall();
    vidas();
    points();

    naves[proxNave].draw();

    if (naves[proxNave].radio > 0 && naves[proxNave].radio < 90 || naves[proxNave].radio < 0 && naves[proxNave].radio > -90) {

        naves[proxNave].drawX += naves[proxNave].speed * Math.cos(naves[proxNave].radio * (Math.PI / 180));
        naves[proxNave].drawY -= naves[proxNave].speed * Math.sin(naves[proxNave].radio * (Math.PI / 180))

    } else if (naves[proxNave].radio > 90 && naves[proxNave].radio < 180 || naves[proxNave].radio < -90 && naves[proxNave].radio > -180) {

        naves[proxNave].drawX += naves[proxNave].speed * Math.cos(naves[proxNave].radio * (Math.PI / 180));
        naves[proxNave].drawY -= naves[proxNave].speed * Math.sin(naves[proxNave].radio * (Math.PI / 180))

    } else if (naves[proxNave].radio > 180 && naves[proxNave].radio < 270 || naves[proxNave].radio < -180 && naves[proxNave].radio > -270) {

        naves[proxNave].drawX += naves[proxNave].speed * Math.cos(naves[proxNave].radio * (Math.PI / 180));
        naves[proxNave].drawY -= naves[proxNave].speed * Math.sin(naves[proxNave].radio * (Math.PI / 180))

    } else if (naves[proxNave].radio > 270 && naves[proxNave].radio < 360 || naves[proxNave].radio < -270 && naves[proxNave].radio > -360) {

        naves[proxNave].drawX += naves[proxNave].speed * Math.cos(naves[proxNave].radio * (Math.PI / 180));
        naves[proxNave].drawY -= naves[proxNave].speed * Math.sin(naves[proxNave].radio * (Math.PI / 180))

    } else if (naves[proxNave].radio == 0 || naves[proxNave].radio == -360) {

        naves[proxNave].drawX += naves[proxNave].speed

    } else if (naves[proxNave].radio == 90 || naves[proxNave].radio == -270) {

        naves[proxNave].drawY -= naves[proxNave].speed

    } else if (naves[proxNave].radio == 180 || naves[proxNave].radio == -180) {

        naves[proxNave].drawX -= naves[proxNave].speed

    } else if (naves[proxNave].radio == 270 || naves[proxNave].radio == -90) {

        naves[proxNave].drawY += naves[proxNave].speed

    }

    rot += fps;

    if (rot >= 100) {

        for (var e = 0; e < astros.length; e++) {

            if (typeof astros[e] != "undefined") {

                if (ax == 1024) {
                    ax = 128;

                    if (ay == 384) { ay = 0 } else { ay += 128 } astros[e].srcX = 0;
                    astros[e].srcY = ay

                } else {
                    astros[e].srcX = ax;
                    astros[e].srcY = ay;
                    ax += 128
                }
            }
        }

        rot = 0
    }

    for (var e = 0; e < astros.length; e++) {

        if (typeof astros[e] != "undefined") {

            if (astros[e].isExplodiu == true) {

                astros[e].noseX = astros[e].drawX - 70;
                astros[e].noseY = astros[e].drawY - 40;
                astros[e].drawX = -50;
                astros[e].drawY = -50;
                astros[e].draw();

                if (qtastrosexp == start.qte) {

                    qtastrosexp = 0;
                    stopDrawing();
                    start.level++;
                    start.qte += 2;
                    start.proxLevel()

                }

            } else {

                if (naves[proxNave].drawX.toFixed(0) - astros[e].drawX - 25 > -40 && naves[proxNave].drawX.toFixed(0) - astros[e].drawX - 25 < 40 && naves[proxNave].drawY.toFixed(0) - astros[e].drawY - 25 > -40 && naves[proxNave].drawY.toFixed(0) - astros[e].drawY - 25 < 40) {
                    naves[proxNave].naveExplodiu = true
                }

                astros[e].draw();

                astros[e].drawX = astros[e].rx;
                astros[e].rx = astros[e].velx + astros[e].ixpos;
                astros[e].drawY = astros[e].ry;
                astros[e].ry = astros[e].vely + astros[e].iypos;

                if (astros[e].flagx) {
                    astros[e].velx -= astros[e].speedx
                } else {
                    astros[e].velx += astros[e].speedx
                }

                if (astros[e].flagy) {
                    astros[e].vely -= astros[e].speedy
                } else {
                    astros[e].vely += astros[e].speedy
                }

                if (astros[e].rx >= gameWidth) {
                    astros[e].flagx = true
                } else if (astros[e].rx <= 20) {
                    astros[e].flagx = false
                }

                if (astros[e].ry >= gameHeight) {
                    astros[e].flagy = true
                } else if (astros[e].ry <= 20) {
                    astros[e].flagy = false
                }
            }
        }
    }
}

function gameOver() {
    stopDrawing();
    c.fillStyle = "red";
    c.lineWidth = 8;
    c.strokeStyle = "black";
    c.font = "bold 50px Verdana";
    c.textBaseline = "middle";
    c.strokeText("GAME OVER ", gameWidth / 2 - 150, gameHeight / 2);
    c.fillText("GAME OVER ", gameWidth / 2 - 150, gameHeight / 2);
    c.fillStyle = "orange";
    c.font = "bold 20px Verdana";
    c.fillText(pontos.toFixed(0) + " PONTOS", gameWidth / 2 - 40, gameHeight / 2 + 50);
    c.lineWidth = 2;
    c.strokeText(pontos.toFixed(0) + " PONTOS", gameWidth / 2 - 40, gameHeight / 2 + 50)
}

function vidas() {
    var e = 0;
    for (var t = 3; t > proxNave; t--) {
        c.drawImage(imgNave, e += 70, 12, 32, 32)
    }
}

function points() {
    c.fillStyle = "orange";
    c.font = "bold 20px Arial";
    c.fillText("TIROS " + tiros + " | " + pontos.toFixed(0) + " PONTOS | LEVEL " + start.level, gameWidth - 400, 35)
}

function Level(e, t) {
    this.qte = t;
    this.level = e;
    this.proxLevel()
}

function startDrawing() {
    stopDrawing();
    drawInterval = setInterval(draw, fps)
}

function stopDrawing() {

    clearInterval(drawInterval)

}

function clearCtxBall() {
    c.fillStyle = "rgba(0,0,0,0.2)";
    c.clearRect(0, 0, gameWidth, gameHeight)
}

function Astro(e, t, n, r, i, s, o) {

    this.tam = i;
    this.drawX = e;
    this.drawY = t;
    this.speedx = n;
    this.speedy = r;
    this.ixpos = e;
    this.iypos = t;
    this.rx = 0;
    this.ry = 0;
    this.flagx = s;
    this.flagy = o;
    this.velx = 0;
    this.vely = 0;
    this.noseX = 0;
    this.noseY = 0;
    this.boom = new Exp;
    this.som = new Audio("sounds/explosion.mp3");
    this.isExplodiu = false;
    this.fimAnim = false;
    this.width = 128;
    this.height = 128

}

function Exp() {

    this.srcX = 0;
    this.srcY = 0;
    this.width = 150;
    this.height = 146;
    this.drawX = 150;
    this.drawY = 150;
    this.xbom = 0;
    this.ybom = 0;
    this.fpsanim = 0;
    this.startAnin = false

}

function Nave() {

    this.srcX = 0;
    this.srcY = 0;
    this.drawX = gameWidth / 2;
    this.drawY = gameHeight / 2;
    this.width = 64;
    this.height = 64;
    this.isUpKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isRightKey = false;
    this.naveExplodiu = false;
    this.fimAnim = false;
    this.boom = new Exp;
    this.speed = 0;
    this.radio = 90;
    this.xpos = 0;
    this.ypos = 0;
    this.isSpacebar = false;
    this.isShooting = false;
    this.bullets = [];
    this.currentBullet = 0;

    for (var e = 0; e < 20; e++) {
        this.bullets[this.bullets.length] = new Bullet
    }
}

function Bullet() {

    this.drawX = -20;
    this.drawY = -20;
    this.width = 4;
    this.radio = 90;
    this.som = new Audio("sounds/tiro.mp3")

}

function checkKeyDown(e) {

    var t = e.keyCode || e.which;

    if (t === 38 || t === 87) {
        naves[proxNave].isUpKey = true;
        e.preventDefault()
    }

    if (t === 39 || t === 68) {
        naves[proxNave].isRightKey = true;
        e.preventDefault()
    }

    if (t === 40 || t === 83) {
        naves[proxNave].isDownKey = true;
        e.preventDefault()
    }

    if (t === 37 || t === 65) {
        naves[proxNave].isLeftKey = true;
        e.preventDefault()
    }

    if (t === 32) {
        naves[proxNave].isSpacebar = true;
        e.preventDefault()
    }
}

function checkKeyUp(e) {

    var t = e.keyCode || e.which;

    if (t === 38 || t === 87) {
        naves[proxNave].isUpKey = false;
        e.preventDefault()
    }

    if (t === 39 || t === 68) {
        naves[proxNave].isRightKey = false;
        e.preventDefault()
    }

    if (t === 40 || t === 83) {
        naves[proxNave].isDownKey = false;
        e.preventDefault()
    }

    if (t === 37 || t === 65) {
        naves[proxNave].isLeftKey = false;
        e.preventDefault()
    }

    if (t === 32) {
        naves[proxNave].isSpacebar = false;
        e.preventDefault()
    }
}

var canvas = document.getElementById("rada");

c = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("load", init);

var fps = 10;
var drawInterval;
var balls = [];
var astros = [];
var naves = [];
var ax = 0;
var ay = 0;
var rot = 0;
var tempo = 0;
var qtenaves = 3;
var proxNave = 0;
var qtastrosexp = 0;
var pontos = 0;
var tiros = 0;
var start;

var imgAstro = new Image;
imgAstro.src = "images/astros.png";

var imgNave = new Image;
imgNave.src = "images/ship.png";

var imgBlow = new Image;
imgBlow.src = "images/explosao.png";

audio = new Audio("sounds/track.mp3");

Level.prototype.proxLevel = function() {

    for (var e = 0; e < this.qte; e++) {

        astros[e] = new Astro(
            Math.floor(Math.random() * gameWidth + 0),
            Math.floor(Math.random() * gameHeight + 0),
            Math.floor(Math.random() * 3 + 1),
            Math.floor(Math.random() * 3 + 1),
            Math.floor(Math.random() * 60 + 50),
            Math.floor(Math.random() * 2 + 0),
            Math.floor(Math.random() * 2 + 0)
        )

    }

    c.font = "bold 45px Verdana";
    c.lineWidth = 8;
    c.strokeStyle = "black";
    c.fillStyle = "orange";
    c.strokeText("LEVEL" + this.level, gameWidth / 2 - 80, gameHeight / 2);
    c.fillText("LEVEL" + this.level, gameWidth / 2 - 80, gameHeight / 2);

    tiros = 0;

    setTimeout(function() {
        startDrawing()
    }, 1e3)
};

Astro.prototype.draw = function() {

    this.AstroExplode();
    this.boom.draw();

    if (!this.isExplodiu) {
        c.drawImage(imgAstro, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width - this.tam, this.height - this.tam)
    }
};

Astro.prototype.AstroExplode = function() {

    if (this.isExplodiu == true && this.fimAnim == false) {
        this.boom.anim(this.noseX, this.noseY);
        this.fimAnim = true;
        qtastrosexp++;
        pontos += 100
    }

};

Exp.prototype.draw = function() {

    if (this.startAnin) {

        if (this.fpsanim == 20) {

            if (this.xbom == 1200) {

                this.xbom = 0;
                this.srcX = this.xbom;

                if (this.ybom == 876) {

                    this.startAnin = false;
                    this.ybom = 0

                } else {

                    this.ybom += 146;
                    this.srcY = this.ybom

                }

                this.xbom += 150

            } else {

                this.srcX = this.xbom;
                this.xbom += 150

            }

            this.fpsanim = 0

        } else {

            this.fpsanim += fps

        }

        c.drawImage(imgBlow, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width + 30, this.height + 30)
    }
};

Exp.prototype.anim = function(e, t) {

    this.drawX = e;
    this.drawY = t;
    this.startAnin = true

};

Nave.prototype.draw = function() {

    this.checkKeys();
    this.noseX = this.drawX;
    this.noseY = this.drawY;
    this.checkShooting();
    this.drawAllBullets();
    this.boom.draw();

    if (!this.naveExplodiu) {

        this.fimAnim = false;
        c.save();
        c.translate(this.drawX, this.drawY);
        c.rotate(this.radio * -(Math.PI / 180));
        c.drawImage(imgNave, -(this.width / 2), -(this.height / 2), this.width, this.height);
        c.restore()

    } else {

        this.NaveExplode();
        this.drawX = -20;
        this.drawY = -20;

        if (tempo == 1e3) {

            if (proxNave == 2) {
                gameOver()
            } else {
                delete naves[proxNave];
                proxNave++
            }

            tempo = 0

        } else {
            tempo += fps
        }

    }
};

Nave.prototype.checkKeys = function() {

    if (this.isUpKey) {
        this.speed += .02;
        if (this.speed > 3) {
            this.speed = 3
        }
    }

    if (this.isDownKey) {
        this.speed -= .02;
        if (this.speed <= 0) {
            this.speed = 0
        }
    }

    if (this.isRightKey) {
        if (this.radio == -358) {
            this.radio = 0
        } else {
            this.radio -= 2
        }
    }

    if (this.isLeftKey) {
        if (this.radio == 358) {
            this.radio = 0
        } else {
            this.radio += 2
        }
    }

};

Nave.prototype.drawAllBullets = function() {

    for (var e = 0; e < this.bullets.length; e++) {
        if (this.bullets[e].drawX >= 0) {
            this.bullets[e].draw()
        }
    }

};

Nave.prototype.checkShooting = function() {

    if (this.isSpacebar && !this.isShooting) {

        this.isShooting = true;
        this.bullets[this.currentBullet].fire(this.noseX, this.noseY, this.radio);
        this.currentBullet++;

        if (this.currentBullet >= this.bullets.length)
            this.currentBullet = 0

    } else if (!this.isSpacebar) {
        this.isShooting = false
    }
};

Nave.prototype.NaveExplode = function() {

    if (this.naveExplodiu == true && this.fimAnim == false) {
        this.boom.anim(this.drawX - 100, this.drawY - 50);
        this.fimAnim = true
    }

};

var bx = false;
var by = false;

Bullet.prototype.draw = function() {

    if (this.drawX > gameWidth || this.drawX < 0) {

        this.drawX = -20;
        this.drawY = -20

    } else if (this.drawY > gameHeight || this.drawY < 0) {

        this.drawY = -20;
        this.drawX = -20

    } else {

        this.drawX += 5 * Math.cos(this.radio * (Math.PI / 180));
        this.drawY -= 5 * Math.sin(this.radio * (Math.PI / 180));

        for (var e = 0; e < astros.length; e++) {

            if (typeof astros[e] != "undefined") {

                if (this.drawX.toFixed(0) - astros[e].drawX - 25 > -40 && this.drawX.toFixed(0) - astros[e].drawX - 25 < 40 && this.drawY.toFixed(0) - astros[e].drawY - 25 > -40 && this.drawY.toFixed(0) - astros[e].drawY - 25 < 40) {

                    this.drawX = -20;
                    this.drawY = -20;
                    astros[e].isExplodiu = true;
                    astros[e].som.play()

                }
            }
        }

        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.drawX, this.drawY, 4, 0, Math.PI * 2, false);
        c.fill()
    }
};

Bullet.prototype.fire = function(e, t, n) {

    this.drawX = e;
    this.drawY = t;
    this.radio = n;
    this.som.play();

    tiros++;

    if (tiros > start.qte) {
        pontos -= 10;
    }
}