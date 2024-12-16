import Plan from "../Models/Plan.js";
import User from "../Models/Auth.js";

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserPlan = async (req, res) => {
  const { id: _id } = req.params;
  const { plan, maxDownloads } = req.body;

  try {
    const userplanupdate = await User.findByIdAndUpdate(
      _id,
      { $set: { plan, maxDownloads } },
      { new: true }
    );

    if (!userplanupdate) {
      return res.status(404).json({ message: "User not found" }); // Use 404 for not found
    }

    res.status(200).json(userplanupdate); // Return the updated user
  } catch (error) {
    console.error("Error updating user plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
