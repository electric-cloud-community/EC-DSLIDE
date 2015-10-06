if ($promoteAction eq 'promote') {

	$view->add("DSL IDE",{position=>10, url => 'plugins/@PLUGIN_KEY@-@PLUGIN_VERSION@/index.html'});
	
} elsif ($promoteAction eq 'demote') {
    $view->remove("DSL IDE");

}

