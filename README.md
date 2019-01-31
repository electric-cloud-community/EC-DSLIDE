# EC-DSLIDE

ElectricFlow DSL web-based editor and runner

The DSL IDE is an ElectricFlow plugin.  The plugin jar file is located in the 'out' directory. Once installed, the "DSL IDE" tab will appear on the ElectricFlow page.  It may be necessary to login to the ElectricFlow server again when launching the IDE.  Select the question mark icon for help.

This tool was developed during and Electric Cloud hackathon in August 2015.  While we feel it is useful in its current form, it is provided "as is" with no commitment to further support.  Please feel free to offer suggestions in the form of Github project "Issues" and we or others in the Github community will try to address them.

## Installation information
* Download out/EC-DSLIDE.jar
* From the ElectricFlow Administration, Plugin Tab, install this plugin file, then promote it

## Support information
This tool was developed with the ElectricFlow SDK 6.0.

While this tool has had very little formal testing, the web-based DSL editor is used extensively by the field engineers for editing and running DSL scripts.

### Known Issues
* The tool uses the ElectricFlow REST API.  Some users have experienced problems accessing the REST documentation and API; the workaround is to place the file restapi.conf (in the same directory as this README file) in the ElectricFlow Apache conf/conf.d directory and restart the commanderApache service.

* Works well on Chrome and Firefox.  It does not seem to run on Internet Explorer.

## Acknowledgements
This tool was build on top of https://github.com/codemirror/CodeMirror.  We greatly appreciate the contributions of the authors of Codemirror.

## Licensing ##
EC-DSLIDE is licensed under the Apache License, Version 2.0. See [LICENSE](https://github.com/electric-cloud/EC-DSLIDE/blob/master/LICENSE) for the full license text.

