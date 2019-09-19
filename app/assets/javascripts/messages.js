$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message) {
        var content = message.content ? `${ message.content }` : "";
        var img = message.image ? `<img src= ${ message.image }>` : "";
        var html = `<div class="message data-id="${message.id}">
                      <div class="upper-message">
                        <p class="upper-message__user-name">
                          ${message.user_name}
                        </p>
                        <p class="upper-message__date">
                          ${message.date}
                        </p>
                      </div>
                      <p class="lower-message__content">
                        ${content}
                        <p>
                        ${img}
                        </p>
                      </p>
                    </div>`
    return html;
    }
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
    })
});