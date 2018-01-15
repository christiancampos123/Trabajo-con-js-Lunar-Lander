//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleraci車n cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var dificultad = 5;
var salir;

//al cargar por completo la p芍gina...
window.onload = function () {
	
    document.getElementById("info").onclick = function () {
        if(confirm("?Desea salir de esta pagina?")){
            window.open("lunarLanderI.html","_self");
        }
}
    velocidad = document.getElementById("velocidad");
    altura = document.getElementById("altura");
    combustible = document.getElementById("fuel");
    document.getElementById("replayg").onclick = function () {

        document.getElementById("nave").style.top = "10%";
        v = 0;
        velocidad.innerHTML = v.toFixed(2);
        y = 10;
        altura.innerHTML = (140 - 2 * y).toFixed(2);
        c = 100;
        combustible.innerHTML = c.toFixed(2);
        document.getElementById("campeon").style.display = "none";

        start();
    }
    document.getElementById("replayl").onclick = function () {
        document.getElementById("nave").style.top = "10%";
        v = 0;
        velocidad.innerHTML = v.toFixed(2);
        y = 10;
        altura.innerHTML = (140 - 2 * y).toFixed(2);
        c = 100;
        combustible.innerHTML = c.toFixed(2);
        document.getElementById("loser").style.display = "none";

        start();
    }
    document.getElementById("pauseimg").onclick = function () {
        motorOff();
        if (timer == null) {
            return;
        }
        stop();
        document.getElementById("pauseimg").style.display = "none";
        document.getElementById("playimg").style.display = "block";
        document.getElementById("opcionesa").style.display = "block";
    }
	document.getElementById("about").onclick = function (){
	document.getElementById("divaco").style.display = "block";}
    document.getElementById("playimg").onclick = function () {
        start();
        document.getElementById("pauseimg").style.display = "block";
        document.getElementById("playimg").style.display = "none";
        document.getElementById("opcionesa").style.display = "none";
    }
    document.getElementById("replay").onclick = function () {
        document.getElementById("nave").style.top = "10%";
        v = 0;
        velocidad.innerHTML = v.toFixed(2);
        y = 10;
        altura.innerHTML = (140 - 2 * y).toFixed(2);
        c = 100;
        combustible.innerHTML = c.toFixed(2);
        document.getElementById("loser").style.display = "none";
        document.getElementById("opcionesa").style.display = "none";
        document.getElementById("playimg").style.display = "none";
        document.getElementById("pauseimg").style.display = "block";
        start();
    }
    document.getElementById("dificultad").onclick = function () {
        document.getElementById("nave").style.top = "10%";
        v = 0;
        velocidad.innerHTML = v.toFixed(2);
        y = 10;
        altura.innerHTML = (140 - 2 * y).toFixed(2);
        c = 100;
        combustible.innerHTML = c.toFixed(2);
        document.getElementById("campeon").style.display = "none";

        if (dificultad == 5) {
            dificultad = 3;
            console.log(dificultad);
        } else if (dificultad == 3) {
            dificultad = 1;
        } else if (dificultad == 1) {
            dificultad = 5;
        }
        document.getElementById("dificultad1").innerHTML = dificultad;
    }

    //definici車n de eventos
    //mostrar men迆 m車vil
    document.getElementById("showm").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    }
    //ocultar men迆 m車vil
    document.getElementById("hidem").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    }
    //encender/apagar el motor al hacer click en la pantalla
    document.getElementById("power").onclick = function () {
        if (timer == null) {
            return;
        }
        if (a == g) {
            motorOn();
        } else {
            motorOff();
        }
    }
    //encender/apagar al apretar/soltar una tecla
    document.onkeydown = function () {
        if (timer == null) {
            return;
        }
        motorOn();
    };
    document.onkeyup = motorOff;

    //Empezar a mover la nave justo despu谷s de cargar la p芍gina
    start();
}

//Definici車n de funciones
function start() {
    //cada intervalo de tiempo mueve la nave
    timer = setInterval(function () {
        moverNave();
    }, dt * 1000);
}

function stop() {
    clearInterval(timer);
    timer = null;
}

function moverNave() {
    //cambiar velocidad y posicion
    v += a * dt;
    y += v * dt;
    //actualizar marcadores
    velocidad.innerHTML = v.toFixed(2);
    altura.innerHTML = (140 - 2 * y).toFixed(2);

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        motorOff();
        stop();
        if (v < dificultad) {
            document.getElementById("campeon").style.display = "block";
        } else {
            document.getElementById("loser").style.display = "block";
        }
    }
}

function motorOn() {
    if (c <= 0) {
        motorOff();
        return;
    }
    //el motor da aceleraci車n a la nave
    a = -g;
    //mientras el motor est谷 activado gasta combustible
    if (timerFuel == null) {
        timerFuel = setInterval(function () {
            actualizarFuel();
        },
                10);
				document.getElementById("nave2").src = "img/naveconfuego.gif";
						document.getElementById("power").src = "img/powerB2.png";
    }
}
function motorOff() {
    a = g;
    clearInterval(timerFuel);
    timerFuel = null;
	document.getElementById("nave2").src = "img/starship.png";
		document.getElementById("power").src = "img/powerB.png";
}
function actualizarFuel() {
    //Restamos combustible hasta que se agota
    c -= 0.1;
    if (c < 0)
        c = 0;
    combustible.innerHTML = c.toFixed(2);
}