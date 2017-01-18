<?php

$localhost ='127.0.0.1';
$user='root';
$senha = 'root';
$database = "datamineryt";

$link = @mysql_connect($localhost, $user, $senha);

if (!$link) {
    die('Não foi possível conectar: ' . mysql_error());
}

$db_selected = mysql_select_db($database);

//$tipo = $_GET["tipo"];
$tipo = $_POST["tipo"];

if($tipo=="insert_page"){

    $nome = $_POST["name"];
    $id = $_POST["id"];
    $tags = $_POST["tags"];

    $sql = "SELECT COUNT(*) as total FROM pagina WHERE id = '$id'";
    $result = mysql_query($sql, $link);

    if(mysql_fetch_assoc($result)['total'] != 0){

        $json = '{"status": "erro01"}';
        echo  $json;
    }else{

            $sql = "INSERT INTO pagina VALUES (null,'$nome','$id')";

            if ( !mysql_query($sql, $link) ) {
                $json = '{"status": "erro02"}';
                echo  $json;
            }else{
                $idpagina = mysql_insert_id();

                foreach ( $tags as $t) {
                    $sql = "SELECT idtags FROM tags where nome='$t'";
                    $result = mysql_query($sql, $link);
                    $row = mysql_fetch_row($result);

                    for($i=0; $i< count($row); $i++){
                        if($row[$i] == "")
                            continue;

                        $sql = "INSERT INTO tags_pagina VALUES ('$row[$i]','$idpagina')";
                        if ( !mysql_query($sql, $link) ) {
                            $json = '{"status": "erro02"}';
                            echo  $json;
                        }

                    }
                }

                $json = '{"status": "'.$tags[0].'"}';
                echo  $json;
            }
    }

}else if($tipo=="insert_post"){

}else if($tipo=="get_tags"){

    $sql = "SELECT nome FROM tags WHERE 1";
    $result = mysql_query($sql, $link);
    $arr = array();

    while ($row = mysql_fetch_row($result)) {
        array_push( $arr,$row[0]);
    }

    for($i=0; $i<count($arr); $i++){
        if($i < count($arr)-1)
            echo $arr[$i]." ";
        else
            echo $arr[$i];

    }
}else if($tipo == "get_paginas"){
    $sql = "SELECT  id, nome, tipo, idpagina FROM pagina WHERE 1";
    $result = mysql_query($sql, $link);
    $arr = array();

    while ($row = mysql_fetch_row($result)) {

        $sql2 = "SELECT nome FROM tags WHERE idtags  = (SELECT tags_idtags FROM tags_pagina WhERE pagina_idpagina = '".$row[3]."')";
        $result2 = mysql_query($sql2, $link);
        $tags2 = array();
        $tags_str2 = "";

        while ($row2 = mysql_fetch_row($result2)){
            array_push($tags2, $row2[0]);
        }

        for($i=0; $i<count($tags2); $i++){
            if($i < count($tags2)-1)
                $tags_str2.= $tags2[$i]."%";
            else
                $tags_str2.= $tags2[$i];
        }


        array_push($arr,'{"id":"'.$row[0].'", "nome":"'.$row[1].'","tipo":"'.$row[2].'","tags":"'.$tags_str2.'"}');
    }

    for($i=0; $i<count($arr); $i++){
        if($i < count($arr)-1)
            echo $arr[$i]."&";
        else
            echo $arr[$i];
    }
}
?>