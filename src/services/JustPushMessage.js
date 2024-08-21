import JustPushBase from '../utils/JustPushBase.js'

class JustPushMessage extends JustPushBase {
    static ENDPOINT = '/messages'

    constructor(token) {
        super()
        this.setToken(token)
        this.messageParams = {}
    }

    static token(token = '') {
        return new JustPushMessage(token)
    }

    key(messageKey = '') {
        this.messageParams['key'] = messageKey
        return this
    }

    message(message = '') {
        this.messageParams['message'] = message
        return this
    }

    title(title) {
        this.messageParams['title'] = title
        return this
    }

    topic(topic) {
        this.messageParams['topic'] = topic
        return this
    }

    user(user) {
        this.messageParams['user'] = user
        return this
    }

    image(url, caption = null) {
        if (!this.messageParams['images']) {
            this.messageParams['images'] = []
        }
        this.messageParams['images'].push({ url, caption })
        return this
    }

    images(images) {
        images.forEach((image) => this.image(image.url, image.caption))
        return this
    }

    button(cta, url, actionRequired = false) {
        if (!this.messageParams['buttons']) {
            this.messageParams['buttons'] = []
        }
        this.messageParams['buttons'].push({ cta, url, actionRequired })
        return this
    }

    buttons(buttons) {
        buttons.forEach((button) =>
            this.button(button.cta, button.url, button.actionRequired)
        )
        return this
    }

    sound(sound) {
        this.messageParams['sounds'] = sound
        return this
    }

    priority(priority) {
        this.messageParams['priority'] = priority
        return this
    }

    highestPriority() {
        return this.priority(2)
    }

    highPriority() {
        return this.priority(1)
    }

    normalPriority() {
        return this.priority(0)
    }

    lowPriority() {
        return this.priority(-1)
    }

    lowestPriority() {
        return this.priority(-2)
    }

    expiry(expiry) {
        this.messageParams['expiry_ttl'] = expiry
        return this
    }

    acknowledge(
        requiresAcknowledgement,
        callbackUrl = null,
        callbackParams = null,
        requiresRetry = true,
        retryInterval = 60,
        maxRetries = 10,
        callbackRequired = false
    ) {
        let retryIntervalPayload = {}
        if (requiresRetry) {
            retryIntervalPayload = {
                requires_retry: requiresRetry,
                retry_interval: retryInterval,
                max_retries: maxRetries,
            }
        }
        this.messageParams['acknowledgement'] = {
            requires_acknowledgement: requiresAcknowledgement,
            callback_required: callbackRequired,
            callback_url: callbackUrl,
            callback_params: callbackParams,
            ...retryIntervalPayload,
        }
        return this
    }

    async create() {
        return await this.request(JustPushMessage.ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.messageParams),
        })
    }

    async get() {
        if (!this.messageParams['key']) {
            throw new Error('Message key must be set before calling get.')
        }
        return await this.request(
            `${JustPushMessage.ENDPOINT}/${this.messageParams['key']}`,
            {
                method: 'GET',
            }
        )
    }

    getMessageParams() {
        return this.messageParams
    }
}

export default JustPushMessage
