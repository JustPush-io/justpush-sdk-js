import JustPushMessage from '../services/JustPushMessage.js'

const test = async () => {
    try {
        const justPushMessage = JustPushMessage.token('ACCESS_TOKEN')
            .topic('Image test1"')
            .message('Here is a sample Message10')
            .image(
                'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
                'Test caption'
            )
            .image(
                'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
                'Test caption'
            )
            .image(
                'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
                'Test caption'
            )
            .image(
                'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
                'Test caption'
            )
            .image(
                'https://i2.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/what-is-a-hyperlink-with-pictures-UDZ66a-clipart.jpg?fit=1000%2C740&ssl=1',
                'Test caption'
            )
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
        const message = await JustPushMessage.token('ACCESS_TOEKN')
            .key(messageKey)
            .get()

        console.log('Fetched message data:', JSON.stringify(message, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

export { test }
