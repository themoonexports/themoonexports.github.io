<div id="sidebar">

<?php if (get_option('swt_fcats') == 'Hide') { ?>
<?php { echo ''; } ?>
<?php } else { include(TEMPLATEPATH . '/includes/featured-cats.php'); } ?>

<?php if (get_option('swt_banners') == 'Hide') { ?>
<?php { echo ''; } ?>
<?php } else { include(TEMPLATEPATH . '/includes/banners.php'); } ?>

    <?php if (!function_exists('dynamic_sidebar')
	|| !dynamic_sidebar()) : ?>


    <div class="side-widget">
      <h3>Blogroll</h3>
      <ul>
      <?php wp_list_bookmarks('title_li=&categorize=0');  ?>
      </ul>
   </div>

    <div class="side-widget">
    <h3>Search</h3>
    <?php get_search_form(); ?>
    </div>

    <?php endif; ?>
</div>
<div style="clear:both"></div>
<div id="sidebar2">

<div id="footer1">
<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(2) ) : else : ?>

    <div class="widget">
      <h3>Customer Service</h3>
      <ul>
      <?php wp_list_bookmarks('title_li=&categorize=0');  ?>
      </ul>
   </div>


<?php endif; ?>
</div>

<div id="footer2">
<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(3) ) : else : ?>

    <div class="widget">
    <h3>Informations</h3>
    <ul><?php wp_list_pages('title_li=&depth=1' ); ?></ul>
    </div>

<?php endif; ?>
</div>

<div id="footer3">

<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(4) ) : else : ?>

    <div class="widget">
      <h3>Extras</h3>
      <ul>
      <?php wp_list_bookmarks('title_li=&categorize=0');  ?>
      </ul>
   </div>

<?php endif; ?>
</div>

<div id="footer4">
<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(5) ) : else : ?>

    <div class="widget">
    <h3>Text Widget</h3>
    <p>
    Aliquam ut tellus ligula. Nam blandit
massa nec neque rutrum a euismod t
ellus ultricies! Phasellus nulla tellus,
 fringilla quis tristique ornare, condi
mentum non erat. Aliquam congue or
nare varius.
    </p>
    </div>

<?php endif; ?>
</div>
</div>
</div>
</div><!-- END TOPWRAP -->
