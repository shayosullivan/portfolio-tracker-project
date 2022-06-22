const router = require('express').Router();
// todo change models
const { Project, User } = require('../models');
const withAuth = require("../utils/auth")

router.get('/', async (req, res) => {
    try {
        const projectData = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const projects = projectData.map((project) =>
            project.get({ plain: true })
        );

        res.render('homepage', {
            projects,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one project
router.get('/project/:id', async (req, res) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // If the user is logged in, allow them to view the project
        try {
            const projectData = await Project.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: [
                            'name',
                        ],
                    },
                ],
            });
            const project = projectData.get({ plain: true });
            res.render('project', { project, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// GET one user
router.get('/user/:id', async (req, res) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // If the user is logged in, allow them to view the user
        try {
            const dbUserData = await User.findByPk(req.params.id);

            const user = dbUserData.get({ plain: true });

            res.render('user', { user, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
