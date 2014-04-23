<?php

$filename  = dirname(__FILE__).'/data.txt';

if ( isset($_GET['id']))
{
    file_put_contents($filename,$_GET['id']);
    die();
}
