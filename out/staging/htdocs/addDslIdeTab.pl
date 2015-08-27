#!ec-perl
use strict;
use ElectricCommander ();
use ElectricCommander::View;
$| = 1;
my $ec = new ElectricCommander->new();

# /server/ec_ui/availableViews/Default

#my $view = new ElectricCommander::View($xml);
my $view = new ElectricCommander::View($ec->getProperty("/server/ec_ui/availableViews/Default")->findnodes_as_string("/"));
$view->add("DSL IDE", { url => '../dslide', position=>2 });
