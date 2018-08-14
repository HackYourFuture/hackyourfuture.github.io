
RUN_TRAVIS_AWS_CLI := docker run -it --rm \
		-v $(shell pwd):/workspace \
		-v ~/.aws:/root/.aws \
		-e "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" \
		-e "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" \
		-e "AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}"\
		mesosphere/aws-cli

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

upload-lambda: api-$(VERSION).zip
	@$(RUN_AWS_CLI) s3 cp /workspace/api-$(VERSION).zip s3://hyf-api-deploy/api-$(VERSION).zip

publish-api: clean upload-lambda
	@$(RUN_AWS_CLI) lambda update-function-code --s3-bucket=hyf-api-deploy --s3-key=api-$(VERSION).zip --publish --function-name=gateway_proxy

upload-lambda-travis: api-$(VERSION).zip
	@$(RUN_TRAVIS_AWS_CLI) s3 cp /workspace/api-$(VERSION).zip s3://hyf-api-deploy/api-$(VERSION).zip

dist: node_modules
	@npm run generate

upload-web-travis: dist
	@$(RUN_TRAVIS_AWS_CLI) s3 cp /workspace/dist s3://hyf-website --recursive

publish-api-travis: clean upload-lambda-travis
	@$(RUN_TRAVIS_AWS_CLI) lambda update-function-code --s3-bucket=hyf-api-deploy --s3-key=api-$(VERSION).zip --publish --function-name=gateway_proxy

publish: publish-api

publish-travis: publish-api-travis upload-web-travis

.PHONY: clean
clean:
	@rm -rf api/dist node_modules api/node_modules
