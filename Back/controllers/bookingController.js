const Booking = require("../models/bookingModel");
const getBookings = async (requestAnimationFrame, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// create booking
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    if (!booking) {
      res.status(400);
      throw new Error("cannot create booking");
    }
    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const update = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!update) {
      res.status(400);
      throw new Error("Cannot create booking");
    }
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const deletee = await Booking.findByIdAndDelete(req.params.id);
    if (!deletee) {
      res.status(400);
      throw new Error("Cannot delete room");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(400);
      throw new Error("booking not found");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
