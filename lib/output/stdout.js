module.exports = argv => v => {
  const print0 = argv['print0'];

  process.stdout.write(JSON.stringify(v));

  if (print0) {
    process.stdout.write('\0');
  }
  else {
    process.stdout.write('\n');
  }
};
