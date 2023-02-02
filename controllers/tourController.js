const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, value) => {
  const id = value * 1;

  if (id > tours[tours.length - 1].id) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // resource name: data variable
      tours: tours
    }
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((item) => item.id === Number.parseInt(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
};

exports.createNewTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: '<Updated tour here...>'
    }
  });
};

exports.deleteTourById = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
