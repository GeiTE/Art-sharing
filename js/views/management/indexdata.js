$(function(){
    var search_type = "index_data";
    $.ajax({
        type: "post",
        url: "../../php/management_data.php",
        data: {'search_type':search_type},
        dataType: 'json',
        async: true, //默认是true：异步，false：同步。
        success: function (data) {
            $("#user-number").text(data['user_number']);
            $("#works-number").text(data['works_number']);
        },
        error: function (data) {
            alert("网站出现错误，将刷新");
            window.location.reload();
        }
    });
})