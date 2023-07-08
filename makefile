deploy-prod:
	npm run build & sls deploy --stage prod

deploy-dev:
	npm run build & sls deploy --stage develop

deploy-offline:
	npm run build & sls offline start

setup-app:
	sls --org=guerreiroleonardo
