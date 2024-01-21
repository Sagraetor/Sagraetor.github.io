const info = {
    programming: {
        "Python": 4,
        "Java": 4,
        "Kotlin": 2,
        "Javascript": 3,
        "HTML": 4,
        "CSS": 3,
        "C++": 3,
        "C#": 3
    }, art: {
        "Aseprite": 4,
        "Blender": 3,
        "Photoshop": 3,
        "Ilustrator": 2,
        "Creativity": 2
    }, data: {
        "SQL": 4,
        "Power Bi": 3,
        "MatLab": 3,
        "Prolog": 3
    }, gameDev: {
        "Android": 3,
        "Pygame": 4,
        "Unity": 4
    }
}

const halfStar = '<img src="./assets/halfstar.png" alt="" style= "object-fit: contain; height: 100%;"></img>'
const fullStar = '<img src="./assets/fullstar.png" alt="" style= "object-fit: contain; height: 100%;"></img>'

var currentSkillCount = 0
var currentRows = 0
var active = false

function drawStar(){
    var starContainers = document.getElementsByClassName("star-container");

    for (var i = 0; i < starContainers.length; i++){
        var innerHTML = ''
        for (var j = 0; j < 5; j++)
            if (j > (starContainers[i].dataset.rating -1)){
                innerHTML += halfStar
            } else {
                innerHTML += fullStar
            }
        starContainers[i].innerHTML=innerHTML;
    }
}

function generateTab(category){
    var container = document.getElementById("tabDisplay")
    container.innerHTML = ''
    for (var skill in category){
        var newRow = document.createElement("div")
        newRow.className = "tab-row"
        newRow.innerHTML = '<div class="tab-text">' + skill + '</div> <div class="star-container" data-rating=' + category[skill] + '></div>'
        container.appendChild(newRow)
    }
    drawStar()
}

function resizeTab(working, skillCount, rows){
    var container = document.getElementById("tabDisplay")
    const state = Flip.getState(container);

    if (currentSkillCount > skillCount){
        generateTab(working)
        container.style.gridTemplateRows = '5vh '.repeat(rows)

        Flip.from(state, {
            duration: Math.sqrt(currentRows - rows) / 5,
            ease: "power1.inOut",
          });

    }else if(currentRows < rows){ 

        gsap.to(".tab-display", {
        duration: Math.sqrt(rows - currentRows) / 5,
        ease: 'power1.out',
        gridTemplateRows: '5vh '.repeat(rows),
        onComplete: generateTab,
        onCompleteParams: [working]
    })
    }else{
        generateTab(working)
    }
    
}

function switchTab(category){
    if (active){document.getElementsByClassName("tab-active")[0].className = "tab-changer"}
    active = true

    eval("var sender = document.getElementById('tab" + category + "')")
    sender.className = "tab-changer tab-active"

    eval("var working = info." + category)
    skillCount = Object.keys(working).length
    rows = Math.ceil(skillCount / 2)

    resizeTab(working, skillCount, rows)
    
    currentSkillCount = skillCount
    currentRows = rows
}

ScrollTrigger.create({
    trigger: document.getElementById("projects"),
    once: true,
    preventOverlaps: false,
    onEnter: () =>{ if(!active){switchTab("programming")}}
    })