const service = {};

service.isRevved = path => {
  const fn = service.extractFilename(path);
  const splitted = fn.split('.');

  if (splitted.length > 2)
    return service.isHash(splitted[1]);

  return false;
};

service.extractFilename = path => path.split('/')[path.split('/').length - 1];

service.isHash = hash => /[0-9A-Fa-f]/.test(hash);
