function allowDrop(ev) {
    ev.preventDefault();
}

var srcdiv = null;
var k1 = null;
var k2 = null;

function drag(ev, divdom) {
    srcdiv = divdom;
    ev.dataTransfer.setData("text/html", divdom.innerHTML);
    k1 = ev.target.id;
}

function drop(ev, divdom) {
    ev.preventDefault();
    if (srcdiv != divdom) {
        k2 = ev.target.id;
        srcdiv.id = k2;
        divdom.id = k1;
        srcdiv.innerHTML = divdom.innerHTML;
        divdom.innerHTML = ev.dataTransfer.getData("text/html");

        var len1 = len2 = 0;
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        for (i = 0, j = 0; i < data.length, j < data.length; i++, j++) {

            if (data[i].id == k1) {
                len1 = i;
            } else if (data[j].id == k2) {
                len2 = j;
            }
        }
        var tem = data[len1];
        data[len1] = data[len2];
        data[len2] = tem;

        var str = JSON.stringify(data);
        localStorage.setItem("myplan", str);
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);

    }
}