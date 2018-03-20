var order = [];
var rootNode = document.getElementById("container");
var curNode;
var dfs = document.getElementById("dfs");
var bfs = document.getElementById("bfs");
var bfs_ser = document.getElementById("bfs_ser");
var dfs_ser = document.getElementById("dfs_ser");
var ser_txt = document.getElementById("ser_txt");
var node_txt = document.getElementById("node_txt");
var focus;

//深度优先遍历
function DFS(node) {
    order = [];
    (function recurse(currentNode) {
        order.push(currentNode);
        for (var i = 0, len = currentNode.children.length; i < len; i++) {
            recurse(currentNode.children[i]);
        }
    })(node);
}

//广度优先遍历
function BFS(node) {
    order = [];
    var arr = [];
    arr.push(node);
    // shift()从数组删除第一个元素，并返回其值
    var currentNode = arr.shift();
    while (currentNode) {
        for (var i = 0, len = currentNode.children.length; i < len; i++) {
            arr.push(currentNode.children[i]);
        }
        order.push(currentNode);
        currentNode = arr.shift();
    }
}

//获取搜索框中的值
function getValue(a) {
    var value = document.getElementById(a).value;
    if (focus == 1) {
        if (!value) {
            alert("请输入节点值和要插入的节点位置");
            return;
        } else {
            return value;
        }
    } else {
        if (!value) {
            alert("请输入节点值");
            return;
        } else {
            return value;
        }
    }
}

function showTrav(arr, value) {
    var i = 0, tag = false, alertTag = false;
    var timer = setInterval(function () {
        if (i > arr.length - 1) {
            if (tag) {
                arr[arr.length - 1].style.background = "red";
            } else {
                arr[arr.length - 1].style.background = "#fff";
            }
            clearInterval(timer);
            if (!alertTag && value) {
                alert("没有找到搜索的值！");
            }
        } else {
            if (i > 0) {
                if (tag) {
                    arr[i - 1].style.background = "red";
                    tag = false;
                } else {
                    arr[i - 1].style.background = "#fff";
                }
            }
            if (arr[i].getAttribute("data") == value) {
                tag = true;
                alertTag = true;
            }
            arr[i].style.background = "orange";
        }
        i++;
    }, 500);
}

//初始化背景颜色
function clearColor(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.background = "#fff";
    }
}

dfs.onclick = function () {
    DFS(rootNode);
    showTrav(order);
}

bfs.onclick = function () {
    BFS(rootNode);
    showTrav(order);
}

dfs_ser.onclick = function () {
    DFS(rootNode);
    var value = getValue("ser_txt");
    if (value) {
        showTrav(order, value);
    }
}

bfs_ser.onclick = function () {
    BFS(rootNode);
    var value = getValue("ser_txt");
    if (value) {
        showTrav(order, value);
    }
}

rootNode.addEventListener("click", function (event) {
    if (event.target) {
        clearColor(order);
        event.target.style.background = "red";
        curNode = event.target;
    }
});

del_node.addEventListener("click", function () {
    if (curNode) {
        curNode.parentNode.removeChild(curNode);
        curNode = "";
    }
});

add_node.addEventListener("click", function () {
    focus = 1;
    var val = getValue("node_txt");
    if (curNode && val) {
        var ele = document.createElement("div");
        ele.innerHTML = val;
        ele.setAttribute("data", val);
        ele.setAttribute("id", val);
        curNode.appendChild(ele);
        DFS(rootNode);//更新order数组
    }
    focus = 0;
});

re_color.addEventListener("click", function () {
    clearColor(order);
    curNode = "";
});

node_txt.onfocus = function () {
    this.value = "";
}
node_txt.onfocus = function () {
    this.value = "";
}

window.onload = DFS(rootNode);//初始化order数组