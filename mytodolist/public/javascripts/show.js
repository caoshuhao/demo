define(['jquery'], function() {
    require(['move']);

    function showplan() {
        data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        $('<li id=' + data[data.length - 1].id + ' ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>' + data[data.length - 1].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list1>ul"))
    }


    function showallplan() {

        var data = localStorage.getItem("myplan");

        data = JSON.parse(data);

        var txt = "";
        var txt2 = "";
        for (i = 0; i < data.length; i++) {
            if (data[i].done == false) {
                txt += '<li id=' + data[i].id + '  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>';
                txt += data[i].content;
                txt += '</span></span><span class="del">X</span></li>';
            } else {
                txt2 += '<li id=' + data[i].id + '><span><span></span><input type="checkbox" checked="checked" style="zoom:200%"/><span>';
                txt2 += data[i].content;
                txt2 += '</span></span><span class="del">X</span></li>';

            }
        }
        $(".list2 ul").html(txt2);
        $(".list1 ul").html(txt);

    }
    return {
        'showplan': showplan,
        'showallplan': showallplan
    }
})