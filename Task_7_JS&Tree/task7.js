var rootNode = document.getElementById("wrapper");
var layer1 = document.getElementById("layer1");
var layer2 = document.getElementById("layer2");
var layer3 = document.getElementById("layer3");
var dlr = document.getElementById("dlr");
var ldr = document.getElementById("ldr");
var lrd = document.getElementById("lrd");
var queue = [];
var isExecuted = false;

function preOrder(root) {
    queue.push(root);
    if (root.firstElementChild != null) {
        preOrder(root.firstElementChild);
    }
    if (root.lastElementChild != null) {
        preOrder(root.lastElementChild);
    }
}
function inOrder(root) {
    if (root.firstElementChild != null) {
        inOrder(root.firstElementChild);
    }
    queue.push(root);
    if (root.lastElementChild != null) {
        inOrder(root.lastElementChild);
    }
}
function postOrder(root) {
    if (root.firstElementChild != null) {
        postOrder(root.firstElementChild);
    }
    if (root.lastElementChild != null) {
        postOrder(root.lastElementChild);
    }
    queue.push(root);
}
function render() {
    if (isExecuted) {
        alert("Being executed!");
        return;
    }
    isExecuted = true;
    var i = 0;
    queue[i].style.backgroundColor = "red";
    // queue[i].className = "show";
    var showCol = setInterval(function () {
        i++;
        if (i >= queue.length) {
            clearInterval(showCol);
            queue[queue.length - 1].style.backgroundColor = "white";
            // queue[queue.length - 1].className = "show";
            isExecuted = false;
            return;
        }
        queue[i - 1].style.backgroundColor = "white";
        queue[i].style.backgroundColor = "red";
        // queue[i - 1].className = "notshow";
        // queue[i].className = "show";
    }, 200);

}
dlr.addEventListener("click", function () {
    preOrder(rootNode);
    render();
})
ldr.addEventListener("click", function () {
    inOrder(rootNode);
    render();
})
lrd.addEventListener("click", function () {
    postOrder(rootNode);
    render();
})