import likedvideo from "../Models/likedvideo.js";

export const likedvideocontroller = async (req, res) => {
  const likedvideodata = req.body;
  const addtolikedvideo = new likedvideo(likedvideodata);
  try {
    await addtolikedvideo.save();
    res.status(200).json("Added to watchlater");
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getalllikedvideocontroller = async (req, res) => {
  try {
    const files = await likedvideo.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deletelikedvideo = async (req, res) => {
  const { videoid: videoid, viewer: viewer } = req.params;

  try {
    await likedvideo.findOneAndDelete({
      videoid: videoid,
      viewer: viewer,
    });
    res.status(200).json({ message: "Removed from watch later" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
