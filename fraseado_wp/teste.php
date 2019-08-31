<?php 
ini_set('display_errors', true);
echo 'oisss'; 
$fp = fopen('data.txt', 'w');
fwrite($fp, '1');
fwrite($fp, '23');
fclose($fp);

phpinfo();


?>





