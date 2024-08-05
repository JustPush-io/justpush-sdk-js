import JustPushTopic from '../services/JustPushTopic.js'
import { ACCESS_TOKEN } from './TestConstants.js'

const test = async () => {
    try {
        console.log('Create topic...')
        const justPushTopic = JustPushTopic.token(ACCESS_TOKEN)
            .title('My Car')
            .avatar(
                'https://images.pexels.com/photos/25961190/pexels-photo-25961190/free-photo-of-the-audi-a3-sedan-parked-in-front-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=800'
            )

        const response = await justPushTopic.create()
        console.log(
            'Topic created successfully:',
            JSON.stringify(response, null, 2)
        )

        // Wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000))

        // Retrieve the message
        const topicKey = response.uuid

        const topicGet = await JustPushTopic.token(ACCESS_TOKEN)
            .topic(topicKey)
            .get()

        console.log('Get topic data:', JSON.stringify(topicGet, null, 2))

        const topic = await JustPushTopic.token(ACCESS_TOKEN)
            .topic(topicKey)
            .update()

        console.log('Updated topic data:', JSON.stringify(topic, null, 2))
    } catch (error) {
        console.error('Error:', error)
    }
}

test()
