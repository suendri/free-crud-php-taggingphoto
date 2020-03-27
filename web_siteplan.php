<?php

$site = new App\Siteplan();
$row = $site->tampil();

?>

<div class="d-none d-lg-block">
	<div class="alert alert-info">
		<strong>Home</strong>
	</div>
</div>

<div class="d-lg-none">
	<div class="alert alert-warning">
		Layar terlalu kecil untuk menampilkan Siteplan
	</div>
</div>

<div class="d-none d-lg-block">
	<div class="row">
		<div class="col">
			<div class="card mb-4 shadow-sm">
				<div class="card-header">
					Siteplan - Klik dimanapun pada photo untuk menandai.
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
