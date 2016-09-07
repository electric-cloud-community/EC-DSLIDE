use XML::LibXML;

if ($promoteAction eq 'promote') {

	#### Add to Commander Menu ###
	$view->add("DSL IDE",{position=>10, url => 'plugins/@PLUGIN_KEY@-@PLUGIN_VERSION@/index.html'});

	#### Add to Flow Menu ###
	my $flowMenuPath = "/server/ec_ui/flowMenuExtension";
	# Test whether the Flow menu property exists
	my $menuXml;
	eval {$commander->getProperty($flowMenuPath)};
	if ($@) {
		# Create new menu definition
		$menuXml = qq(<?xml version="1.0" encoding="UTF-8"?><menu></menu>);
	} else {
		# Work with existing menu definition
		$menuXml = $commander->getProperty($flowMenuPath)->findvalue("//value");
		
	}
	my $parser = XML::LibXML->new();
	my $doc = $parser->parse_string($menuXml);

	# Remove old DSL IDE menu entry if present
	if ( my ($childnode) = $doc->findnodes('//tab[./label = "DSL IDE"]') ) {
		my $parent = $childnode->parentNode;
		$parent->removeChild( $childnode );
	}

	# Add menu tab for DSL IDE
	# <tab>
	# 	<label>DSL IDE</label>
	# 	<url>plugins/EC-DSLIDE-1.4.1/index.html</url>
	# </tab>
	if( my ($node) = $doc->findnodes("//menu") )
	{
		my $new_node  = $doc->createElement("tab");
		my $new_label = $doc->createElement("label");
		my $new_url = $doc->createElement("url");
		$node->addChild($new_node);
		$new_node->addChild($new_label);
		$new_label->appendText('DSL IDE');
		$new_node->addChild($new_url);
		$new_url->appendText('plugins/@PLUGIN_KEY@-@PLUGIN_VERSION@/index.html');
	}

	$commander->setProperty("/server/ec_ui/flowMenuExtension",{value => $doc->toString(0)});
	
	
} elsif ($promoteAction eq 'demote') {
	#### Remove from Commander Menu ###
    $view->remove("DSL IDE");
	
	#### Remove from Commander Menu ###
	my $flowMenuPath = "/server/ec_ui/flowMenuExtension";
	# Test whether the Flow menu property exists
	my $menuXml;
	eval {$commander->getProperty($flowMenuPath)};
	if ($@) {
		# Create new menu definition
		$menuXml = qq(<?xml version="1.0" encoding="UTF-8"?><menu></menu>);
	} else {
		# Work with existing menu definition
		$menuXml = $commander->getProperty($flowMenuPath)->findvalue("//value");
		
	}
	my $parser = XML::LibXML->new();
	my $doc = $parser->parse_string($menuXml);

	# Remove old DSL IDE menu entry if present
	if ( my ($childnode) = $doc->findnodes('//tab[./label = "DSL IDE"]') ) {
		my $parent = $childnode->parentNode;
		$parent->removeChild( $childnode );
	}

	$commander->setProperty("/server/ec_ui/flowMenuExtension",{value => $doc->toString(0)});	
}

