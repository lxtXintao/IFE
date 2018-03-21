var table = document.getElementById("table");
var robot = document.getElementById("table_box");
var act = document.getElementById("act");
var select = document.getElementById("select");
var xPos = 300;
var yPos = 300;
var face = 0;
var angle = 0;

(function createTable() {
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");
            if (i == 0) {
                // td_arr[j].className = "noborder";此种写法也可
                td_arr[j].setAttribute("class", "noborder");
                if (j > 0) {
                    td_arr[j].innerHTML = j;
                }
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "noborder");
                if (i > 0) {
                    td_arr[j].innerHTML = i;
                }
            }
            tr_arr[i].appendChild(td_arr[j]);
        }
        table.appendChild(tr_arr[i]);
    }
    // offsetLeft只读，不可对其赋值
    robot.style.left = xPos + "px";
    robot.style.top = yPos + "px";
})();

var root = {
    face: function () {
        face = face % 4;
        return face;
    },
    go: function () {
        switch (select.value) {
            case "TRA LEF":
                root.TRA_LEF();
                break;
            case "TRA TOP":
                root.TRA_TOP();
                break;
            case "TRA RIG":
                root.TRA_RIG();
                break;
            case "TRA BOT":
                root.TRA_BOT();
                break;
            case "MOV LEF":
                root.MOV_LEF();
                break;
            case "MOV RIG":
                root.MOV_RIG();
                break;
            case "MOV TOP":
                root.MOV_TOP();
                break;
            case "MOV BOT":
                root.MOV_BOT();
                break;
        }
    },
    TUN_LEF: function () {
        face = face % 4;
        face++;
        angle -= 90;
        robot.style.transform = "rotate(" + angle + "deg)";
        root.face();
    },
    TUN_RIG: function () {
        face = face % 4;
        face += 3;
        angle += 90;
        robot.style.transform = "rotate(" + angle + "deg)";
        root.face();
    },
    TUN_BAC: function () {
        face = face % 4;
        face += 2;
        angle += 180;
        robot.style.transform = "rotate(" + angle + "deg)";
        root.face();
    },

    TRA_LEF: function () {
        if (xPos > 50) {
            xPos -= 50;
            robot.style.left = xPos + "px";
        }
    },
    TRA_TOP: function () {
        if (yPos > 50) {
            yPos -= 50;
            robot.style.top = yPos + "px";
        }
    },
    TRA_RIG: function () {
        if (xPos < 500) {
            xPos += 50;
            robot.style.left = xPos + "px";
        }
    },
    TRA_BOT: function () {
        if (yPos < 500) {
            yPos += 50;
            robot.style.top = yPos + "px";
        }
    },
    MOV_LEF: function () {
        face = face % 4;
        // console.log(face);
        switch (face) {
            case 0:
                root.TUN_LEF();
                root.TRA_LEF();
                break;
            case 1:
                root.TRA_LEF();
                break;
            case 2:
                root.TUN_RIG();
                root.TRA_LEF();
                break;
            case 3:
                root.TUN_BAC();
                root.TRA_LEF();
                break;
        }
    },
    MOV_RIG: function () {
        face = face % 4;
        switch (face) {
            case 0:
                root.TUN_RIG();
                root.TRA_RIG();
                break;
            case 1:
                root.TUN_BAC();
                root.TRA_RIG();
                break;
            case 2:
                root.TUN_LEF();
                root.TRA_RIG();
                break;
            case 3:
                root.TRA_RIG();
                break;
        }
    },
    MOV_BOT: function () {
        face = face % 4;
        switch (face) {
            case 0:
                root.TUN_BAC();
                root.TRA_BOT();
                break;
            case 1:
                root.TUN_LEF();
                root.TRA_BOT();
                break;
            case 2:
                root.TRA_BOT();
                break;
            case 3:
                root.TUN_RIG();
                root.TRA_BOT();
                break;
        }
    },


    MOV_TOP: function () {
        face = face % 4;
        switch (face) {
            case 0:
                // console.log(face === 0);返回true,但 face === "0" 就是false（face是number类型）
                // 所以应该是case 0: ，而不是case "0"。
                root.TRA_TOP();
                break;
            case 1:
                root.TUN_RIG();
                root.TRA_TOP();
                break;
            case 2:
                root.TUN_BAC();
                root.TRA_TOP();
                break;
            case 3:
                root.TUN_LEF();
                root.TRA_TOP();
                break;
        }

    }

    // MOV_TOP: function () {
    //     if (face != 0) {
    //         var little = setInterval(function () {
    //             root.TUN_LEF();
    //             if (face == 0) {
    //                 clearInterval(little);
    //             }
    //         }, 50);
    //         setTimeout("root.TRA_TOP()", 1000);
    //     } else {
    //         setTimeout("root.TRA_TOP()", 100);
    //     }
    // }
}

act.addEventListener("click", root.go, false)

