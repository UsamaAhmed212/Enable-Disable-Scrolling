// Enable Disable Scrolling
document.getElementById("enable").onclick = function() {
    enableScroll(window);
    document.body.style.overflow = "auto";
    document.getElementById("status").innerHTML = "Enabled";
    document.getElementById("status").className = "enabled";
};
  
document.getElementById("disable").onclick = function() {
    disableScroll(window);
    document.body.style.overflow = "hidden";
    document.getElementById("status").innerHTML = "Disabled";
    document.getElementById("status").className = "disabled";
};


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  
function preventDefault(e) {
    e.stopPropagation();
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    e.stopPropagation();
    e.preventDefault();
    if (keys[e.keyCode]) {
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function() {supportsPassive = true;}
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
} catch (e) {}

var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : //     Modern browsers support "wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
          "DOMMouseScroll";

// call this to Disable
function disableScroll(element) {
    element.addEventListener('scroll', preventDefault, false); // older FF
    element.addEventListener(wheelEvent, preventDefault, supportsPassive ? { passive: false } : false); // modern desktop
    element.addEventListener('touchmove', preventDefault, supportsPassive ? { passive: false } : false); // mobile
    element.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll(element) {
    element.removeEventListener('scroll', preventDefault, false); // older FF
    element.removeEventListener(wheelEvent, preventDefault, supportsPassive ? { passive: true } : false);  // modern desktop
    element.removeEventListener('touchmove', preventDefault, supportsPassive ? { passive: true } : false); // mobile
    element.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}