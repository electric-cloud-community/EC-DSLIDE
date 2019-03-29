ecpluginbuilder
cd build
ectool uninstallPlugin EC-DSLIDE-${1}
ectool installPlugin EC-DSLIDE-${1}.zip
ectool promotePlugin EC-DSLIDE-${1}
cd -
