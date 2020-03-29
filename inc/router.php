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

$route = new App\Route();

$route->add('/', function() { 
	include "web_home.php";
});

$route->add('/siteplan', function() { 
	include "web_siteplan.php";
});

$route->add('/about', function() { 
	include "web_about.php";
});

/*$route->add('/profil/.+', function($name) {
	echo "Name $name";
});*/

$route->listen();
