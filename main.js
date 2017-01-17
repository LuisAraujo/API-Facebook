//páginas
var idPaginas = [592202380964866, 610980372398743];
//post
var post = new Object();
post.msg = "Novo vídeo, como prometi: Crie o seu próprio J.A.R.V.I.S. Aprenda a criar seu assistente em apenas alguns passos. #voice #jarvis #js #coding \n";
post.msg += " https://www.youtube.com/watch?v=tyIaL9xwhMo&feature=share  \n";
post. msg += " *código no github (descrição do vídeo)";

post.link = "https://www.youtube.com/watch?v=tyIaL9xwhMo&feature=share";
post.type ="video";
var fb;
window.fbAsyncInit = function() {
    FB.init({
        appId      : '217836308624341',
        xfbml      : true,
        version    : 'v2.8'
    });

    FB.AppEvents.logPageView();
};


(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function getData(){
    console.log("geting data")
    FB.login(function(){
        FB.api(
            "/592202380964866_1250189535075858/likes",
            function (response) {
                if (response && !response.error) {
                    console.log(response);
                }else{
                    console.log("Erro")
                }
            });
    });
}
function login(){

    var text_post = document.getElementById("text-post").value;
    var link_post = document.getElementById("link-post").value;
    var type_post = document.getElementById("type-post")
    var type_post_selected = type_post.options[type_post.selectedIndex].value;
    //console.log(type_post_selected)
    if((text_post == "") && (link_post=="") && (type_post_selected== "")){
        return;
    }



    FB.login(function(){

        for(var i = 0; i < idPaginas.length; i++){

            FB.api(
                "/"+idPaginas[i]+"/feed",
                "POST",
                {
                    "message": text_post,
                    "type": type_post,
                    "link": link_post

                },
                function (response) {
                    if (response && !response.error) {

                        if( $("#table-post").css("display") == "none"){
                            $("#table-post").css("display","block");
                            $("#box-post").css("display","none");
                            $("#bt-novo-post").css("display","block");
                        }

                        var div = '<div class="table-line ';

                        if(($(".table-line").length-1)%2 == 0)
                            div += 'table-line-b">';
                        else
                            div += 'table-line-c">';

                        div +=   '<span  class="line-post">Post 0'+($(".table-line").length-1)+'</span>';
                        div +=   '<span   class="line-idpost" >'+response.id+'</span>';
                        div +=   '<span class="line-status">Postado</span></div>'

                        console.log(response)

                        $("#table-post").append(div);

                    }else{

                        if( $("#table-post").css("display") == "none"){
                            $("#table-post").css("display","block");
                            $("#box-post").css("display","none");
                            $("#bt-novo-post").css("display","block");
                        }

                        var div = '<div class="table-line ';
                        if(($(".table-line").length-1)%2 == 0)
                            div += 'table-line-b">';
                        else
                            div += 'table-line-c">';

                        div +=   '<span  class="line-post">Post 0'+($(".table-line").length-1)+'</span>';
                        div +=   '<span   class="line-idpost" >???</span>';
                        div +=   '<span class="line-status">Recusado</span></div>'

                        $("#table-post").append(div);
                    }
                });

        }
    }, {scope: 'publish_actions'});
}

