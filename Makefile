dist:
	make gitupdate
	python scripts/dist.py

examples:
	cd static/examples; rm NewsFeed.zip; zip -r NewsFeed.zip ./NewsFeed*
	cd static/examples; rm Intro.zip; zip -r Intro.zip ./Intro*
	cd static/examples; rm GoogleNow.zip; zip -r GoogleNow.zip ./GoogleNow*

optimize:
	find . -name "*.png" -exec optipng -o3 {} \;

upload:
	cactus deploy

gitupdate:
	rm -Rf Framer
	git submodule init
	git submodule update
	cd Framer; rm build/framer.js; git checkout master; git pull; npm install;
	cd Framer; make dist

jsupdate:
	find . -name "framer.js" -exec cp Framer/build/framer.js {} \;

.PHONY: examples optimize deploy