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

function novoPost(){

    tags = ["FrontEnd", "BackEnd","Python"];

    for(var i=0; i< tags.length; i++){
        if(i < parseInt(tags.length/2) ){
            $("#cont-inp-02").append("<input type='checkbox'  value='"+tags[i]+"'>"+tags[i]+"<br>");
        }else{
            $("#cont-inp-01").append("<input type='checkbox'  value='"+tags[i]+"'>"+tags[i]+"<br>");
        }
    }


};


function cadastraPagina(url,tags){

   /* var jquery = $.post( "interfaceDMYT.php",{tipo: "insert_page", name:"Quem Votou?", id:"592202380964866", tags:tags}, function() { })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            if(data_json.status == "erro01")
                alert("página duplicada")
            else if (data_json.status == "erro02")
                alert("erro ao inserir pagina")
            else if (data_json.status == "erro03")
                alert("erro ao inserir tags")
            else if (data_json.status == "ok")
                alert("operação realizada com sucesso");


        }).fail(function(){

        });
    */

    FB.login(function(){
        FB.api(url,
            function(response){
                var jquery = $.post( "http://luisaraujo.com.br/dmyt/",{tipo: "insert_page", name:response.name, id:response.id, tags:tags}, function() { })
                    .done(function(data){
                        data_json = jQuery.parseJSON(data);
                        if(data_json.status == "erro01")
                            alert("página duplicada")
                        else if (data_json.status == "erro02")
                            alert("erro ao inserir pagina")
                        else if (data_json.status == "erro03")
                            alert("erro ao inserir tags")
                        else if (data_json.status == "ok")
                            alert("operação realizada com sucesso");

                    }).fail(function(){   });

            }
        );
    });
}


function getTags( callback ){

    var jquery = $.post( "http://luisaraujo.com.br/dmyt/",{tipo: "get_tags"}, function() { })
        .done(function(data){
            callback( data.split(" "));

        }).fail(function(){

   });
}

function getPaginas( callback ){

    var jquery = $.post( "http://luisaraujo.com.br/dmyt/",{tipo: "get_paginas"}, function() { })
        .done(function(data){
            data_json = [];
            arr = data.split("&");

            for(var i=0; i<arr.length; i++){
                data_json.push(jQuery.parseJSON(arr[i]));
            }

            callback(data_json)

        }).fail(function(){

        });

}

function login(){

    var text_post = document.getElementById("text-post").value;
    var link_post = document.getElementById("link-post").value;
    var type_post = document.getElementById("type-post")
    var type_post_selected = type_post.options[type_post.selectedIndex].value;
    var tags = [];

    $("#form-tag-newpost input:checked").each(function( i ) {
            tags.push( $(this).val());
    });

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
                        div +=   '<span class="line-status">Postado</span></div>';

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

                        cancelPost();
                    }
                });

        }
    }, {scope: 'publish_actions'});
}


function cancelPost(){
    $("#display-block").css("display","none");
    $("#box-post").css("display","none");
    $("#bt-novo-post").css("display","block");
}


/*
* Pega os dados de uma página em especifico através do id
* */
function getDataPage(elem){
    $("#bt-cadastre-page").css("display","none");
    $("#bt-save-page").css("display","block");
    $("#bt-remove-page").css("display","block");
    $("#cont-lable-pagina").css("display","none");
    $("#cont-lable-id").css("display","none");
    $("#cont-lable-pagina").css("display","block");
    $("#cont-lable-id").css("display","block");

    //get dados do banco
    var arrDados = [{nome:"Nome01", url:"http//:www.nome01.com",id:"080980980", tag: ["BackEnd","Python"]},
                    {nome:"Nome02", url:"http//:www.nome02.com",id:"080976861782",  tag: ["BackEnd"]},
                    {nome:"Nome03", url:"http//:www.nome03.com",id:"080981231431",  tag: ["Python"]}];

    var index = parseInt(Math.random()*3);

    $("#id-pagina").val($(elem).attr('id-post'));
    $("#nome-pagina").val($(elem).text());
    $("#url-pagina").val('https://www.facebook.com/'+$(elem).attr('id-post'));

    //var arrTag = ["BackEnd","Python"];

    $('#form-tag-editpost input').prop('checked', false);

    var tags = $(elem).attr('tags').split("%");
    for(var i=0; i<tags.length; i++){
        $('input[value="'+tags[i]+'"]').prop("checked", true);
    };


}


