import { client } from "./index.js";

export async function createNewMovies(data) {
    return await client
        .db("b30wd")
        .collection("movies")
        .insertMany(data);
}

export async function updateMovieById(id, updateData) {
    return await client
        .db("b30wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: updateData });
}

export async function deleteMovieById(id) {
    return await client
        .db("b30wd")
        .collection("movies")
        .deleteOne({ id: id });
}

export async function getAllMovies() {
    return await client
        .db("b30wd")
        .collection("movies")
        .find({})
        .toArray();
}

export async function getMovieByID(id) {
    return await client
        .db("b30wd")
        .collection("movies")
        .findOne({ id: id });
}
