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

namespace App;

class Siteplan extends Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function tampil()
	{

		$site_id = 1;

		$stmt = $this->db->prepare("SELECT * FROM tb_site WHERE site_id=:site_id");
		$stmt->bindParam(":site_id", $site_id);
		$stmt->execute();

		$row = $stmt->fetch(); 

		return $row;

	}

	public function update()
	{

		$site_id = 1;
		$site_points = $_POST['MyPoints'];

		$sql = "UPDATE tb_site SET site_points=:site_points
		WHERE site_id=:site_id";
		$stmt = $this->db->prepare($sql);		
		$stmt->bindParam(":site_points", $site_points);
		$stmt->bindParam(":site_id", $site_id);
		$stmt->execute();

		return false;
	}

}