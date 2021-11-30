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
		"brace-style": ["error", "1tbs", { "allowSingleLine": false }],
		"quotes": ["error", "double"],
		"quote-props": ["error", "consistent"],
		"object-curly-spacing": ["error", "always"],
		"semi": ["error", "always"],
		"react/jsx-closing-bracket-location": ["error", { "selfClosing": "tag-aligned", "nonEmpty": "tag-aligned" }],
		"react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
		"react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
		"react/prop-types": "off"
	},
	"settings": {
		"react": {
			"version": "detect",
		}
	},
	"ignorePatterns": ["build/*"],
};
