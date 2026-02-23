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
    {id: 4, name: "Chandelure", deleted: false},
    {id: 5, name: "Tyranitar", deleted: false},
    {id: 6, name: "Gyarados", deleted: true},
    {id: 7, name: "Hydreigon", deleted: false},
    {id: 8, name: "Salamence", deleted: false},
    {id: 9, name: "Haxorus", deleted: false},
    {id: 10, name: "Dragonite", deleted: false}
];

const nextId = () => items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;

app.get("/items", (req, res, next) => {
    try {
        const activeItems = items.filter(i => !i.deleted);
        res.status(200).json(activeItems);
    } catch (err) {
        next(err);
    }
});

app.get("/items/:id", (req, res, next) => {
    try {
        /*
            Coerción de tipos: convierte el valor del parámetro id a un número
            Es como un cast, pero más flexible.
        */
        const id = Number(req.params.id);
    
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
    
        const item = items.find(i => i.id === id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
    
        if (item.deleted) {
            return res.status(410).json({ error: "Item was removed" });
        }
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
});
 
app.post("/items", (req, res, next) => {
    try {
        /*
            Desestructuración: extrae el valor de name del cuerpo de la solicitud
            y lo asigna a una variable llamada name.
        */ 
        const { name } = req.body;
    
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ error: "Invalid name" });
        }
    
        const newItem = {
            id: nextId(),
            name,
            deleted: false
        };
        items.push(newItem);
        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
});
 
app.delete("/items/:id", (req, res, next) => {
    try {
        const id = Number(req.params.id);
    
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
    
        const item = items.find(i => i.id === id);
    
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
    
        if (item.deleted) {
            return res.status(410).json({ error: "Item already removed" });
        }
    
        item.deleted = true;
        res.status(204).send();
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