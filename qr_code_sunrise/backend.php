<?php

$filename  = dirname(__FILE__).'/data.txt';

// store new message in the file
$id = isset($_GET['id']) ? $_GET['id'] : '';
if ($id != '')
{
  file_put_contents($filename,$id);
  die();
}

// infinite loop until the data file is not modified
$lastmodif    = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
$currentmodif = filemtime($filename);
while ($currentmodif <= $lastmodif) // check if the data file has been modified
{
  usleep(10000); // sleep 10ms to unload the CPU
  clearstatcache();
  $currentmodif = filemtime($filename);
}

// return a json array
$response = array();
$response['id']       = file_get_contents($filename);
$response['timestamp'] = $currentmodif;
echo json_encode($response);
flush();

/* filename: backend.php */