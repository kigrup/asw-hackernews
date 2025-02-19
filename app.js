const express = require("express");
const https = require("https");
const session = require("express-session");
const app = express();
const fs = require("fs");
const db = require("./db/db");

const passport = require("passport");
var userProfile;

const index = require("./routes/index");
const login = require("./routes/login");
const submit = require("./routes/submit");
const item = require("./routes/item");
const user = require("./routes/user");
const vote = require("./routes/vote");
const threads = require("./routes/threads");
const liked = require("./routes/liked");
const api = require("./routes/api");
const authenticateUser = require("./middlewares/authentication");
const saveUrl = require("./middlewares/saveUrl");
const { authenticateGloggedInUser } = require("./db/user-management");
const nocache = require("nocache");

// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});

app.use(nocache());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(saveUrl);

// EJS
app.set("view engine", "ejs");

// Routes
app.use("/", index);
app.use("/login", login);
app.use("/submit", authenticateUser, submit);
app.use("/item", item);
app.use("/user", user);
app.use("/vote", authenticateUser, vote);
app.use("/threads", threads);
app.use("/liked", authenticateUser, liked);

// API Route
app.use("/api", api);

// TODO: tidy up
// Passport
app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Google
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
    "461952415109-4d307hnjj5bsf7ps75n49ko1s764io08.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "https://asw.raulplesa.online/login/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        }
    )
);

app.get(
    "/login/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/login/google/callback",
    passport.authenticate("google", { failureRedirect: "/error" }),
    function (req, res) {
        // Register user if first login
        authenticateGloggedInUser(req.user);
        // Successful authentication, redirect success.
        res.redirect("/");
    }
);

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

const port = 13001;

const start = async () => {
    try {
        console.log("Testing database connection...");
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully.");
        console.log("Syncing database...");
        db.sequelize.sync();
        console.log("Syncronized database successfull.");
        /*
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
        */
        const keyFile = fs.readFileSync("privkey.pem");
        const certFile = fs.readFileSync("fullchain.pem");
        https
            .createServer(
                {
                    key: fs.readFileSync("privkey.pem"),
                    cert: fs.readFileSync("fullchain.pem"),
                },
                app
            )
            .listen(port, function () {
                console.log("HTTPS server listening on port " + port + "...");
            });
    } catch (error) {
        console.log(error.message);
    }
};

start();
