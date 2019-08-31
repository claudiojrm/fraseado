<?php 
require('wp-load.php');
header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="utf-8" ?>' 
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
	<?php 
		function utf8_for_xml($str) {
			return preg_replace('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u', ' ', $str);
		}

		$cats = get_categories();

		foreach($cats as $cat) {
			// id do termo
			$id = get_option('_wpfifc_taxonomy_term_'.$cat->term_id.'_thumbnail_id_', 0);
			
			// imagem
			$image = wp_get_attachment_image_src($id, 'full');

			if(empty($image[0])) {
				continue;
			}
	
			echo "\t".'<url>'."\n";
			echo "\t\t".'<loc>'.get_term_link($cat).'</loc>'."\n";
			echo "\t\t".'<image:image>';
			echo "\t\t\t\t".'<image:loc>'.$image[0].'</image:loc>';
			echo "\t\t\t\t".'<image:caption>'.utf8_for_xml($cat->description).'</image:caption>';
			echo "\t\t\t\t".'<image:title>'.utf8_for_xml($cat->name).'</image:title>';
			echo "\t\t".'</image:image>';
			echo "\t".'</url>'."\n";
		}

		$posts = get_posts('posts_per_page=-1'); 

		foreach($posts as $post) {
			echo "\t".'<url>'."\n";
			echo "\t\t".'<loc>'.get_the_permalink().'</loc>'."\n";
			echo "\t\t".'<image:image>';
			echo "\t\t\t\t".'<image:loc>'.wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0].'</image:loc>';
			echo "\t\t\t\t".'<image:caption>'.utf8_for_xml(get_post(get_post_thumbnail_id())->post_title).'</image:caption>';
			echo "\t\t\t\t".'<image:title>'.utf8_for_xml(get_the_title()).'</image:title>';
			echo "\t\t".'</image:image>';
			echo "\t".'</url>'."\n";
		}
	?>
</urlset>