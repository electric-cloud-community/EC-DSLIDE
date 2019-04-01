def list = []
def commands = args.commands.split('\n')

commands.each { command -> 
  evalDsl (dsl: command, describe: true).value.split('\n').each { desc ->
    def attributeLine = (desc =~ '\\* (\\w+):')
    if (attributeLine) {
      def attribute = attributeLine[0][1]
      if (!(attribute in list)) {list.push(attribute)}
    }
  }
}
"var dsl_func_keywords = words( \"" + list.join(" ") + "\" );"