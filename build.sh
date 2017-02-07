export COMMANDER_SERVER=training.electric-cloud.com
ectool --server ${COMMANDER_SERVER} login admin changeme
echo "Logged into the server"

export COMMANDER_HOME=/opt/electriccloud/electriccommander
export antPath=/opt/electriccloud/CommanderSDK6/tools/ant/bin/ant

echo "Building plugin"
#$antPath build deploy package.post
$antPath build
