let tiempo;


function animationInterval() {
    tiempo = setInterval(executeAnimation, 5000)

}

function executeAnimation() {
    
    const letTitleAnimation = document.querySelector(".animat")

    letTitleAnimation.classList.add("letTitleAnimation");
}


function borrarAlerta() {
    
    clearTimeout(executeAnimation);
    tiempo = setInterval(executeAnimation, 9000)
  }
animationInterval()


function scroll_top() {
    window.scrollTo({ top: 0 });
    
    
}