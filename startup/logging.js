module.exports = function() {
  process.on('uncaughtException', ex => {
    console.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', ex => {
    console.error(ex.message, ex);
    process.exit(1);
  });
};
