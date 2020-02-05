const service = {};

service.json = (res, status, json, message) => {
  res.status(status);
  
  if (json)
    res.json(json);
  
  if (message)
    res.statusMessage = message;
};

module.exports = service;
