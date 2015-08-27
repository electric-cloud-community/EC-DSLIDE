if ($promoteAction eq 'promote') {

	$view->add("DSL IDE",{position=>2, url => 'plugins/EC-DSLIDE-1.0/index.html'});
	
} elsif ($promoteAction eq 'demote') {
    $view->remove("Flow Tools");

}

