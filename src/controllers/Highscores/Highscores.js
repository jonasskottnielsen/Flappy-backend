import Database from "../../services/Database";

const Highscores = {
    async getHighscores(request, response) {
        try {
            const data = await Database.getHighscores();
			console.log(data)
            response.json(data);
        } catch(error) {
            console.log(error);
        }
    },
    
    async postHighscore(request, response){
		console.log(request.body)
        const {userId, name, score} = request.body;
        try {
            const data = await Database.insertHighscore({userId: userId, name: name, score: score});
            
            return response.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

export default Highscores;
