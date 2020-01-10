/*
Follows Route Helper Functions | Server | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


const processInput = (req, location) => {
  switch (location) {
    case "currUserId":
      if (!req.params.currUserId || isNaN(parseInt(req.params.currUserId))) {
        throw new Error("400__error: invalid parsed current user id");
      }
      return parseInt(req.params.currUserId);

    case "userId":
      if (!req.params.id || !req.params.id.trim() || isNaN(parseInt(req.params.id))) {
        throw new Error("400__error: invalid user_id parameter");
      }
      return parseInt(req.params.id);

    default:
      throw new Error("500__error: you're not supposed to be here.");
  }
}

const handleSuccess = (res, resultArray, currUserId, dataName) => {
  res.json({
    status: "success",
    message: `${dataName} of user ${currUserId} retrieved`,
    payload: resultArray.length === 1 ? resultArray[0] : resultArray
  });
}


module.exports = {
  processInput,
  handleSuccess
}
