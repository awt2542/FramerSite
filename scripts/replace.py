# ./static/examples/GoogleNow/framer/framer.js
# ./static/examples/Intro/framer/framer.js
# ./static/examples/NewsFeed/framer/framer.js
# ./static/js/framer.js

import os
import sys
import subprocess

scripts = subprocess.check_output("find ./static -name 'framer.js'", shell=True).splitlines()

if not os.path.exists("./Framer/build/framer.js"):
	print "Build Framer first"
	sys.exit()

for script in scripts:
	cmd = "rm '%s'" % script
	os.system(cmd)
	cmd = "cp ./Framer/build/framer.js '%s'" % script
	os.system(cmd)