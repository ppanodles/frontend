module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src'],
			},
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-hooks',
	],
	rules: {
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
		'react/destructuring-assignment': 'off',
		'import/no-extraneous-dependencies': 'off',
		'react/require-default-props': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/prop-types': 'off',
		// camelcase: 'off',
		indent: [2, 'tab'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'no-tabs': 'off',
		'import/no-unresolved': 'warn',
		'object-curly-spacing': 'off',
		'react/jsx-filename-extension': [1, {extensions: ['.tsx']}],
		'import/extensions': 'off',
		// 'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: false}],
		'react/jsx-props-no-spreading': 'off',
		'no-autofocus': 'off',
		'max-len': ['error', {code: 300}],
		'no-underscore-dangle': 'off',
		'jsx-a11y/label-has-associated-control': [2, {assert: 'either', depth: 25}],
		'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
		'react-hooks/exhaustive-deps': 'warn', // Проверяем зависимости эффекта
		'react/react-in-jsx-scope': 0,
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [
				'state',
			],
		}],
	},
};
