var ser_txt = document.getElementById("ser_txt");
var dfs = document.getElementById("dfs");
var bfs = document.getElementById("bfs");
var dfs_ser = document.getElementById("dfs_ser");
var bfs_ser = document.getElementById("bfs_ser");
var root = document.getElementById("1");
var arr = [];
var timer = null;

window.onload = function () {
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addElementListener) {
                element.addElementListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    };


    //深度优先遍历
    function DFS(node) {
        if (node != null) {
            arr.push(node);
            var a = node.children.length;
            for (var i = 0; i < a; i++) {
                DFS(node.children[i]);
            }
        }
    }
    //广度优先遍历
    function BFS(node) {
        if (node != null) {
            arr.push(node);
            BFS(node.nextElementSibling);
            node = arr[index++];
            BFS(node.firstElementChild);
        }
    }

    function show(txt) {
        var i = 0;
        if (arr[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == txt) {
            arr[i].style.backgroundColor = "#00f";
        } else {
            arr[i].style.backgroundColor = "#f00";
            timer = setInterval(function () {
                i++;
                if (i < arr.length) {
                    arr[i - 1].style.backgroundColor = "#fff";
                    if (arr[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == txt) {
                        arr[i].style.backgroundColor = "#00f";
                        clearInterval(timer);
                    } else {
                        arr[i].style.backgroundColor = "#f00";
                    }
                } else {
                    clearInterval(timer);
                    arr[arr.length - 1].style.backgroundColor = "#fff";
                    if (txt != null) {
                        alert("未搜索到查找内容！");
                    }
                }
            }, 300);
        }
    }
    function initialize() {
        index = 0;
        arr = [];
        clearInterval(timer);
        var divList = document.getElementsByTagName("div");
        for (var i = 0; i < divList.length; i++) {
            divList[i].style.backgroundColor = "#fff";
        }
    }

    EventUtil.addHandler(dfs, "click", function () {
        initialize();
        DFS(root);
        show();
    });

    EventUtil.addHandler(bfs, "click", function () {
        initialize();
        BFS(root);
        show();
    });

    EventUtil.addHandler(dfs_ser, "click", function () {
        var txt = document.getElementById("ser_txt").value;
        initialize();
        DFS(root);
        if (txt != "") {
            show(txt);
        } else {
            alert("请输入要查询的字符！");
        }
    });

    EventUtil.addHandler(bfs_ser, "click", function () {
        var txt = document.getElementById("ser_txt").value;
        initialize();
        BFS(root);
        if (txt != "") {
            show(txt);
        } else {
            alert("请输入要查询的字符！");
        }
    });
}