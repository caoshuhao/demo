define(['jquery'], function($) {
    function count() {
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        var len1 = 0;
        var len2 = 0;
        for (i = 0; i < data.length; i++) {

            if (data[i].done == false) {
                len1 += 1;
            } else {
                len2 += 1;
            }
        }
        $(".ongoing .listtop span:nth-child(2)").text(len1);
        $(".done .listtop span:nth-child(2)").text(len2);
    }
    return {
        'count': count
    }
})