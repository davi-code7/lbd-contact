const OrchyBase = require("orchy-base-code7");

("use strict");

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

module.exports.contact = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  const message = JSON.parse(body.Message);

  console.log("message:", message);

  const orchybase = new OrchyBase.default(true);

  const eventTypeArr = ["SMS", "HSM", "Email"];
  const dataTypeArr = ["cellular", "landline", "email"];

  const contactComplements = message.contact_complement.map((complement) => ({
    field: complement.field,
    value: complement.value,
  }));

  const conditionsArr = contactComplements.map(() => ({
    context: `${randomNumber(1, 100000)}`,
    operator: `${randomNumber(1, 100000)}`,
    value: `${randomNumber(1, 100000)}`,
    destination: `${randomNumber(1, 100000)}`,
    variable: `${randomNumber(1, 100000)}`,
  }));

  const escapeArr = contactComplements.map(() => ({
    context: `${randomNumber(1, 100000)}`,
    operator: `${randomNumber(1, 100000)}`,
    value: `${randomNumber(1, 100000)}`,
    destination: `${randomNumber(1, 100000)}`,
    variable: `${randomNumber(1, 100000)}`,
  }));

  const contactObj = {
    api_key: message.key,
    id_contact_data: randomNumber(1, 100000),
    id_load: message.load.id_load,
    id_flow: message.load.id_flow,
    id_item: `${randomNumber(1, 100000)}`,
    schedule: new Date(),
    contact: [
      {
        name: message.name,
        cpf: message.key,
        complement: contactComplements,
      },
    ],
    event_type: eventTypeArr[randomNumber(0, 2)],
    data_type: dataTypeArr[randomNumber(0, 2)],
    contact_data: `Contact Data ${randomNumber(1, 100000)}`,
    state: "pending",
    message: `Message ${randomNumber(1, 100000)}`,
    sent: new Date(),
    conditions: conditionsArr,
    escape: escapeArr,
  };

  await orchybase.createQueueContact(contactObj);
};
