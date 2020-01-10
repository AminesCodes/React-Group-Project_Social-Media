/*
Server Helper Functions | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


/* HELPERS */
handleError = (err, req, res, next) => {
  console.log("hit");
  if (res.headersSent) {
    console.log("err: res headers already exist. passing error to express");
    return next(err);
  }
  let [ code, msg ] = err.message.split('__');
  if (!msg) {
    msg = code;
  }
  console.log(code[0] === '4' ? "(front)" : "(back)", msg);
  if (code.length === 3 && !isNaN(code)) {
    code = parseInt(code);
    res.status(code);
  } else res.status(500);
  res.json({
      status: "fail",
      message: msg,
      payload: null
  });
};


module.exports = {
  handleError
}
