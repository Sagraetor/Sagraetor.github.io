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
const noStar = '<img src="./assets/nostar.png" alt="" style= "object-fit: contain; height: 100%;"></img>'
const container = document.getElementById("tabDisplay")

var currentSkillCount = 0
var currentRows = 0
var active = false

function addEntry(number){
    var newRow = document.createElement("div")
    newRow.className = "tab-row"
    newRow.innerHTML = '<div class="tab-text", id = "skillEntry' + number +'"></div><div class="star-container" data-rating=' + 0 + '></div>'
    container.appendChild(newRow)
}

function drawStar(){
    function replaceStar(starContainer, fullStarCount, decreasing = true){
        for(var i = 0; i < 5; i ++){
            if (i < fullStarCount){
                starContainer.childNodes[i].src = "./assets/fullstar.png"
            }else if(decreasing){
                starContainer.childNodes[i].src = "./assets/halfstar.png"
            }
        }
    }

    function createStar(starContainer){
        var innerHTML = ''
        for(var i = 0; i < 5; i ++){
            innerHTML += noStar
        }
        starContainer.innerHTML=innerHTML
    }

    var starContainers = document.getElementsByClassName("star-container");
    var starAnimation = gsap.timeline()

    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (!starContainers[i].hasChildNodes()){createStar(starContainers[i])}
        }
    }}, 0)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            replaceStar(starContainers[i], (1), false)
        }
    }}, 0.1)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            replaceStar(starContainers[i], (2), false)
        }
    }}, 0.2)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            replaceStar(starContainers[i], (3), false)
        }
    }}, 0.3)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            replaceStar(starContainers[i], (4), false)
        }
    }}, 0.4)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            replaceStar(starContainers[i], (5), false)
        }
    }}, 0.5)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (starContainers[i].dataset.rating < 5){replaceStar(starContainers[i], (4))}
        }
    }}, 0.6)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (starContainers[i].dataset.rating < 4){replaceStar(starContainers[i], (3))}
        }
    }}, 0.7)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (starContainers[i].dataset.rating < 3){replaceStar(starContainers[i], (2))}
        }
    }}, 0.8)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (starContainers[i].dataset.rating < 2){replaceStar(starContainers[i], (1))}
        }
    }}, 0.9)
    starAnimation.to(starContainers, {onStart: () => {
        for (var i = 0; i < starContainers.length; i++){
            if (starContainers[i].dataset.rating < 1){replaceStar(starContainers[i], (0))}
        }
    }}, 1)
    starAnimation.play()
}

function populateTab(category){
    skillnames = Object.keys(category)
    var skillRenameTimeline = gsap.timeline()
    for (var i = 0; i< skillnames.length; i++){
        skillRenameTimeline.to("#skillEntry" + i, {duration: .5, text: skillnames[i]}, 0)
        container.children[i].children[1].dataset.rating = category[skillnames[i]]
    }
    skillRenameTimeline.play()
    drawStar()
}

function resizeTab(working, skillCount, rows){
    function end(){
        currentSkillCount = skillCount
        currentRows = rows
        populateTab(working)}

    if (skillCount < currentSkillCount){
        for (var i = currentSkillCount; i != skillCount; i--){
            container.removeChild(container.lastElementChild)
        }

        if (rows < currentRows){
            const state = Flip.getState(container);
            container.style.gridTemplateRows = '5vh '.repeat(rows)
            Flip.from(state, {
                duration: Math.sqrt(currentRows - rows) / 5,
                ease: "power1.inOut",
                onComplete: end()
            });
        }else{end()}

    } else if (skillCount > currentSkillCount){
        if (rows > currentRows){
            gsap.to(".tab-display", {
                duration: Math.sqrt(rows - currentRows) / 5,
                ease: 'power1.out',
                gridTemplateRows: '5vh '.repeat(rows),
                onComplete: () => {
                    for (var i = currentSkillCount; i != skillCount; i++){
                        addEntry(i)
                    }
                    end()}
            })
        }else{
            addEntry(skillCount-1)
            end()
        }
    } else{end()}
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
    
    
}

ScrollTrigger.create({
    trigger: document.getElementById("projects"),
    once: true,
    preventOverlaps: false,
    onEnter: () =>{ if(!active){switchTab("programming")}}
    })