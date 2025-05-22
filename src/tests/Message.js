import { JustPushMessage } from "../services/JustPushMessage.js";
import { ACCESS_TOKEN } from "./TestConstants.js";

const IMAGE_PAYLOAD = ["https://picsum.photos/800/600", "Test caption"];

const sendSimpleTextMesage = async () => {
  console.log("Send simple text message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a sample Message")
    .create();
};

const sendImageMesage = async () => {
  console.log("Send image message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a massage with images")
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .image(IMAGE_PAYLOAD[0], IMAGE_PAYLOAD[1])
    .create();
};

const sendAckMesage = async () => {
  console.log("Send ack message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a message with ack")
    .acknowledge(true, "https://www.google.ro")
    .create();
};

const sendButtonsMessage = async () => {
  console.log("Send button message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("Q5 Tracker")
    .title("Test Title")
    .message("Here is a message with ack")
    .acknowledge(true, "https://www.google.ro")
    .button("Button 1", "https://google.com", true)
    .create();
};

const sendButtonGroupsMessage = async () => {
  console.log("Send button groups message...");
  return await JustPushMessage.token(ACCESS_TOKEN)
    .topic("TestTopic")
    .title("Test Title")
    .message("Here is a message with button groups")
    .buttonGroups([
      {
        name: "Group 1",
        cta: "Group 1 Cta",
        action_required: true,
        buttons: [
          {
            cta: "Button 1",
            url: "https://google.com",
            requires_action: true,
          },
          {
            cta: "Button 2",
            url: "https://google.com",
            requires_action: true,
          },
          {
            cta: "Button 3",
            url: "https://google.com",
            requires_action: true,
          },
        ],
      },
      {
        name: "Group 2",
        cta: "Group 2 Cta",
        action_required: true,
        buttons: [
          {
            cta: "Button 1",
            url: "https://google.com",
            requires_action: true,
          },
          {
            cta: "Button 2",
            url: "https://google.com",
            requires_action: true,
          },
          {
            cta: "Button 3",
            url: "https://google.com",
            requires_action: true,
          },
        ],
      },
    ])
    .create();
};

const getMessage = async (messageKey) => {
  console.log("Get message...", messageKey);
  return await JustPushMessage.token(ACCESS_TOKEN).key(messageKey).get();
};

const test = async () => {
  try {
    await sendSimpleTextMesage();
    await sendImageMesage();
    await sendAckMesage();
    await sendButtonGroupsMessage();
    const lastMessage = await sendButtonsMessage();

    // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 8000));

    // Retrieve the message
    await getMessage(lastMessage.key);
  } catch (error) {
    console.error("Error:", error);
  }
};

test();
