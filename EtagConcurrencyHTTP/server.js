const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const projects = {
    "12345": {
        id: "12345",
        name: "Proyecto inicial",
        description: "Versión 1",
        updatedAt: new Date().toISOString(),
    },
};

const computeETag = ((resource) => {
    const json = JSON.stringify(resource);
    const hash = crypto.createHash("sha256").update(json).digest("hex");
    return `"${hash}"`;
});

const getProject = ((req, res, next) => {
    const p = projects[req.params.id];
    if (!p) return res.status(404).json({ error: "Project not found" });
    req.project = p;
    next();
});

app.get("/projects/:id", getProject, (req, res) => {
    const etag = computeETag(req.project);
    res.set("ETag", etag);
    res.json(req.project);
});

app.put("/projects/:id", getProject, (req, res) => {
    const currentETag = computeETag(req.project);
    const ifMatch = req.header("If-Match");

    if (!ifMatch) {
        return res.status(428).json({ error: "Precondition Required" });
    }

    if (ifMatch !== currentETag) {
        return res.status(412).json({ error: "Precondition Failed" });
    }

    const { name, description } = req.body;
    req.project.name = name;
    req.project.description = description;
    req.project.updatedAt = new Date().toISOString();

    const newETag = computeETag(req.project);
    res.set("ETag", newETag);
    res.json(req.project);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});