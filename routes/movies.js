import express from "express";
import { getAllMovies, getMovieByID, deleteMovieById, updateMovieById, createNewMovies } from "../helper.js";
import { auth } from "./middleware/auth.js";

const router = express.Router();

//cursor -> pagination -> convert into array (toArray)
router.get("/", async function (request, response) {
    //db.movies.find({})
    const movies = await getAllMovies();
    response.send(movies);
});

router.get("/:id", async function (request, response) {
    //console.log(request.params);
    //db.movies.findOne({id:"102"})
    const { id } = request.params;
    //const movie = movies.find(mv => mv.id === id);
    const movie = await getMovieByID(id);
    console.log(movie);
    movie 
        ? response.send(movie) 
        : response.status(404).send({ message: "No such movie found 😅" });
});

router.delete("/:id", async function (request, response) {
    //console.log(request.params);
    //db.movies.deleteOne({id:"102"})
    const { id } = request.params;
    //const movie = movies.find(mv => mv.id === id);
    const result = await deleteMovieById(id);
    response.send(result);
});

router.put("/:id", async function (request, response) {
    //console.log(request.params);
    //db.movies.updateOne({id:"102"}, {$set: updatedData})
    const { id } = request.params;
    const updateData = request.body;
    //const movie = movies.find(mv => mv.id === id);
    const result = await updateMovieById(id, updateData);
    response.send(result);
});

router.post("/", auth, async function (request, response) {
    //db.movies.insertMany(data)
    const data = request.body;
    console.log(data);
    const result = await createNewMovies(data);
    response.send(result);
});

export const moviesRouter = router;