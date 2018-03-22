define(['jquery', 'count', 'show'], function($, count, show) {
    require(['move']);

    $(function() {

        function guid() {
            return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        $("body").on("keydown", "#todoinput", function(e) {

            if (e.keyCode == 13) {
                var content = $('#todoinput').val();
                if (content.length > 0) {
                    var old = localStorage.getItem("myplan");
                    if (!old) {
                        var obj = {};
                        obj.content = content;
                        obj.done = false;
                        obj.id = guid();

                        var str = JSON.stringify(obj);
                        localStorage.setItem("myplan", '[' + str + ']');
                    } else {
                        var obj = JSON.parse(old);
                        obj.push({
                            "content": content,
                            "done": false,
                            "id": guid(),
                        });
                        var str = JSON.stringify(obj);
                        localStorage.setItem("myplan", str);
                    }
                    show.showplan();
                    count.count();
                } else {
                    alert("请输入数据");
                }
                $('#todoinput').val("")
            }

        })


        // 点击未完成计划列表input
        $("body .todolist .list #ullist").on("click", "li input", function() {
                if ($(this).prop("checked") == true) {
                    var key = $(this).parent().parent().prop("id");
                    $("#" + key).fadeOut(function() {
                        $("#" + key).remove();
                    })
                    var data = localStorage.getItem("myplan");
                    data = JSON.parse(data);
                    for (i = 0; i < data.length; i++) {
                        if (data[i].id == key) {
                            data[i].done = true;
                            var str = JSON.stringify(data);
                            localStorage.setItem("myplan", str);
                            var data = localStorage.getItem("myplan");
                            data = JSON.parse(data);
                            $('<li id=' + data[i].id + '><span><span></span><input type="checkbox"  style="zoom:200%" checked="checked"/><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list2>ul"));

                            var datatem = data[i];
                            data.splice(i, 1);
                            data.push(datatem);
                            var str = JSON.stringify(data);
                            localStorage.setItem("myplan", str);
                            count.count();
                            return;
                        }
                    }
                }

            })
            // 点击已完成列表input
        $("body .todolist .list #donelist").on("click", "li input", function() {
                if ($(this).prop("checked") == false) {
                    var key = $(this).parent().parent().prop("id");
                    $("#" + key).remove();
                    var data = localStorage.getItem("myplan");
                    data = JSON.parse(data);
                    for (i = 0; i < data.length; i++) {
                        if (data[i].id == key) {
                            data[i].done = false;
                            var str = JSON.stringify(data);
                            localStorage.setItem("myplan", str);
                            var data = localStorage.getItem("myplan");
                            data = JSON.parse(data);
                            $('<li id=' + data[i].id + '  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)" ><span><span></span><input type="checkbox" style="zoom:200%" /><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list1>ul"));
                            var datatem = data[i];
                            // console.log(datatem)
                            data.splice(i, 1);
                            data.push(datatem);
                            var str = JSON.stringify(data);
                            localStorage.setItem("myplan", str);
                            count.count();
                            return;
                        }
                    }
                }
            })
            // 点击删除按钮
        $("body").on("click", ".del", function() {
            var key = $(this).parent().prop("id");
            $("#" + key).fadeOut(function() {
                $("#" + key).remove();
            })
            var data = localStorage.getItem("myplan");
            data = JSON.parse(data);
            var index = 0;
            for (i = 0; i < data.length; i++) {
                if (key == data[i].id) {
                    index = i;
                    data.splice(index, 1);
                }
            }
            var str = JSON.stringify(data);
            localStorage.setItem("myplan", str);
            count.count();
            return false;
        })
        count.count();
        show.showallplan();
    })
})