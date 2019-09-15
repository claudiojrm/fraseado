<amp-analytics type="googleanalytics" id="analytics1">
	<script type="application/json">
		{
			"vars": {
				"account": "UA-55713936-1"
			},
			"triggers": {
				<?php if(!$GLOBALS['STORIES']) { ?>
				"trackPageview" : {
					"on": "visible",
					"request": "pageview"
				},
				<?php } ?>
				"trackEvent": {
					"selector": "a",
					"on": "click",
					"request": "event",
					"vars": {
						"eventCategory": "${c}",
						"eventAction" : "${a}"
					}
				},
				"storyPageVisible": {
					"on": "story-page-visible",
					"request": "pageview"
				}
			}
		}
	</script>
</amp-analytics>