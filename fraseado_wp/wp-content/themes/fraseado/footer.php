		<?php if(!$GLOBALS['STORIES']) { ?>
				<?php 
					if(!is_home() && !is_single()) { 
						$qnt = 8;
						include(locate_template('template/gallery.php')); 
					}
				?>

				<footer class="footer">
					<p>2014-<?php echo date('Y') == 2014 ? 2015 : date('Y'); ?> © Fraseado</p>
					<ul>
						<li><a href="<?php echo home_url('termos-de-uso'); ?>" data-vars-event-category="link-footer" data-vars-event-action="termos">Termos de uso</a> - </li>
						<li><a href="mailto:fraseado.oficial@gmail.com" data-vars-event-category="link-footer" data-vars-event-action="contato">Contato</a></li>
					</ul>
				</footer>
			</div>
			
			<?php if(!$GLOBALS['AMP']) wp_footer(); ?>
			<?php include(locate_template('template/analytics.php')); ?>
		<?php } ?>
	</body>
</html>