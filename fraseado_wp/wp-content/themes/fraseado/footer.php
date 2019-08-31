			<footer class="footer">
				<p>2014-<?php echo date('Y') == 2014 ? 2015 : date('Y'); ?> © Fraseado</p>
				<ul>
					<li><a href="<?php echo home_url('termos-de-uso'); ?>" data-vars-event-category="link-footer" data-vars-event-action="termos">Termos de uso</a> - </li>
					<li><a href="mailto:fraseado.oficial@gmail.com" data-vars-event-category="link-footer" data-vars-event-action="contato">Contato</a></li>
				</ul>
			</footer>
		</div>

		<?php if($GLOBALS['AMP']) { ?>
			<amp-analytics type="googleanalytics" id="analytics1">
				<script type="application/json">
					{
						"vars": {
							"account": "UA-55713936-1"
						},
						"triggers": {
							"trackPageview" : {
								"on": "visible",
								"request": "pageview"
							},
							"trackEvent": {
								"selector": "a",
								"on": "click",
								"request": "event",
								"vars": {
									"eventCategory": "${category}",
									"eventAction" : "${action}"
								}
							}
						}
					}
				</script>
			</amp-analytics>
		<?php } else { ?>
			<?php wp_footer(); ?>
		<?php } ?>
	</body>
</html>