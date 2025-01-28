import express, { response } from "express";
import BlogModel from "../models/blogModel.js";

const blogRouter = express.Router();

// defining routes

blogRouter.get('/', (req, res) => {
    res.send('Welcome to the home page, blogs will be available soon');
});

blogRouter.post('/', (req, res) => {
    let blog = new BlogModel();
    blog.title = 'The Event Driven Architecture';
    blog.description = "Discover the positive impact of meditation on mental well-being";
    blog.body = `Meditation has been practiced for centuries, and its benefits for mental health are well-documented. By taking just a few minutes each day to focus on your breath and quiet your mind, you can reduce stress and anxiety, improve your mood, and even alleviate symptoms of depression. Regular meditation can also improve sleep quality, boost self-esteem, and increase feelings of compassion and empathy. Whether you're a seasoned meditator or just starting out, incorporating this practice into your daily routine can have a profound impact on your mental well-being.`;
    blog.author = 'Dev Bambam';

    blog.save()
        .then(data => res.send('Blog saved successfully'))
        .catch(err => res.send('An error occured'))
})

export default blogRouter;
