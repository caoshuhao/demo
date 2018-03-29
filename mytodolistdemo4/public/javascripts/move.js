define(function() {
    window.allowDrop = function(ev) {
        ev.preventDefault();
    }
    var srcdiv = null;
    var k1 = null;
    var k2 = null;

    window.drag = function(ev, divdom) {
        srcdiv = divdom;
        ev.dataTransfer.setData("text/html", divdom.innerHTML);
        k1 = divdom.id;
    }

    window.drop = function(ev, divdom) {
        ev.preventDefault();
        if (srcdiv != divdom) {
            k2 = divdom.id;
            srcdiv.id = k2;
            divdom.id = k1;
            srcdiv.innerHTML = divdom.innerHTML;
            divdom.innerHTML = ev.dataTransfer.getData("text/html");

            var len1 = 0;
            var len2 = 0;
            var data = localStorage.getItem("myplan");
            data = JSON.parse(data);
            for (var i = 0, j = 0; i < data.length, j < data.length; i++, j++) {

                if (data[i].id == k1) {
                    len1 = i;
                } else if (data[j].id == k2) {
                    len2 = j;
                }
            }
            var tem = data[len1];
            data[len1] = data[len2];
            data[len2] = tem;
            localStorage.setItem("myplan", JSON.stringify(data));

        }
        return {
            'allowDrop': allowDrop,
            'drag': drag,
            'drop': drop
        }
    }
})