# DALL-E 2 Clone - Text-to-Image Generation Web App

DALL-E 2 is a cutting-edge web application that harnesses the power of AI to generate images from text descriptions. Inspired by Stable Defusion 2.1, this app allows users to unleash their creativity by converting textual ideas into stunning visual artwork.

![Image Description](https://github.com/shuvra-matrix/images/blob/main/Screenshot%202024-01-28%20095127.png?raw=true)

## Live Demo

[https://dalle2ai.netlify.app/](https://dalle2ai.netlify.app/)

## Features

- **Text-to-Image Generation:** Input a text description, and DALL-E 2 will generate an image that matches your description.

- **Hugging Face API Integration:** Utilizes the Hugging Face API to power the image generation process with the Stable Defusion 2.1 model.

## Technologies Used

- **Backend:** Developed with Node.js
- **Frontend:** Built using React.js
- **Database:** MongoDB for data storage
- **External API:** OpenAI API via RapidAPI

## Installation

To run DALL-E 2 locally, follow these steps:

1.  Clone the DALL-E 2 repository to your local machine:
    ```bash
    git clone https://github.com/shuvra-matrix/DALL-E-2-Clone--MERN-.git
    ```
2.  Navigate to the server folder and install the dependencies by running:

    ```bash

    cd server
    npm install

    ```

3.  Set up the environment variables:

    ```bash

    export MONGO_USER=<mongodb-username>
    export MONGO_PASS=<mongodb-password>
    export API_KEY=<HUGGING FACE KEY>

    ```

4.  Start the server by running:

        ````bash
        npm start

        ```

    > The server will run on port 3030.

5.  Open a new terminal, navigate to the public folder and install the dependencies:

    ```bash
    cd ../public
    npm install

    ```

6.  Set up the environment variable for the frontend:

    ```bash

    export REACT_APP_API_KEY=<auth-key-to-connect-with-server>

    ```

7.  Start the frontend by running:

    ```bash
    npm start

    ```

> The frontend will run on port 3000.

1. Open your web browser and access DALL-E 2 Clone by entering `http://localhost:3000` in the address bar.

## Usage

1. Input a text description in the provided field.

2. Click the "Generate" button, and DALL-E 2 will create an image based on your description.

3. Save and share your generated images to inspire and amaze others!

4. If you don't remember any prompt then click surprise me and generate.

## Model Transition

Previously, I used Open AI DALL-E 2 model. Due to some API-related issues, we have transitioned to the Stable Defusion 2.1 model. This change ensures a more stable and reliable experience for our users.

## Thank You, HuggingFace and StabilityAi

I want to express our gratitude to HuggingFace and Stabilityai for their groundbreaking research and for providing access to the incredible Stable Diffusion v2-1 Model through their HuggingFace Inference API. This project would not have been possible without Stabilityai contributions to the field of artificial intelligence.

## Disclaimer

Please note: DALL-E 2 is intended for entertainment and creative purposes. It should not be used to create misleading or harmful content. Users are responsible for the content they generate and share. Respect copyright and use the app responsibly within legal boundaries.

The images generated by DALL-E 2 are the result of AI algorithms and may not always reflect real-world accuracy. Always exercise critical judgment when using the generated images, and remember that they are artistic interpretations.
