		<?php if(!$GLOBALS['STORIES']) { ?>
				<?php 
					if(!is_home() && !is_single()) { 
						$qnt = 8;
						include(locate_template('template/gallery.php')); 
					}

					if(!is_home()) {
						include(locate_template('template/links.php'));
					}
				?>

				<footer class="footer">
					<p>2014-<?php echo date('Y') == 2014 ? 2015 : date('Y'); ?> © Fraseado</p>
					<ul>
						<li><a href="<?php echo home_url('termos-de-uso'); ?>" data-vars-c="footer" data-vars-a="termos">Termos de uso</a> - </li>
						<li><a href="mailto:fraseado.oficial@gmail.com" data-vars-c="footer" data-vars-a="contato">Contato</a></li>
					</ul>
				</footer>
			</div>
			
			<?php if(!$GLOBALS['AMP']) wp_footer(); ?>
			<?php include(locate_template('template/analytics.php')); ?>

			<?php if(is_home()) { ?>
			<amp-sticky-ad layout="nodisplay">
				<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '2760362308' : '3414613206'; ?>" data-auto-format="rspv" data-full-width>
					<div overflow></div>
				</amp-ad>
			</amp-sticky-ad>
			<?php } ?>
		<?php } ?>
	</body>
</html>