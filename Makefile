RUN_AWS_CLI := docker run -it --rm \
		-v $(shell pwd):/workspace \
		-v ~/.aws:/root/.aws \
		-e "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" \
		-e "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" \
		-e "AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}"\
		mesosphere/aws-cli

VERSION = $(shell git rev-parse --short=7 HEAD)

node_modules:
	@npm install

api/node_modules:
	@cd api && npm install

prepare: node_modules api/node_modules

api/dist: prepare
	@cd api && npm run build

api-$(VERSION).zip: api/dist
	@cd api/dist && zip -r ./../../api-$(VERSION).zip *

.PHONY: publish-lambda
upload-lambda: api-$(VERSION).zip
	@$(RUN_AWS_CLI) s3 cp /workspace/api-$(VERSION).zip s3://hyf-api-deploy/api-$(VERSION).zip

.PHONY: publish-api
publish-api: clean upload-lambda
	@$(RUN_AWS_CLI) lambda update-function-code --s3-bucket=hyf-api-deploy --s3-key=api-$(VERSION).zip --publish --function-name=gateway_proxy &> /dev/null && \
	echo "Function updated"

dist: node_modules
	@npm run generate

.PHONY: upload-web
upload-web: dist
	@$(RUN_AWS_CLI) s3 cp /workspace/dist s3://hyf-website --recursive

.PHONY: publish
publish: publish-api upload-web

.PHONY: clean
clean:
	@rm -rf api/dist node_modules api/node_modules
