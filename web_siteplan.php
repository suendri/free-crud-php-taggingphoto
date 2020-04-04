<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<?php

/**
 * Gosoftware Media Indonesia 2020
 * --
 * --
 * http://gosoftware.web.id
 * http://phpbego.wordpress.com
 * e-mail : cs@gosoftware.web.id
 * WA : 6285263616901
 * --
 * --
 */

$site = new App\Siteplan();
$row = $site->tampil();

?>

<h2>SITEPLAN</h2>

<div class="d-lg-none">
	<div class="alert alert-warning">
		Layar terlalu kecil untuk menampilkan Siteplan
	</div>
</div>

<div class="d-none d-lg-block">

	<div class="alert alert-info">
		Klik dimanapun pada photo untuk menandai.
	</div>

	<div class="row">
		<div class="col">
			<div class="card mb-4 shadow-sm">
				<div class="card-header">
					Siteplan
				</div>
				<img src="<?php echo URL; ?>/layout/assets/images/main-photo.jpg" data-points-color="red" class="tagging-photo bd-placeholder-img card-img-top" data-allow-add-tags="true" data-show-all-on-hover="false" data-show-tags-buttons="true" data-points-tooltip-follow="down" data-points='<?php echo $row['site_points']; ?>' alt="">
			</div>
		</div>
	</div>
</div>

<script>

	$(document).ready(function(){

		$('#web_tag').load('web_tag.php').fadeIn("slow");

		taggingPhoto.init($('img.tagging-photo'), {
			onAddTag: function (points) {	

				$.ajax({				
					url: 'web_update.php',
					type: "POST",
					data: { MyPoints : JSON.stringify(points)},
					dataType: 'json',
					success: function (data) {
						alert('Data berhasil disimpan!');
					}
				});	
			}	
		});
	});

</script>
