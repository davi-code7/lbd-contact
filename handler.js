const OrchyBase = require("orchy-base-code7");

("use strict");

module.exports.contact = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  const message = JSON.parse(body.Message);

  console.log("message:", message);

  const orchybase = new OrchyBase.default(true);

  orchybase.createQueueContact({
    api_key: message.key,
    id_contact_data: "test",
    id_load: message.load.id_load,
    id_flow: message.load.id_flow,
    id_item: "test",
    schedule: new Date(),
    contact: {
      name: message.name,
    },
  });
};
