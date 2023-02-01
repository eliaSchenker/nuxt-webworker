
.PHONY: dev
dev:
		yarn dev

.PHONY: build
build:
	yarn build
	node .output/server/index.mjs