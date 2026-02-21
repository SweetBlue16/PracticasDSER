const express = require("express");
const app = express();

/* 
    Middleware: instrucciones que se van a llamar 
    antes de ejecutar otras instrucciones.
*/
app.use(express.json());

let items = [
    {id: 1, name: "Samurott", deleted: false},
    {id: 2, name: "Garchomp", deleted: false},
    {id: 3, name: "Gengar", deleted: true},
    {id: 4, name: "Chandelure", deleted: false}
];

const nextId = () => items.length ? Math.max(...items.map(i => i.id) + 1) : 1;

app.get("/items", (req, res, next) => {
    try {
        const activeItems = items.filter(i => !i.deleted);
        res.status(200).json(activeItems);
    } catch (err) {
        next(err);
    }
});

app.get("/__crash", (req, res, next) => {
    throw new Error("Simulates  server error");
});

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "Route does not exist"
    });
});

// Next quiere decir que hay un middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Internal Server Error",
        message: "Unexpected failure"
    });
});

app.listen(3000, () => 
    console.log("Server running on http://localhost:3000")
);