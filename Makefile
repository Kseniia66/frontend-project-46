install:
	npm ci

gendiff:
	node bin/gendiff.js

make lint:
	npx eslint .
	
test:
	npm test

test-coverage:
	npm test -- --coverage