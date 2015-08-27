#!/bin/bash
ECDIR=/opt/electriccloud/electriccommander
export PATH=$PATH:$ECDIR/bin

# Fail on any errors
set -e

# Ensure we are superuser
if [[ $EUID -ne 0 ]]; then
   echo "You must run this script as root." 1>&2
   exit 100
fi

OS=$1

# Find the root Git workspace directory.
ROOT=$(cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd)

# Place to find artifacts
ARTIFACTS=$ROOT/artifacts

if [ ! -h /opt/electriccloud/electriccommander/apache/htdocs/dslide ]; then
	cd /opt/electriccloud/electriccommander/apache/htdocs
	ln -s $ROOT/dslide
fi


#echo "Adding DSL IDE to tabs..."
ectool login admin changeme
ectool setProperty /server/ec_ui/availableViews/Default --valueFile $ROOT/dslide/defaultView.xml
#ec-perl -e '
#	use ElectricCommander::View;
#	my $view = new ElectricCommander::View($xml);
#	$view->add("MyTab", { url => '../dslide', position=>2 });
#'

