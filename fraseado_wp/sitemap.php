<?php 
require('wp-load.php');
header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="utf-8" ?>' 
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

	<url>
		<loc>https://fraseado.com.br/</loc>
	</url>

	<?php 
	$cats = get_categories('pad_counts=1');

	foreach($cats as $cat) {
		$num = $cat->category_parent ? ceil($cat->count/get_option('posts_per_page')) : 0;
		for($x = 1; $x < $num; $x++) {
			echo "\t".'<url>'."\n";
			echo "\t\t".'<loc>'.get_term_link($cat).($x > 1 ? "page/$x/" : '').'</loc>'."\n";
			echo "\t".'</url>'."\n";
		}
	}

	$posts = get_posts('posts_per_page=-1'); 

	foreach($posts as $post) {
		echo "\t".'<url>'."\n";
		echo "\t\t".'<loc>'.get_the_permalink($post->ID).'</loc>'."\n";
		echo "\t".'</url>'."\n";
	}
	?>
</urlset> 
