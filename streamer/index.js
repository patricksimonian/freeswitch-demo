
const WebSocket = require('ws');
// const speech = require('@google-cloud/speech');
// const client = new speech.SpeechClient();

const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 8000,
    languageCode: 'en-US',
};

const request = {
    config,
    interimResults: true,
};

async function streamAudio() {
    try {

        const ws = new WebSocket('ws://oreka:9000/live');

        // const recognizeStream = client
        //     .streamingRecognize(request)
        //     .on('data', data => {
        //         console.log(
        //             data.results[0] && data.results[0].alternatives[0]
        //                 ? `Transcript: ${data.results[0].alternatives[0].transcript}`
        //                 : '\nReached transcription time limit, restarting...'
        //         );
        //     })
        //     .on('error', console.error)
        //     .on('end', () => console.log('Transcription ended.'));

        ws.on('open', () => console.log('Connected to OrecX live stream'));

        ws.on('message', chunk => {
            // recognizeStream.write(chunk);
            console.log(`Received chunk: ${chunk.length} bytes`);
        });

        ws.on('close', () => {
            // recognizeStream.end();
            console.log('WebSocket connection closed.');
        });
    } catch (error) {
        console.error('Error in streamAudio:', error);
    }
}

streamAudio().catch(console.error);
