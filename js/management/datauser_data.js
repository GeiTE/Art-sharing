$(function(){
    var showdata = {};
    var search_type = "datauser_data";
    $.ajax({
        type: "post",
        url: "../php/management_data.php",
        data: {'search_type':search_type},
        dataType: 'json',
        async: false, //默认是true：异步，false：同步。
        success: function (data) {
            //var userdata = JSON.parse(data);
            if(data['user_auth'] == "null"){
                console.log(1);
                $(".table-responsive").append(`
                    <div class="text-center my-5">无作品数据</div>
                `);
            }
            console.log(data);
            showdata = data;
            userdata_show(data);
        },
        error: function (data) {
            console.log(data);
        }
    });

    function userdata_show(data){
        $("#user-number").text(data.length);
        for(var i=0;i<data.length;i++){
            var id = i;
            id++;
            $("#showdata_view").append(`
                <tr>
                    <td><input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"></td>
                    <td class="id">`+id+`</td>
                    <td>`+data[i].user_name+`</td>
                    <td>`+data[i].user_email+`</td>
                    <td><span style="max-width: 300px;">`+data[i].user_introduce+`</span><a href="" class="ms-3">显示全部</a></td>
                    <td>
                        <span class=" me-2"><a class="preview" href="javascript:void(0);">预览</a></span>
                        <span class="border-end me-2"></span>
                        <span class=" me-2"><a class="delete-user" href="javascript:void(0);">删除</a></span>
                    </td>
                </tr>
            `);
        }
    }
    //预览用户头像和详细信息，同时包括其提交的作品
    $(".preview").on("click",function(){
        var id =  $(this).parent().parent('td').siblings(".id").text();
        id--;   //序号减一。
        works_data =  showdata[id]; //该序号的作品数据
        
        $("#user-head-portrait").css("background-image","url(../images/user_head_portrait/"+works_data['user_head_portrait']+")");
        $("#user-name").text(works_data['user_name']);
        $("#user-email").html(`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope me-2" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
        </svg>
        `+ works_data['user_email']
        );
        if(works_data['user_address'] != "" && works_data['user_address'] != null){
            $("#user-name").after(`
            <p id="user-address" class="text-black-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt me-2" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            `+works_data['user_address']+`</p>
            `);
        }
        if(works_data['user_introduce'] != "" && works_data['user_introduce'] != null){
            $("#user-name").after(`
            <p id="user-introduce" class="mb-3 text-break">`+works_data['user_introduce']+`</p>
            `);
        }
        if(works_data['user_label'] !="" && works_data['user_label'] != null){
            var arr = works_data['user_label'].split("/");
            var arrlen = arr.length;
            //user_label 为数组数据，将每个标签遍历出来。
            for(var i=0;i<arrlen;i++){
                $("#user-label").append(`
                <button class="btn btn-sm">`+arr[i]+`</button>
                `);
            }
        }else{
            $("#user-label").html(`
                <p class="fw-light">无标签</p>
            `);
        }
        $("#exampleModal2").modal('show');
    });
    $(".btn-close").on("click",function(){
        $("#user-label").text("");
        $("#user-introduce").remove();
        $("#user-address").remove();
    });
    //删除用户信息，同时联动删除用户提交作品数据、发表的评论
    $(".delete-user").on("click",function(){
        var search_type = "delete_user";
        var id =  $(this).parent().parent('td').siblings(".id").text();
        id--;   //序号减一。
        works_data =  showdata[id]; //该序号的作品数据
        var delete_user_email = works_data['user_email'];
        console.log(delete_user_email);
        $.ajax({
            type: "post",
            url: "../php/management_data.php",
            data: {'search_type':search_type,'delete_user_email':delete_user_email},
            dataType: 'json',
            async: false, //默认是true：异步，false：同步。
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    })
})