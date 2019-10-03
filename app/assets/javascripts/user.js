$(document).on('turbolinks:load',function(){
    

    var search_list = $("#user-search-result");


    function appendUser(user){
        console.log(1);
        var html =  `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${user.name}</p>
                        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
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
       var html = `<div class='chat-group-user clearfix js-chat-member' id='${user.id}'>
                     <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                     <p class='chat-group-user__name'>${user.name}</p>
                     <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                   </div>`
        return html
    }

    

    $('#user-search-field').on('keyup', function(e){
        var input = $("#user-search-field").val();
        console.log(2);

        $.ajax({
            type: 'GET',                
            url:  '/users',           
            data: { keyword: input},    
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

        $(function(){
         $(document).on("click",".user-search-add",function () {
             console.log(4);
          var id = $(this).data('user-id');
          var name = $(this).data('user-name');
          var html =addUser(id,name)
          $(this).parent().remove();
          $("#chat-group-users");
          });
        
         $(document).on("click",".user-search-remove",function(){
           $(this).parent().remove();
            })
        });
  });
});
