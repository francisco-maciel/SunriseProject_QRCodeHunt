<?php

$filename  = dirname(__FILE__).'/data.txt';

if ( isset($_GET['id']))
{

    $filetime = filemtime($filename);
    $modify = true;
    $equal_content = false;
   if (strcmp($_GET['id'], file_get_contents($filename)) == 0) {
       $equal_content = true;

       if(time() - $filetime > 5) {
           $modify = true;
       }
       else $modify = false;

   }
    if (!$equal_content) $message = 'Parabéns, encontraste um código! Podes ver agora o conteúdo projetado!';

    if ($modify) file_put_contents($filename,$_GET['id']);

    if ($equal_content) $message = 'Parabéns, econtraste um código! Este já era o código que se encontrava visível!';

    success($message);
    die();

}
else {
    insuccess('Este código está incorreto ou desatualizado :(');
}


function success($message) {
?>
<html>
<head>
    <title>Sunrise Project QR Code Success</title>
    <link rel="shortcut icon" href="favicon.ico"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
.center{
    position:relative;
    margin-left:auto;
    margin-right:auto;
    width:90%;
}
    #message{
        font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
        color: #424242;
        text-align:center;
    }
    @media (max-width: 300px) {
        html { font-size: 130%; }
    }

    @media (min-width: 300px) {
        html { font-size: 180%; }
    }

</style>
</head>
<div class="center">

    <img width="100%"src="./images/logo.jpg"  >
    <br/>
    <div id="message"><?php echo $message ?></div>

</div>


</html>

<?php


}

function insuccess($message) {
// missing id


}
?>
