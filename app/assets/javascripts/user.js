$(function(){
    

    var search_list = $("#user-search-result");
    var member_list = $("#chat-group-users");


    function appendUser(user){
        
        var html = 
                    `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                    </div>`;
                    search_list.append(html);
                    
    }

    function appendNotUser(message){
        var html =  `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${message}</p>
                    </div>`
                    search_list.append(html);
    }

    function addUser(name,user_id) {
        var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix ' id='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                    </div>`
                    member_list.append(html);
    }

    

    $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();
        

        $.ajax({
            type: 'GET',                
            url:  '/users',           
            data: { keyword: input},    
            dataType: 'json'            
        })

        .done(function(users){             
            $('#user-search-result').empty();
            if (input.length !== 0) {            
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

        $(function(){
         $(document).on("click",".user-search-add",function () {
          var user_id = $(this).data('user-id');
          var name = $(this).data('user-name');
          $(this).parent().remove();
          addUser(name,user_id);
          });
        
         $(document).on("click",".user-search-remove",function(){
           $(this).parent().remove();
            })
        });
  });
});
