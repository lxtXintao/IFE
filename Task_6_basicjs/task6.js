var left_in = document.getElementById("left_in");
var right_in = document.getElementById("right_in");
var left_out = document.getElementById("left_out");
var right_out = document.getElementById("right_out");
var content = document.getElementById("1");//次方法返回的是数组
var field = document.getElementById("field");
var search_text = document.getElementById("search_text");
var search = document.getElementById("search");

left_in.addEventListener("click", function () {
    // var regu = "^[ ]+$";
    // var re = (new RegExp(regu)).test;
    if (content.value == "") {
        alert("请输入内容！");
    }
    else {
        var array = content.value.toString().split(/[,_，;；. 。、\u0020]/);
        for (var i = 0; i < array.length; i++) {
            var span = document.createElement("span");
            span.className = "number";
            field.insertBefore(span, field.children[i]);
            span.innerHTML = array[i];
        }

    }
}
);
right_in.addEventListener("click", function () {
    if (content.value == "") {
        alert("请输入内容！");
    }
    else {
        // while(content.value.toString().indexOf(" ")>=0){
        // var o = content.value.toString().replace("","");}
        // var o = content.value.toString().split(/[,_，;；. 。、\u0020]/).join("");
        // var array = content.value.toString().split(/[,_，;；. 。、\u0020]/);
    var array = content.value.toString().split(/[,]*/);
        for (var i = 0; i < array.length; i++) {
            var span = document.createElement("span");
            span.className = "number";
            field.insertBefore(span, field.children[field.children.length]);
            span.innerHTML = array[i];
            //alert(field.children[0].value);//先执行alert
        }

    }
});
left_out.addEventListener("click", function () {
    if (field.children.length == 0) {
        alert("队列已经为空！");
    } else {
        if (confirm("要删除" + field.children[0].innerHTML + "吗？")) {
            (field.children[0]).remove();
        }

    }
});
right_out.addEventListener("click", function () {
    if (field.children.length == 0) {
        alert("队列已经为空！");
    } else {
        if (confirm("要删除" + field.children[field.children.length - 1].innerHTML + "吗？")) {
            //不用childNodes,因其返回元素节点和文本节点
            (field.children[field.children.length - 1]).remove();
        }

    }
});
// for (var i = 0; i < field.children.length; i++) {
//     field.children[i].addEventListener("click", function () {
//         if (event.target.nodeName.toLowerCase() == "span") {
//             field.removeChild(event.target);
//         }
//     })
// }//field.children.length大小不随时改变？？？？
field.addEventListener("click",function(){
    if (event.target.nodeName.toLowerCase() == "span") {
                    field.removeChild(event.target);
                }
})

search.addEventListener("click", function () {
    // search.onclick = function (e) {
    // e.preventDefault();
    if (search_text.value == "") {
        alert("请输入查询内容！");
    } else {
        var len = search_text.value.length;
        var a = field.children.length;
        for (var i = 0; i < a; i++) {
            field.children[i].className = "number";
            if (len > field.children[i].innerHTML.length) {
                continue;
            }
            else if (len == field.children[i].innerHTML.length) {
                if (search_text.value == field.children[i].innerHTML) {
                    field.children[i].className = "selected";
                    continue;
                } else {
                    continue;
                }
            }
            else {
                var num = field.children[i].innerHTML.length - len + 1;
                for (var j = 0; j < num; j++) {
                    if (search_text.value == field.children[i].innerHTML.slice(j, len + j)) {
                        field.children[i].className = "selected";
                        break;
                    } else {
                        continue;
                    }
                }
            }
        }
    }
    // }
})