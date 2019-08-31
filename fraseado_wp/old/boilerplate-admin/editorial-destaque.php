<?php defined('MAX_DESTAQUES') or define('MAX_DESTAQUES', 6); ?>
<style>
.categories { margin:-3px -8px; }
.categories label, .categories li { display:block; margin-bottom:6px; }
.categories ul { margin-left:20px; }
</style>
<div class="wrap columns-2">
    <div class="icon32 icon32-posts-post" id="icon-edit"><br></div>
    <h2>Home destaques</h2>

    <?php if(!empty($just_saved)): ?>
    <div class="updated below-h2" id="message"><p>Destaques atualizados.</p></div>
    <?php endif; ?>
    <form action="" method="post">
        <div class="metabox-holder has-right-sidebar" id="poststuff">
            <div class="inner-sidebar" id="side-info-column">
                <div class="meta-box-sortables ui-sortable" id="side-sortables">

                    <div class="postbox " id="submitdiv">
                        <h3>Publicar</h3>

                        <div class="inside">
                            <div id="submitpost" class="submitbox">
                                <div id="misc-publishing-actions">


                                    <div id="publicar-em" class="misc-pub-section curtime">
                                        <span id="timestamp">
                                        Publicar <b>imediatamente</b></span>


                                    </div>                                    
                                </div>
                                <div id="major-publishing-actions">

                                    <div id="publishing-action">
                                        <input type="submit" value="Publicar" class="button-primary"/>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div id="post-body">
                <div id="post-body-content">

                    <?php for ($i = 0; $i < MAX_DESTAQUES; $i++): ?>

                    <div class="meta-box-sortables ui-sortable" id="normal-sortables">
                        <div class="postbox editorialbox" style="display: block;">
                            <div class="inside">

                                <table width="100%" class="form-table">
                                    <tr>
                                        <td valign="top">
                                            <table class="form-table">
                                                <tr>
                                                    <td colspan="2" style="padding:0; font-size:20px; ">Destaque <?php echo $i+1; ?></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ul id="cat<?php echo $i; ?>" class="categories"><?php wp_category_checklist(0, 0, $editorial[$i]['post_category'], false, null, false); ?></ul>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                </table>
                            </div>

                        </div>
                    </div>
                    <?php endfor; ?>
                </div>
            </div>            
        </div>
    </form>
</div>
<script>
    jQuery(window).on('load', function() {
        jQuery('.categories :checkbox').each(function() {
            jQuery(this).attr('name', 'post_category['+jQuery(this).parents('.categories').attr('id')+'][]')
        });
    })
</script>