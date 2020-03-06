const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const devs = await Dev.find({ _id: loggedDev.like});

        return res.json(devs);
    },

    async store(req,res){
        try {
            const { devId } = req.params;
            const { user } = req.headers;

            const loggedDev = await Dev.findById(user);

            const targetDev = await Dev.findById(devId);

            if (!targetDev) {
                return res.status(400).json({message: "Dev not exists"})
            }
            if (targetDev.likes.includes(user)){
                console.log("Its a match");
            }
            loggedDev.likes.push(devId);

            await loggedDev.save();

            return res.json(loggedDev);
        } catch (error) {
            return res.status(400).json(error);
        }
        
    }
}