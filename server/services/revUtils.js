const service = {};

service.isRevved = path => {
  const fn = service.extractFilename(path);
  const splitted = fn.split('.');

  if (splitted.length > 2) {
    const hash = splitted[1];
    return service.isHash(hash);
  }

  return false;
};

service.extractFilename = path => {
  const splitted = path.split('/');
  return splitted[path.split('/').length - 1];
};

service.isHash = hash => {
  const regEx = /[0-9A-Fa-f]/;
  return regEx.test(hash);
};
