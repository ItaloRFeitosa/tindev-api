const Dev = require('../models/Dev');

module.exports = {

    async index(req, res){
        try {
            
            const { user } = req.headers;
    
            const loggedDev = await Dev.findById(user);
            //console.log(loggedDev.likes)
            console.log(loggedDev.likes.length);
            if(loggedDev.likes.length == 0){

                return res.json({message: "Without Likes"});

            } else {

                const devs = await Dev.findById(loggedDev.likes);
        
                return res.json(devs);

            }

            
        } catch (error) {

            return res.status(400).json(error);

        }

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
                targetDev.matchs.push(user);
                loggedDev.matchs.push(devId);

                await targetDev.save();
            }
            loggedDev.likes.push(devId);

            await loggedDev.save();

            return res.json(loggedDev);
        } catch (error) {
            return res.status(400).json(error);
        }
        
    }
}