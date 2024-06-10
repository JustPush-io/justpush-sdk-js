import JustPushMessage from './src/services/JustPushMessage.js'

const test = async () => {
    try {
        // Create a new message
        const justPushMessage = JustPushMessage.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .message('Here is a sample Message')
            .title('Test Title')
            .lowPriority()
            .button('Button 1', 'https://google.com', true)

        const response = await justPushMessage.create()
        console.log(
            'Message created successfully:',
            JSON.stringify(response, null, 2)
        )

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000))

        // Retrieve the message
        const messageKey = response.key
        const message = await JustPushMessage.token(
            '7W6rAhothzVrT6CBqMmtPiDukjhWJXKU'
        )
            .key(messageKey)
            .get()

        console.log('Fetched message data:', JSON.stringify(message, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

export { test }
