import Database from "../../services/Database";

const Highscores = {
    async getHighscores(request, response) {
        try {
            const { polyglot } = request;
            
            const categories = await Database.Categories.getCategories();

            if (!categories.success) {
                throw new InternalServerError(polyglot.t(categories.message));
            }
            
            return response.json({ ...categories, message: polyglot.t(categories.message)});
        } catch(error) {
            console.log(error);
        }
    },

    async postHighscore(request, response){
        try {
            const {} = request;

            return response.json()
        } catch (error) {
            console.log(error);
        }
    }
}

export default Highscores;