const Joi = require("joi");

//user validation

exports.validateParcel = (parcel) => {
  const schema = Joi.object().keys({
    sender: Joi.string().min(3).max(200).required(),
    parcel_label: Joi.string().min(3).max(30).required(),
    location_from: Joi.string().min(2).required(),
    location_to: Joi.string().min(2).required(),
    date_send: Joi.date().required(),
    recipient_name: Joi.string().min(2).required(),
    recipient_email: Joi.string().min(3).max(30).email(),
    recipient_number: Joi.string(),
    parcel_amount: Joi.number().required(),
  });

  return schema.validate(parcel);
};
