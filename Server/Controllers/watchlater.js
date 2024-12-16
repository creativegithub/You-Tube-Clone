import Watchlater from "../Models/watchlater.js";

export const watchlatercontroller = async (req, res) => {
  const watchlaterdata = req.body;
  const addtowatchlater = new Watchlater(watchlaterdata);
  try {
    await addtowatchlater.save();
    res.status(200).json("Added to watchlater");
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getallwatchlatercontroller = async (req, res) => {
  try {
    const files = await Watchlater.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deletewatchlater = async (req, res) => {
  const { videoid: videoid, viewer: viewer } = req.params;

  try {
    await Watchlater.findOneAndDelete({
      videoid: videoid,
      viewer: viewer,
    });
    res.status(200).json({ message: "removed from watch later" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
