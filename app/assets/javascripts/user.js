$(document).on('turbolinks:load',function(){
    

    var search_list = $("#user-search-result");


    function appendUser(user){
        
        var html =  `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
                    
    }

    function appendNotUser(message){
        var html =  `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${message}</p>
                    </div>`
                    search_list.append(html);
    }

    function addUser(name,id) {
       var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                     <input name='group[user_ids][]' type='hidden' value='${id}' class="js-user">
                     <p class='chat-group-user__name'>${name}</p>
                     <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                   </div>`
        return html
    }

    

    $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();
        
        
        var x = $(".js-user");
        var arr = [];
        x.each(function(i,ele){
            arr.push(ele.value);
        });
        

        
        $.ajax({
            type: 'GET',                
            url:  '/users',           
            data: { keyword: input, user_id: arr},    
            dataType: 'json'            
        })

        .done(function(users){          
            $('#user-search-result').empty();
            if (users.length !== 0) {            
                users.forEach(function(user){ 
                    appendUser(user)
                });
            }

            else {
                appendNotUser("一致するユーザーが見つかりません");

            }
        })
        .fail(function(){
            alert('ユーザー検索に失敗しました');
        })
  });

   
    $('#user-search-result').on("click",".user-search-add",function () {
        var name = $(this).data('user-name');
        var id = $(this).data('user-id');
       
        var html =addUser(name,id)
        $("#chat-group-users").append(html);
        
        $(this).parent().remove();
        
    });

    $("#chat-group-users").on("click",".user-search-remove",function(){
        
        $(this).parent().remove();
    });
    

});

