import os
import sys
import urllib2
import shutil

basePath = os.path.dirname(__file__)
buildPath = os.path.join(basePath, "..", "build")

appVersionServer = "http://framer-update.s3-website-us-east-1.amazonaws.com"

latestAppVersionLink = urllib2.urlopen("%s/archive/latest.txt" % appVersionServer).read()
latestAppVersionLink = appVersionServer + "/" + latestAppVersionLink

try: shutil.rmtree(buildPath) 
except: pass

os.mkdir(buildPath)
os.chdir(buildPath)
os.mkdir("Framer")

# Part one, add the latest app version

os.system("curl -O '%s'" % latestAppVersionLink)

fileName = os.path.split(latestAppVersionLink)[1]

os.system("tar -zxvf '%s'" % fileName)
os.system("mv 'Framer.app' Framer")

# Part two, add the latest template
os.system("cp -R ../Framer/build/Framer Framer/Template")
os.system("zip -r Framer.zip Framer")

# Add it to the download folder
os.system("cp Framer.zip ../static/downloads")

# Zip up the jsx (for windows users)
os.system("cp Framer/Framer.app/Contents/Resources/psjs/scripts/FramerPS.jsx ./")
os.system("zip FramerPS.jsx.zip FramerPS.jsx")
os.system("cp FramerPS.jsx.zip ../static/downloads")