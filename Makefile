lint: # запускает линтер
	npx eslint .
install: # ботва для создания воспроизводимой сборки 
	npm ci
test: # запускает тесты
	npm test .
