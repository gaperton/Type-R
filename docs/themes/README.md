# daux-api-docs-theme

Modified [daux](http://daux.io/) theme for API documentation.

## Installation

`npm install daux-api-docs-theme --save-dev`

And add the following to your daux documentation `config.json`

    "themes_directory": "node_modules/daux-api-docs-theme",
    "html": {
        "theme": "daux-navy",
        "float": false,

## Features

- Fixed content width with inline code examples. Code floating must be turned off.
- `#` - Separate disconnected section
- `##` - Subsection
- `###` - API entry. Use it for methods and variables.
- `####` - Subsections inside of API entries
