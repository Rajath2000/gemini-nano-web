# Gemini Nano Wrapper - A client-side built-in Model for web browser [Chrome]

A lightweight wrapper for the Gemini Nano package, designed to simplify interactions and streamline the integration process. This wrapper enhances usability by providing a more intuitive interface for utilizing Gemini Nano's features.

This Wrapper built on top of browser's in-built Gemini nano which is window.ai just plug it and start using prompts.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation
Since this is an experimental feature, for the initial setup please [Refer the documentation](https://medium.com/@akashtdev/chromes-gemini-nano-and-window-ai-for-offline-ai-28231a716c0b),
Please make sure the code is running in your local browser this setup is not for the server.

To install the Gemini Nano Wrapper, use npm:
```bash
npm install gemini-nano-prompt
```


## Usage

Let's start, It's simple to use:

```js
import GeminiNano from "gemini-nano-prompt";

let geminiNano = new GeminiNano();

let response = await geminiNano.prompt("Hi What is Gemini Nano");

console.log("This is a GPT response :", response);
```

