<?php

$filename  = dirname(__FILE__).'/data.txt';

if ( isset($_GET['id']))
{
    // TODO verificar conteudo do ficheiro igual
    file_put_contents($filename,$_GET['id']);
    echo "TODO: RESPOSTA SUCESSO";
    die();

}
else {
    echo "TODO: RESPOSTA ID INSUCESSO";
}
?>
