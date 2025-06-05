/** @type {import('@hey-api/openapi-ts').UserConfig} */
module.exports = {
  enums: "typescript",
  input: "https://erp.tiny.com.br/public-api/v3/swagger/swagger.json",
  output: "./src",
  plugins: [
    {
      name: "@hey-api/typescript",
      enums: "typescript",
      exportInlineEnums: true,
    },
    {
      name: "@hey-api/schemas",
    },
    {
      name: "@hey-api/sdk",
    },
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      name: "legacy/fetch",
    },
  ],
};
