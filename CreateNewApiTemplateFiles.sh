for i in $API_COMMANDS
do
	if [ ! -f htdocs/templates/$i.tmp ]
	then
		echo creating $i.tmp
		echo "$i()" > htdocs/templates/$i.tmp
	fi
done
