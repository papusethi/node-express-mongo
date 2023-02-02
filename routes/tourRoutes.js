const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID);

// create a checkBody middleware
// Check if body contains the name and price property
// if not, send back 400 ( bad request )
// add it to the post handler stack

router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createNewTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = router;
