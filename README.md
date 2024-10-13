# Gemini Nano Wrapper - A client-side built-in AI Model for the web browser [Chrome]

A lightweight wrapper for the Gemini Nano package, designed to simplify interactions and streamline the integration process. This wrapper enhances usability by providing a more intuitive interface for utilizing Gemini Nano's features.

This Wrapper is built on top of the browser's in-built Gemini nano which is window.ai just plug it and start using prompts.

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
## API

The following are the API Interface:
### constructor
 ```ts
interface CustomCapabilities {
    topK : Number,
    temperature : Number
}

constructor(customCapabilities?: CustomCapabilities )
```

### Methods

Checks environment for required specification and Create a session for prompting( pass assistant) or summarize(pass summarizer) returns session created sucessfully or not
 ```ts
 public async createSession(sessionType: "assistant" | "summarizer" = "assistant"): Promise<boolean>
```

closes a session : please close session every time for better browser performace
 ```ts
public closeSession(): void 
```

use this for prompting this will automatically checks browser requirement and checks the eligibilty for gemini nano and creates and closes a session for every prompt call 
 ```ts
public async prompt(query: string): Promise<{ response: any } | void>
```

use this for getting summury this will automatically checks browser requirement and checks the eligibilty for gemini nano and creates and closes a session for every prompt call 
 ```ts
public async summarizer(query: string): Promise<{ response: any } | void>
```

## Examples

```js
import GeminiNano from "gemini-nano-prompt";

class Prompt {
   constructor() {}
   async getFAQs(listOfTopics, question) {
    let geminiNano = new GeminiNano()
    let prompt = `Answer the Questions Only related topics which is : ${listOfTopics} The Question is : ${question} if is not relavent topics: ${listOfTopics} Rspond with a Apology note`;
    console.log(prompt);

    let result = await geminiNano.prompt(prompt)
    return result;
   }
}

const prompt = new Prompt();
export default prompt
```

![image](https://github.com/user-attachments/assets/841aca42-ea4e-46d6-987f-9f5059c256f4)



# Contributing

Thank you for considering contributing to **My Project**! We appreciate your help in making this project better. Here are some guidelines to help you get started.

## How to Contribute

### 1. Fork the Repository

1. Click the "Fork" button at the top right of this page.
2. This will create a copy of the repository in your GitHub account.

### 2. Clone the Forked Repository

Clone your forked repository to your local machine using the following command:

```bash
git clone [https://github.com/your-username/my-project.git](https://github.com/Rajath2000/gemini-nano-web.git)
```
### 3. Install dependency

```bash
npm install
```

### 4.Make changes, commit, create a pull request.

# License

This project is licensed under the [ISC License](LICENSE).

## ISC License

ISC License

Copyright (c) [2024] [Rajath M R]

Permission to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, is hereby granted, free of charge, subject to the following conditions:

THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.






