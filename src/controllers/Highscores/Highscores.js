import Database from "../../services/Database";

const Highscores = {
    async getHighscores(request, response) {
        try {
            const data = await Database.getHighscores();
            response.json(data);
        } catch(error) {
            console.log(error);
        }
    },
    
    async postHighscore(request, response){
        const {userId, name, score} = request;
        try {
            const data = await Database.postHighscore({userId: userId, name: name, score: score});
            
            return response.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Highscores;