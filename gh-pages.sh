#!/usr/bin/env bash
sh ./build.sh
rm -rf dist
mkdir dist
cp -r build dist/build
cp -r example dist/example
cp -r tutorial dist/tutorial
./node_modules/.bin/replace '/node_modules/reveal.js/' 'https://a.alipayobjects.com/reveal/3.1.0/' dist/tutorial -r --include="*.html"
gh-pages -d dist