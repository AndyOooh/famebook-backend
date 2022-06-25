export const getEvents = (req, res, next) => {
  res.status(200).json({ message: 'connected to backend' });
  // TODO: get req to DB to fetch all user events (should be an array).
};

export const postEvents = (req, res, next) => {
  const { name, location, date } = req.body;
  const userId = req.userId; // there is not a userId on the req body yet. Will have to attach it in isAuth.
  console.log('req.userId', userId)
  // TODO: change frontend to send teh event data to backend intead of storing in localStorage. Send from BE to DB.
};
