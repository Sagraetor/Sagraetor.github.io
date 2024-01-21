function RandomLocationOffScreen() {
    let startSide = Math.floor(Math.random() * 4) + 1
    let startPosition = Math.floor(Math.random() * 1001)
    startPosition = startPosition / 10

    var x
    var y

    if (startSide == 1) {
        x = -5
        y = startPosition
    }
    if (startSide == 2) {
        x = 105
        y = startPosition
    }
    if (startSide == 3) {
        x = startPosition
        y = -5
    }
    if (startSide == 4) {
        x = startPosition
        y = 105
    }

    return [x, y]
}

function resizeCanvas() {
    const canvas = document.getElementById("myCanvas")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function strokeLinesFromList(context, lines) {
    for (var i = 0.25; i <= 4; i += 0.25){
        context.beginPath()
        for (var j = 0; j < lines.length; j++){
            if (lines[j].width == i){
                
                context.moveTo(lines[j].fromX, lines[j].fromY)
                context.lineTo(lines[j].toX, lines[j].toY)
            }
        }
        context.lineWidth = i
        context.stroke()
    }
}

function drawLine() {
    const maxLength = 120

    const circles = document.getElementById("div1").getElementsByClassName("circle")
    const circleRects = []
    for (var i = 0; i < circles.length; i++) {
        circleRects.push(circles[i].getBoundingClientRect())
    }

    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgb(221, 221, 221)"

    const toDraw = []

    for (var i = 0; i < circles.length; i++) {
        for (var j = 0; j < circles.length; j++){
            if (i == j) {continue}
            
            let circleRect = circleRects[i]
            let siblingRect = circleRects[j]
        
            let distance = Math.sqrt((circleRect.left - siblingRect.left) ** 2 + (circleRect.top - siblingRect.top) ** 2)
            if (distance <= maxLength){
                let lineWidth = 4 - (Math.ceil(distance / maxLength * 16) * 0.25)
                toDraw.push({fromX: circleRect.left + 5, toX: siblingRect.left + 5, fromY: circleRect.top + 5, toY: siblingRect.top + 5, width: lineWidth})
            }
        }
    }

    strokeLinesFromList(context, toDraw)
}

function spawnMovingCircle() {
    const circleContainer = document.getElementById("div1")
    const newCircle = document.createElement("figure")
    newCircle.className = "circle"

    let startPos = RandomLocationOffScreen()
    let endPos = RandomLocationOffScreen()
    
    newCircle.style.left = startPos[0] + "%"
    newCircle.style.top = startPos[1] + "%"
    
    let distance = Math.sqrt((endPos[0] - startPos[0]) ** 2 + (endPos[1] - startPos[1]) ** 2)

    circleContainer.appendChild(newCircle)
    let anim = gsap.to(newCircle, {left: endPos[0] + "%", top: endPos[1] + "%", ease: "none", duration: distance/5, onComplete: function() {circleContainer.removeChild(newCircle)}})
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas()
setInterval(spawnMovingCircle, 180);
setInterval(drawLine, 10);