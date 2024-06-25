import JustPushTopic from '../services/JustPushTopic.js'

const test = async () => {
    try {
        const justPushTopic =
            JustPushTopic.token('ACCESS_TOEKN').title('Image test1')

        const response = await justPushTopic.create()
        console.log(
            'Topic created successfully:',
            JSON.stringify(response, null, 2)
        )

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000))

        // Retrieve the message
        const topicKey = response.uuid

        const topicGet = await JustPushTopic.token('ACCESS_TOEKN')
            .topic(topicKey)
            .get()

        console.log('Get topic data:', JSON.stringify(topicGet, null, 2))

        const topic = await JustPushTopic.token('ACCESS_TOKEN')
            .topic(topicKey)
            .update()

        console.log('Updated topic data:', JSON.stringify(topic, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

export { test }
