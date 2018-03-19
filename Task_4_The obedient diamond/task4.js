var robot = document.getElementById("machine_box");
var cmd_btn = document.getElementById("comand_button");
var deg = 0;
var face = 0;
var xPos = 300;
var yPos = 300;

(function createBox() {
    var table = document.getElementById("table");
    var tr_arr = [];
    for (var i = 0; i < 11; i++) {
        tr_arr[i] = document.createElement("tr");
        for (var j = 0; j < 11; j++) {
            var td_arr = [];
            td_arr[j] = document.createElement("td");

            if (i == 0) {
                td_arr[j].setAttribute("class", "clear_border");
                if (j > 0) {
                    td_arr[j].innerHTML = j;
                }
            }
            if (j == 0) {
                td_arr[0].setAttribute("class", "clear_border");
                if (i > 0) {
                    td_arr[0].innerHTML = i;
                }
            }
            tr_arr[i].appendChild(td_arr[j]);
        }
        table.appendChild(tr_arr[i]);
    }
    robot.style.left = xPos + "px";
    robot.style.top = yPos + "px";
}
)();
var root = {
    xPos: function () {
        xPos += "px"
        return robot.style.top
    },
    yPos: function () {
        yPos += "px"
        return robot.style.left
    },
    face: function () {
        face = face % 4;
        if (face == 0) {
            console.log(face, "朝上");
            return face;
        } else if (face == 1) {
            console.log(face, "朝左");
            return face;
        } else if (face == 2) {
            console.log(face, "朝下");
            return face;
        }
        else {
            console.log(face, "朝右");
            return face;
        }
    },
    go: function () {
        var comand_input = document.getElementById("comand_input");
        switch (comand_input.value) {
            case "Go":
                switch (face) {
                    case 0:
                        if (yPos > 50) {
                            yPos -= 50;
                            robot.style.top = yPos + "px";
                        }
                        break;
                    case 1:
                        if (xPos > 50) {
                            xPos -= 50;
                            robot.style.left = xPos + "px";
                        }
                        break;
                    case 2:
                        if (yPos < 500) {
                            yPos += 50;
                            robot.style.top = yPos + "px";
                        }
                        break;
                    default:
                        if (xPos < 500) {
                            xPos += 50;
                            robot.style.left = xPos + "px";
                        }
                        break;
                }
                break;
            case "Turn Left":
                root.turnLeft();
                break;
            case "Turn Right":
                root.turnRight();
                break;
            case "Turn Back":
                root.turnBack();
        }
    },
    turnLeft: function () {
        face = face % 4;
        deg -= 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face++;
        root.face();
    },
    turnRight: function () {
        face = face % 4;
        deg += 90;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 3;
        root.face();
    },
    turnBack: function () {
        deg += 180;
        robot.style.transform = "rotate(" + deg + "deg)";
        face += 2;
        root.face();
    }
}
cmd_btn.addEventListener("click", root.go, false)