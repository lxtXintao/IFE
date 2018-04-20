var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            // DOM2级方法
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            // IE方法
            element.attachEvent("on" + type, handler);
        } else {
            // DOM0级方法
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
}

function CreateTable(row, column) {
    this.row = row;
    this.column = column;

    this.create();
}

CreateTable.prototype = {
    constructor: CreateTable,

    //创建表格
    create: function () {
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        for (var i = 0; i < this.row; i++) {
            tbody.insertRow(i);
            for (var j = 0; j < this.column; j++) {
                tbody.rows[i].insertCell(j);
            }
        }
        table.appendChild(tbody);
        document.body.appendChild(table);
    },

    //添加头行内容
    addThead: function (theadArr) {
        if (Array.isArray(theadArr)) {
            var tbody = document.getElementsByTagName("tbody")[0];
            if (theadArr.length == this.column) {
                for (var i = 0; i < this.column; i++) {
                    tbody.rows[0].cells[i].innerHTML = theadArr[i];
                }
            } else {
                alert("标题个数与列数不相等");
            }
        } else {
            alert("表格标题的数据类型不符合要求");
        }
    },

    //填充单行数据
    addRow: function (data) {
        //限制当行数据填充多行
        var flag = false;
        if (Array.isArray(data)) {
            var tbody = document.getElementsByTagName("tbody")[0];
            if (data.length == this.column) {
                for (var i = 0; i < this.row; i++) {
                    if (tbody.rows[i].cells[0].childNodes.length == 0 && flag == false) {//????/???
                        for (var j = 0; j < data.length; j++) {
                            tbody.rows[i].cells[j].innerHTML = data[j];
                            if (j == data.length - 1) {
                                flag = true;
                            }
                        }
                    }
                }
            } else {
                alert("数据个数与列数不相等");
            }
        } else {
            alert("改行数据类型不符合要求");
        }
    },

    //一次添加所有数据
    addAllRows: function (allData) {
        if (Array.isArray(allData)) {
            var tbody = document.getElementsByTagName("tbody")[0];
            for (var i = 0; i < allData.length; i++) {
                for (var j = 0; j < this.column; j++) {
                    tbody.rows[i + 1].cells[j].innerHTML = allData[i][j];
                }
            }
        } else {
            alert("数据的类型不符合要求");
        }
    },

    //添加升序按钮
    addAscBtn: function () {
        var tbody = document.getElementsByTagName("tbody")[0];
        for (var i = 1; i < this.column; i++) {
            var ascBtn = document.createElement("div");
            ascBtn.setAttribute("class", "ascBtn");
            tbody.rows[0].cells[i].style.position = "relative";
            tbody.rows[0].cells[i].appendChild(ascBtn);
        }
    },

    //添加降序按钮
    addDescBtn: function () {
        var tbody = document.getElementsByTagName("tbody")[0];
        for (var i = 1; i < this.column; i++) {
            var descBtn = document.createElement("div");
            descBtn.setAttribute("class", "descBtn");
            tbody.rows[0].cells[i].style.position = "relative";
            tbody.rows[0].cells[i].appendChild(descBtn);
        }
    },

    //排序函数
    addOrder: function (index, flag) {
        //flag为true是升序，为false是降序
        var flag = flag;
        //第一列不是数据，不进行比较
        var num = index + 1;
        //存放初始状态的数据
        var oldData = [];
        //存放排序后的数据
        var newData = [];
        var tbody = document.getElementsByTagName("tbody")[0];
        if (num < this.column) {
            var tempData = [];
            for (var i = 1; i < this.row; i++) {
                //cells[num]返回cells[num]下的所有节点，包括文本节点和元素节点,cells[num].firstChild返回
                //的是文本元素，要取得其值要用nodeValue，等价于这两种写法：
                //console.log(document.getElementById("myTable").rows[0].cells[0].childNodes[0].nodeValue);
                //console.log(document.getElementById("myTable").rows[0].cells[0].innerText);innerText只取得文本元素的文本内容
                tempData.push(tbody.rows[i].cells[num].firstChild.nodeValue);
                //oldData是引用类型的值，指向一个对象的指针指针，传递值时是更改堆内存中同一对象，而不是创建一个副本
                //所以无法将tempData直接赋值给oldData
                // oldData = tempData;
                oldData.push(tbody.rows[i].cells[num].firstChild.nodeValue);
            }
        }
        //默认为升序排列
        newData = tempData.sort(function (a, b) {
            return a - b;
        });
        //降序排列
        if (flag != true) {
            newData = newData.reverse();
        }
        changeOrder(newData, oldData);
        //改变排序函数
        function changeOrder(newData, oldData) {
            var oldPos, newPos, temp, tempContent;
            var tbody = document.getElementsByTagName("tbody")[0];
            //比较同一个值在两个数组中的位置，若不相同则进行换位
            for (var i = 0; i < newData.length; i++) {
                newPos = i;
                oldPos = oldData.indexOf(newData[i]);
                if (newPos != oldPos) {
                    tempContent = tbody.rows[oldPos + 1].innerHTML;
                    // console.log(tempContent);
                    // alert(tempContent);
                    tbody.rows[oldPos + 1].innerHTML = tbody.rows[newPos + 1].innerHTML;
                    tbody.rows[newPos + 1].innerHTML = tempContent;
                    temp = oldData[oldPos];
                    oldData[oldPos] = oldData[newPos];
                    oldData[newPos] = temp;
                    // console.log(oldData);
                }
            }
        }
    }
}

var table = new CreateTable(4, 5);
var theadArr = ["姓名", "语文", "数学", "英语", "总分"];
table.addThead(theadArr);

var data = [["小明", 80, 90, 70, 240], ["小红", 90, 60, 90, 240], ["小亮", 60, 100, 70, 230]];
table.addAllRows(data);
table.addAscBtn();
table.addDescBtn();

var ascBtn = document.getElementsByTagName("tbody")[0].getElementsByClassName("ascBtn");
var descBtn = document.getElementsByTagName("tbody")[0].getElementsByClassName("descBtn");
for (var index = 0; index < 4; index++) {
    (function (index) {
        EventUtil.addHandler(ascBtn[index], "click", function () {
            table.addOrder(index, true);
        });
        EventUtil.addHandler(descBtn[index], "click", function () {
            table.addOrder(index, false);
        });
    })(index);
}