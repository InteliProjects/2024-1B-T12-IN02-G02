/**
 * WelcomeStatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    teamStatus: async function(req, res){
        try {
            //Pulling necessary info
            const user = await User.findOne({ id: req.session.userId });
            const teamId = user.teamId;
            const teamMembers = await User.find({ teamId: teamId });

            let onlineCount = 0;
            let offlineCount = 0;

            //Checking for each of the member status's status and adding to it's respective counter 
            for (const member of teamMembers) {
                if (member.status === 'ONLINE') {
                    onlineCount++;
                } else {
                    offlineCount++;
                }
            }

            //Loads the Welcome Page with the status variables
            return res.view('pages/welcome', {
                onlineCount: onlineCount,
                offlineCount: offlineCount
            });
        } catch (error) {
            return res.serverError(error);
        }
    }
};