/*
* Acionado com o botao "página"
* Exibe os itens referente as páginas cadastradas
* */
function openContPagina(){

    var arrPage = [{nome: "Javascript Brasil", id: "082084392048320", tipo:"grupo" },
                   {nome: "Programação Web", id: "082084392048320", tipo:"grupo"},
                   {nome: "HTML CSS JS", id: "082084392048320",tipo:"pagina"}
                  ];

    //limpa a lista de tags
    $("#cont-inp-edit-01").html("");
    $("#cont-inp-edit-02").html("");
    //tags
    getTags(function(tags){
        for(var i=0; i< tags.length; i++){
            if(i < parseInt(tags.length/2) ){
                $("#cont-inp-edit-02").append("<input type='checkbox' value='"+tags[i]+"'>"+tags[i]+"<br>");
            }else{
                $("#cont-inp-edit-01").append("<input type='checkbox' value='"+tags[i]+"'>"+tags[i]+"<br>");
            }
        }
    });


    //limpa lista de páginas
    $("#list_paginas").html("");
    getPaginas(function(paginas){
        for(var i=0; i< paginas.length; i++){
            console.log(paginas[i])
            if(paginas[i].tipo == 0){
                $("#list_paginas").append("<div class='iten' tags='"+ paginas[i].tags+"' id-post='"+ paginas[i].id+"'><img src='ico-page.png'>"+paginas[i].nome+"</div>");
            }else if(paginas[i].tipo == 1){
                $("#list_paginas").append("<div class='iten'  tags='"+ paginas[i].tags+"' id-post='"+ paginas[i].id+"'><img src='icon-group.png'>"+paginas[i].nome+"</div>");
            }
        }


        //cadastra evento de click na lista
        $("#list_paginas .iten").click(function(){
            getDataPage(this);
        });

    });


    $("#linechart_material").hide();
    $("#gerencia_paginas").show();



}

$(document).ready(function(){

    $("#bt-novo-post").click(function(){
        $("#box-post").css("display","block");
        $("#bt-novo-post").css("display","none");
        $("#table-post").css("display","none");
        $("#display-block").css("display","block");

        novoPost();
    });

    $("#bt-send-post").bind("click", function(){
        login();
    })

    $("#bt-cancel-post").bind("click", function(){
        cancelPost();
    });

    $("#bt-pagina").bind("click", function(){
        openContPagina()
    });

    $("#bt-graficos").bind("click", function(){
        $("#linechart_material").show();
        $("#gerencia_paginas").hide();
        chart.draw(data, options);
    });

    $("#bt-more-page").bind("click", function(){
        if( (parseInt($("#list_paginas .iten").length)) *parseInt($("#list_paginas .iten").css("height"))   > (parseInt($("#list_paginas").css("top"))*-1 + 350) )
            $("#list_paginas").css("top",(parseInt($("#list_paginas").css("top")) -50)+"px");
    });


    $("#bt-less-page").bind("click", function(){
        if( parseInt($("#list_paginas").css("top")) < 0 ){
            $("#list_paginas").css("top", (parseInt($("#list_paginas").css("top")) +50)+"px");
        }
    });


    $("#bt-new-page").bind("click", function(){
        $("#bt-cadastre-page").css("display","block");
        $("#bt-save-page").css("display","none");
        $("#bt-remove-page").css("display","none");

        $("#cont-lable-pagina").css("display","none");
        $("#cont-lable-id").css("display","none");

        $("#nome-pagina").val("");
        $("#url-pagina").val("");
        $("#id-pagina").val("");

        //var arrTag = ["BackEnd","Python"];

        $('#form-tag-editpost input').prop('checked', false);
    });


    $("#bt-cadastre-page").bind("click", function(){
        var url = $("#url-pagina").val();
        if(url != ""){
            var tags = [];
            $('#form-tag-editpost input:checked').each(function( i ) {
                tags.push( $(this).val());
            });
            if(tags.length > 0)
            var dados = cadastraPagina(url, tags);
            else
            alert("marque ao menos uma tag");
        }
    });


    $("#bt-save-page").bind("click", function(){
        alert("salvar")
    });

    $("#bt-remove-page").bind("click", function(){
        alert("remover")
    });
});
