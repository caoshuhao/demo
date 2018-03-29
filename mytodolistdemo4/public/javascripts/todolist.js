define(['./jquery', './count', './show', './move'], function($, count, show) {
    // require(['./move']);
    $(function() {
        var num = 0

        function guid() {
            return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        $('.addlist').on("click", function() {
            //console.time('addData')
            var old = localStorage.getItem("myplan");
            old = old ? JSON.parse(old) : []
            for (var i = 0; i < 1000; i++) {
                if (old.length <= 0) {
                    var obj = {};
                    obj.content = num++;
                    obj.done = false;
                    obj.listatus = false;
                    obj.id = guid();
                    old.push(obj);
                } else {
                    old.push({
                        "content": num++,
                        "done": false,
                        "listatus": false,
                        "id": guid(),
                    });
                }
            }
            localStorage.setItem("myplan", JSON.stringify(old));
            //console.timeEnd('addData')
            show.showplans();
            count.count();

        })

        function safeStr(str) {
            return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }
        $("body").on("keydown", "#todoinput", function(e) {

            if (e.keyCode == 13) {
                var content = $('#todoinput').val();
                content = safeStr(content);
                if (content.length > 0) {
                    var old = localStorage.getItem("myplan");
                    old = old ? JSON.parse(old) : [];
                    if (old.length <= 0) {
                        var obj = {};
                        obj.content = content;
                        obj.done = false;
                        obj.listatus = false;
                        obj.id = guid();
                        old.push(obj);
                    } else {
                        old.push({
                            "content": content,
                            "done": false,
                            "listatus": false,
                            "id": guid(),
                        });
                    }
                    localStorage.setItem("myplan", JSON.stringify(old));
                    show.showplan();
                    count.count();
                } else {
                    alert("请输入数据");
                }
                $('#todoinput').val("");
            }

        })

        $('body').on('click', ".list ul li", function() {
            var key = $(this).prop('id');
            var data = localStorage.getItem("myplan");
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == key) {
                    if (data[i].listatus == false) {
                        data[i].listatus = true;
                        //$(this).prop('class', 'liborder');
                        $(this).addClass('liborder');
                    } else {
                        data[i].listatus = false;
                        //$(this).prop('class', 'liborder2');
                        $(this).removeClass('liborder');
                    }
                }
            }
            localStorage.setItem("myplan", JSON.stringify(data));
        })

        $('body').on('click', ".list ul li input", function(e) {
            e.stopPropagation();
        })

        $("body .todolist .list #ullist").on("click", "li input", function() {
                // 点击未完成计划列表input
                if ($(this).prop("checked") == true) {
                    var key = $(this).parent().parent().prop("id");
                    $("#" + key).fadeOut(function() {
                        $("#" + key).remove();
                    })
                    var data = localStorage.getItem("myplan");
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == key) {
                            data[i].done = true;
                            //console.log(data[i].listatus)
                            $('<li id=' + data[i].id + '><span><span></span><input type="checkbox"  style="zoom:200%" checked="checked"/><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list2>ul"));
                            var datatem = data[i];
                            data.splice(i, 1);
                            data.push(datatem);
                            localStorage.setItem("myplan", JSON.stringify(data));
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
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == key) {
                            data[i].done = false;
                            $('<li id=' + data[i].id + '  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)" ><span><span></span><input type="checkbox" style="zoom:200%" /><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list1>ul"));
                            //$("#" + data[i].id).find("*");
                            var datatem = data[i];
                            // console.log(datatem)
                            data.splice(i, 1);
                            data.push(datatem);
                            localStorage.setItem("myplan", JSON.stringify(data));
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
            for (var i = 0; i < data.length; i++) {
                if (key == data[i].id) {
                    index = i;
                    data.splice(index, 1);
                }
            }
            localStorage.setItem("myplan", JSON.stringify(data));
            count.count();
            return false;
        })
        count.count();
        show.showallplan();
    })



})