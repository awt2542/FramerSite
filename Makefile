dist:
	make gitupdate
	python scripts/dist.py

examples:
	cd static/examples; rm NewsFeed.zip; zip -r ./NewsFeed* NewsFeed.zip
	cd static/examples; rm Intro.zip; zip -r ./Intro* Intro.zip
	cd static/examples; rm GoogleNow.zip; zip -r ./GoogleNow* GoogleNow.zip

optimize:
	find . -name "*.png" -exec optipng -o7 {} \;

deploy:
	cactus deploy

gitupdate:
	rm -Rf Framer
	git submodule init
	git submodule update
	cd Framer; rm build/framer.js; git checkout framer2; git pull; npm install;
	cd Framer; make dist

.PHONY: examples optimize deploy