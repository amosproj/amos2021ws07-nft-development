module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"jest": true,
		"amd": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": ["error", "tab"],
		"brace-style": ["error", "1tbs", { "allowSingleLine": false }]
	},
	"settings": {
		"react": {
			"version": 'detect',
		}
	}
};
