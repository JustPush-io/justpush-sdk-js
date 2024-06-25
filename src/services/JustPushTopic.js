import JustPushBase from '../utils/JustPushBase.js'

class JustPushTopic extends JustPushBase {
    static ENDPOINT = '/topics'

    constructor(token) {
        super()
        this.setToken(token)
        this.topicParams = {}
        this.topicUuid = null
    }

    static token(token = '') {
        return new JustPushTopic(token)
    }

    title(title = 'Default') {
        this.topicParams['title'] = title
        return this
    }

    topic(topicUuid = null) {
        this.topicUuid = topicUuid
        return this
    }

    avatar(url = null, body = null) {
        if (url && body) {
            throw new Error('Only one of url or body can be set.')
        }

        if (url) {
            this.topicParams['avatar'] = { external_url: url }
        }

        if (body) {
            this.topicParams['avatar'] = { body: body }
        }

        return this
    }

    async create() {
        return await this.request(JustPushTopic.ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.topicParams),
        })
    }

    async get() {
        if (!this.topicUuid) {
            throw new Error('Topic UUID must be set before calling get.')
        }
        return await this.request(
            `${JustPushTopic.ENDPOINT}/${this.topicUuid}`,
            {
                method: 'GET',
            }
        )
    }

    async update() {
        if (!this.topicUuid) {
            throw new Error('Topic UUID must be set before calling update.')
        }
        console.log(JSON.stringify(this, null, 4))
        return await this.request(
            `${JustPushTopic.ENDPOINT}/${this.topicUuid}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.topicParams),
            }
        )
    }

    getTopicParams() {
        return this.topicParams
    }
}

export default JustPushTopic
