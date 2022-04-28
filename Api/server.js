// Configuración del server
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const routes = require("./routes");
const db = require("./db/index");
const User = require("./models/User");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
    },

    function (email, password, done) {
      User.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (!user) return done(null, false);
          user.setHash(password, user.salt).then((hash) => {
            if (hash !== user.contraseña) return done(null, false);
            done(null, user);
          });
        })
        .catch(done);
    }
  )
);

const GOOGLE_CLIENT_ID = "1017765309252-5j92jrgderqvo4ho2m80b56um05a48u6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const authUser = async (request, accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({
    where: {
      email: profile.email
    }
  })
  return done(null, user);
}

passport.use(new GoogleStrategy({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/api/users/auth/google/callback",
  passReqToCallback   : true
}, authUser));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      console.log(user);
      done(null, user);
    })
    .catch(done);
});


app.use("/api", routes);

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

const PORT = process.env.PORT || 3001;

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});
