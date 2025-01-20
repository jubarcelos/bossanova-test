import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';

const config = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: false,
        browser: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100, // Controla o limite da linha
          tabWidth: 2, // Indentação de 2 espaços
          singleQuote: true, // Usar aspas simples
        },
      ], // Integra Prettier
      indent: ['error', 2], // Recuo de 2 espaços
      'eol-last': ['error', 'always'], // Linha em branco ao final
      curly: ['error', 'all'], // Chaves obrigatórias
      eqeqeq: ['error', 'always'], // Sempre usar === e !==
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Permite console.warn e console.error
      'comma-dangle': ['error', 'always-multiline'], // Vírgula em listas multiline
      'arrow-parens': ['error', 'always'], // Parênteses obrigatórios em arrow functions
      'space-before-function-paren': 'off', // Prettier já gerencia isso
      '@typescript-eslint/no-explicit-any': 'warn', // Evitar "any"
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true }, // Permitir expressões sem tipo explícito
      ],
      'max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
    },
  },
];

export default config;
