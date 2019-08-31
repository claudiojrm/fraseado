<?php
// define o header de css
##header("Content-type: text/css; charset=utf-8");

// tempo de expiração
##header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 86400) . ' GMT');

// array de arquivos

$css = array(
    'style.css'
);

$content = '';

// carrega o css
foreach ($css as $file) {
    $content .= file_get_contents(str_replace('style.php', '', __FILE__).$file);
}

// Remove comentários
$content = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $content);

// Remove espaços depois dos :
$content = str_replace(': ', ':', $content);

// altera o path das imagens
$content = str_replace('images/', get_bloginfo('template_url').'/images/', $content);

// Remove espaços em branco
$content = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $content);

// imprime o css
echo $content;
?>