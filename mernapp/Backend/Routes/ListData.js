const express = require('express');
const router = express.Router();
const List = require("../models/UserList");

router.post('/listdata', async (req, res) => {
    let data = req.body.list_data;
    await data.splice(0, 0, { List_date: req.body.list_date });

    let eld = await List.findOne({ 'email': req.body.email });

    if (!eld) {
        try {
            await List.create({
                email: req.body.email,
                list_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        try {
            await List.findOneAndUpdate({ email: req.body.email }, {
                $push: { list_data: data }
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            res.status(500).send("Server Error: " + error.message);
        }
    }
});

router.post('/mylistdata', async (req, res) => {
    try {
        let myData = await List.findOne({ 'email': req.body.email });
        if (!myData || !myData.list_data) {
            return res.json({ listData: [] }); // Ensure we return an array
        }
        res.json({ listData: myData.list_data }); // Send only list_data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deletetask', async (req, res) => {
    console.log("🚀 Delete request received:", req.query); // ✅ Debugging Step

    const { email, index } = req.query;
    console.log(`Email: ${email}, Index: ${index}`); // ✅ Debugging Step

    try {
        let user = await List.findOne({ email });

        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        let taskIndex = parseInt(index, 10);
        console.log("🔄 Deleting task at index:", taskIndex); // ✅ Debugging Step

        if (taskIndex >= 0 && taskIndex < user.list_data.length) {
            user.list_data.splice(taskIndex, 1);
            await user.save();
            console.log("✅ Task deleted successfully");
            return res.json({ message: "Task deleted successfully", updatedList: user.list_data });
        } else {
            console.log("❌ Invalid task index");
            return res.status(400).json({ message: "Invalid task index" });
        }
    } catch (error) {
        console.error("❌ Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
