$(document).on('turbolinks:load', function(){
  function buildHTML(message){
      var content = message.content ? `${message.content}` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-id= ${message.id}>
          <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="upper-message__date">
            ${message.created_at} 
          </div>
        </div> 
        <div class="lower-message">
          <p class="lower-message__content">
          ${content}
          </p> 
          ${img}   
        </div> 
      </div>`
    return html;
    };

    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var message = new FormData(this);
        var url = (window.location.href);
        $.ajax({
        url: url,
        type: 'POST',
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
        })
        .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__submit').prop('disabled', false);　
        $("#new_message")[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
        });  
      })


        var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
    last_message_id = $(".message:last").data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = "";
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $(".messages").append(insertHTML);
        $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight},"fast");
      })
    })
    .fail(function() {
      alert('error');
      });
    }
   };
   setInterval(reloadMessages, 5000);
});