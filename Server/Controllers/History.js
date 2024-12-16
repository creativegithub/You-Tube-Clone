import History from "../Models/history.js";

export const historycontroller = async (req, res) => {
  const historydata = req.body;
  const addtohistory = new History(historydata);

  try {
    await addtohistory.save();
    res.status(200).json("Added to history");
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getallhistorycontroller = async (req, res) => {
  try {
    const files = await History.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const deletehistory = async (req, res) => {
  const { userId: userId } = req.params;

  try {
    await History.deleteMany({
      viewer: userId,
    });
    res.status(200).json({ message: "Removed from history" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
