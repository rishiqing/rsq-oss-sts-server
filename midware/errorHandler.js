const createError = require('http-errors')

const init = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404, 'not found!'))
  });


  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    const statusCode = err.statusCode || 500

    if(statusCode === 500){
      global.logger.error('system error url: %s \nerr: %s', req.url, err.stack)
    }
    res.status(statusCode);
    res.json({errcode: statusCode});
    next()
  })
}

module.exports.init = init