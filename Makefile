
GENERATOR_URL = http://framergenerator-update.s3-website-us-east-1.amazonaws.com
GENERATOR_LATEST_PATH = $(shell curl $(GENERATOR_URL)/latest.txt)

dist:
	rm -Rf build
	mkdir -p build
	 
	 # Download the Framer lib
	 wget -O build/Framer.zip http://builds.framerjs.com/latest/Framer.zip
	 cd build; unzip Framer.zip

	 # Download the Generator
	 @echo $(GENERATOR_LATEST_PATH)
	 wget -O build/FramerGenerator.tar.gz "$(GENERATOR_URL)/$(GENERATOR_LATEST_PATH)"
	 cd build; tar -zxvf FramerGenerator.tar.gz
	 cd build; mv "Framer Generator.app" "Framer/Framer Generator.app"
	 
	 cd build; zip -r Framer.zip Framer
	 cp build/Framer.zip static/downloads/Framer.zip
