.PHONY: install install/immutable build watch lint fix/eslint fix/prettier fix

install:
	yarn install

install/immutable:
	yarn install --immutable

build: install/immutable
	yarn node -r esbuild-register build.ts

watch: install/immutable
	WATCH=true $(MAKE) build

lint: install/immutable
	yarn eslint "**/*.ts"

fix/eslint:
	yarn eslint "**/*.ts" --fix

fix/prettier:
	yarn prettier --check --write "**/*.ts"

fix: install/immutable
	$(MAKE) fix/prettier
	$(MAKE) fix/eslint
