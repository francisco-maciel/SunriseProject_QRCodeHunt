<?php

$filename  = dirname(__FILE__).'/data.txt';

if ( isset($_GET['id']))
{

    $filetime = filemtime($filename);

   if (strcmp($_GET['id'], file_get_contents($filename)) == 0) {
       $modify;
       if(time() - $filetime > 5) {
           $modify = true;
       }
       else $modify = false;

   }
if ($modify) file_put_contents($filename,$_GET['id']);

    echo "TODO: RESPOSTA SUCESSO";
    die();

}
else {
    echo "TODO: RESPOSTA ID INSUCESSO";
}
?>
