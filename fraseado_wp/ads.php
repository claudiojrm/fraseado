<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title>Fraseado - Anúncios alternativos</title>
	<meta name="viewport" content="width=device-width">
	<style>
		img {
			border: 0;
			vertical-align: middle;
		}
	</style>
</head>
<body>
	<?php if($_GET['ads'] == '200x90') { ?>
		<style>
			body {
				font: normal 15px/1.4 arial, "trebuchet ms";
			}

			a {
				color: #D33569;
			}

			.tags a {
				text-decoration: underline;
				font-size: 14px;
				display: inline-block;
			}

			.tags i {
				content: '';
				display: inline-block;
				width: 0;
				height: 0;
				border-left: 6px solid #D33569;
				border-top: 4px solid #fff;
				border-bottom: 4px solid #fff;
				margin-right: 5px;
			}
		</style>
		<?php
			$tags = array(
				array('link' => '/frases/frases-curtas-de-amor/', 'name' => 'Curtas de amor'),
				array('link' => '/frases/frases-curtas-de-deus/', 'name' => 'Curtas de Deus'),
				array('link' => '/frases/motivacionais/', 'name' => 'Motivacionais'),
				array('link' => '/frases/frases-biblicas-salmos-proverbios/', 'name' => 'Bíblicas'),
				array('link' => '/frases/bom-dia-abencoado/', 'name' => 'Bom dia abençoado'),
				array('link' => '/frases/boa-tarde-abencoada/', 'name' => 'Boa tarde abençoada'),
				array('link' => '/frases/boa-noite-abencoada/', 'name' => 'Boa noite abençoada'),
				array('link' => '/frases/amizade/', 'name' => 'Amizade')
			);

			shuffle($tags);
		?>
		<div class="tags">
			<?php for($x = 0; $x < 4; $x++) { ?>
				<div><a href="<?php echo $tags[$x]['link']; ?>" class="tag" target="_top" title="<?php echo $tags[$x]['name']; ?>"><i></i><?php echo $tags[$x]['name']; ?></a></div>
			<?php } ?>
		</div>
	<?php } else { ?>
		<style>
			body {
				text-align: center;
			}
		</style>
		<a href="http://facebook.com/fraseado.oficial" target="_blank" class="ads">
			<img src="ads/pub-<?php echo $_GET['ads'] == '320x100' ? '200x90' : $_GET['ads']; ?>.jpg">
		</a>
	<?php } ?>

	<script> 
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-55713936-1', 'auto'); 
		ga('send', 'event', 'adsense', '<?php echo $_GET["ads"]; ?>');
		
		if(document.querySelector('.ads')) {
			document.querySelector('.ads').onclick = function() { 
				ga('send', 'event', 'adsense fb', '<?php echo $_GET["ads"]; ?>');
			};
		}

		[].forEach.call(document.querySelectorAll('.tag'), function(tag) {
			tag.onclick = function() { 
				ga('send', 'event', 'adsense tag', this.title);
			};
		});

	</script>
</body>
</html>