const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { array } = require("joi");
const { senderSchema } = require("./Sender");
const { receiverSchema } = require("./Receiver");
const { paymentSchema } = require("./PaymentType");

const orderSchema = mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourierStates",
    required: false,
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  courierType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourierType",
  },
  packageType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackageType",
  },
  trackingId: {
    type: String,
    unique: true,
    minLength: 4,
  },
  packageSize: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "small",
    required: true,
  },
  senderDetails: {
    type: senderSchema,
    default: {},
  },
  receiverDetails: {
    type: receiverSchema,
    default: {},
  } /* */,
  orderTotal: {
    type: Number,
    min: 0,
  },
  paymentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentType",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// geo-coder and create location field
/* orderSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();
});

 orderSchema.post("update", async function (next) {
  console.log("update one worked");
  next();
}); */

// input validation
/* const orderValidation = (order) => {
  const schema = Joi.object({
    shopId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
    orderItems: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        unitPrice: Joi.number().required(),
        discount: Joi.number(),
        lineTotal: Joi.number().required(),
      })
    ),
    address: Joi.string().max(255).required(),
    contactNo: Joi.array().items(Joi.string().min(8)),
    orderType: Joi.string().required(),
  });
  return schema.validate(order);
}; */

const orderValidation = (order) => {
  const schema = Joi.object({
    // statusId: Joi.objectId(),
    statusId: Joi.optional(),
    courierType: Joi.objectId().required(),
    packageType: Joi.objectId().required(),
    packageSize: Joi.string(),
    senderDetails: Joi.required(),
    receiverDetails: Joi.required(),
    orderTotal: Joi.number(),
    paymentType: Joi.objectId().required(),
    status: Joi.objectId(),
    rider: Joi.objectId(),
  });
  return schema.validate(order);
};

const Order = new mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  orderValidation,
  orderSchema,
};

/* exports.Order = Order;
exports.OrderSchema = orderSchema;
exports.orderValidation = orderValidation;
 */
