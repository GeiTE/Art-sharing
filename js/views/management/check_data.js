$(function(){
    var showdata = {};
    var search_type = "check_data";
    $.ajax({
        type: "post",
        url: "../../php/management_data.php",
        data: {'search_type':search_type},
        dataType: 'json',
        async: false, //默认是true：异步，false：同步。
        success: function (data) {
            //var userdata = JSON.parse(data);
            if(data['user_auth'] == "null"){
                console.log(1);
                $(".table-responsive").append(`
                    <div class="text-center my-5">无待审核作品</div>
                `);
            }
            showdata = data;
            checkdata_show(data);
        },
        error: function (data) {
            alert("网站出现错误，将刷新");
            // window.location.reload();
        }
    });    
    function checkdata_show(data){
        $("#works_number").text(data.length);
        for(var i=0;i<data.length;i++){
            var id = i;
            id++;
            var works_label_array = JSON.parse(data[i].works_label);
            var works_label = "";
            for(var j in works_label_array){
                works_label = works_label+works_label_array[j]['content']+"、";
            }
            works_label = works_label.substring(0,works_label.length-1);

            var works_datails_array = JSON.parse(data[i].works_datails);
            var works_datails = "";
            for(var z in works_datails_array){
                works_datails = works_datails+works_datails_array[z]['content']+"、";
            }
            works_datails = works_datails.substring(0,works_datails.length-1);
            $("#showdata_view").append(`
                <tr>
                    <td><input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"></td>
                    <td class="id">`+id+`</td>
                    <td>`+data[i].works_name+`</td>
                    <td class="works-id">`+data[i].works_id+`</td>
                    <td>`+data[i].user_email+`</td>
                    <td>`+data[i].submitsion_time+`</td>
                    <td>
                        <span class=" me-2"><a class="preview" href="javascript:void(0);">预览</a></span>
                        <span class=" border-end me-2"></span>
                        <span class=" me-2"><a class="pass" href="javascript:void(0);">通过</a></span>
                        <span class="border-end me-2"></span>
                        <span class=" me-2"><a class="fail" href="javascript:void(0);">不通过</a></span>
                    </td>
                </tr>
            `);
        }
    }
    //预览
    $(".preview").on("click",function(){
        var id =  $(this).parent().parent('td').siblings(".id").text();
        id--;   //序号减一。
        works_data =  showdata[id]; //该序号的作品数据
        console.log(works_data);

        $("#preview-img").attr("src","../../images/reviewed_img/"+works_data['works_id']+"_small.jpg");
        $("#preview-workname").text(works_data['works_name']);
        //作品介绍判断输出
        if(works_data['works_introduce'] != ""){
            if($(".preview-jianjie").hasClass("d-none")){
                $(".preview-jianjie").removeClass("d-none");
            }
            if($(".preview-jianjie>span").text() != ""){
                $(".preview-jianjie>span").remove();
            }
            $(".preview-jianjie").append("<span>"+works_data['works_introduce']+"</span>");
        }else{
            $(".preview-jianjie").addClass("d-none");
        }
        //作品标签判断输出
        if(works_data['works_label'] != ""){
            if($(".preview-label").hasClass("d-none")){
                $(".preview-label").removeClass("d-none");
            }
            if($("#exampleModal2 .modal-body>.container>.row>#preview-label>button")){
                $("#exampleModal2 .modal-body>.container>.row>#preview-label>button").remove();
            }
            var works_label_array = JSON.parse(works_data['works_label']);
            //遍历标签对象中的数据
            for(var j in works_label_array){
                $("#exampleModal2 .modal-body>.container>.row>#preview-label").append(`
                    <button class="btn btn-outline-secondary me-2"><small>`+works_label_array[j]['content']+`</button>
                `);
            }
        }else{
                $(".preview-label").addClass("d-none");
        }

        //遍历输出详情数据
        if(works_data['works_datalis'] != ""){
            if($("#preview-datails").hasClass("d-none")){
                $("#preview-datails").removeClass("d-none");
            }
            if($("#exampleModal2 .modal-body>.container>.row>#preview-datails>span")){
                $("#exampleModal2 .modal-body>.container>.row>#preview-datails>span").remove();
            }
            var works_datails_array = JSON.parse(works_data['works_datails']);
            for(var p in works_datails_array){
                $("#exampleModal2 .modal-body>.container>.row>#preview-datails").append(`
                    <span class="me-2"><small>`+works_datails_array[p]['title']+`</small>:`+works_datails_array[p]['content']+`</span>
                `);
            }
        }else{
            $("#preview-datails").addClass("d-none");
        }

        //显示modal窗口
        $("#exampleModal2").modal('show');

    })
    $(".pass").on("click",function(){
        // console.log(1);
        //确定通过，将改数据传输给作品展示表，并从审核表中移除。
        var id =  $(this).parent().parent('td').siblings(".id").text();
        id--;   //序号减一。
        works_data =  showdata[id]; //该序号的作品数据
        var search_type = "works_pass";
        works_data['search_type'] = search_type;
        console.log(works_data);
        //将数据添加到作品数据表
        $.ajax({
            type: "post",
            url: "../../php/management_data.php",
            data: works_data,
            dataType: 'json',
            async: true, //默认是true：异步，false：同步。
            success: function (data) {
                //成功后删除审核作品数据表中的相应数据
                alert("通过成功");
                var search_type = "works_remove";
                var works_id = data;
                $.ajax({
                    type : "post",
                    url : "../../php/management_data.php",
                    data : {'search_type':search_type,'works_id':works_id},
                    dataType : "json",
                    async : true,
                    success : function(data){
                        if(data == 1){
                            window.location.reload();
                        }
                    },
                    error : function(data){
                        alert("网站出现错误，将刷新");
                    }
                })
            },
            error: function (data) {
                alert("网站出现错误，将刷新");
                window.location.reload();
            }
        });
    })
    $(".fail").on("click",function(){
        var works_id =  $(this).parent().parent('td').siblings(".works-id").text();
        var search_type = "check_data_delete";
        $.ajax({
            type: "post",
            url: "../../php/management_data.php",
            data: {'search_type':search_type,'works_id':works_id},
            dataType: 'json',
            async: true, //默认是true：异步，false：同步。
            success: function (data) {
                if(data == 1){
                    alert("已将该审核作品删除");
                    window.location.reload();
                }
            },
            error: function (data) {
                alert("网站出现错误，将刷新");
                // window.location.reload();
            }
        });
    })
})