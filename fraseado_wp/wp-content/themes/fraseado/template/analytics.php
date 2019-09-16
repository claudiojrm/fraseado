<amp-analytics type="googleanalytics" id="analytics1">
	<script type="application/json">
		{
			"vars":{"account":"UA-55713936-1"},
			"triggers":{
				<?php if(!$GLOBALS['STORIES']) { ?>
				"pv":{"on":"visible","request":"pageview"},
				<?php } ?>
				"click":{"selector":"a","on":"click","request":"event","vars":{"eventCategory":"${c}","eventAction":"${a}"}},
				"menu":{"selector":".menu a","on":"click","request":"event","vars":{"eventCategory":"menu","eventAction":"${a}"}},
				"gallery":{"selector":".gallery a","on":"click","request":"event","vars":{"eventCategory":"gallery","eventAction":"${a}"}},
				"related":{"selector":".related a","on":"click","request":"event","vars":{"eventCategory":"related","eventAction":"${a}"}},
				"links":{"selector":".links a","on":"click","request":"event","vars":{"eventCategory":"links","eventAction":"${a}"}},
				"pvstory":{"on":"story-page-visible","request":"pageview"}
			}
		}
	</script>
</amp-analytics>