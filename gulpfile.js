// gulpfile.js
let browserSync = require("browser-sync").create();
const GulpClient = require("gulp");
const { src, dest, watch, series } = require("gulp");
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const { compile } = require("sass");
const sass = require('gulp-sass')(require('sass'));


// (browserSync = require("browser-sync").create()),
  (htmlmin = require("gulp-htmlmin")),
  (nunjucksRender = require("gulp-nunjucks-render")); // importing the plugin

const PATHS = {
  output: "dist",
  templates: "src/templates",
  pages: "src/pages",
  styles: "src/styles"
};

// writing up the gulp nunjucks task
function nunjucks() {
  console.log("Rendering nunjucks files..");
  return src(PATHS.pages + "/**/*.+(html|js|css)")
    .pipe(
      nunjucksRender({
        path: [PATHS.templates],
        watch: true,
        data: { 
            it: SOURCE,
            settings: {
                printerWidth: 576
            }
        }
      })
    )
    .pipe(dest(PATHS.output))
    .pipe(browserSync.stream());
}

const compileNunjucks = GulpClient.series(compileSass, nunjucks);

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
  }

function compileSass() {
    let options = { outputStyle: 'expanded' };
    return GulpClient.src(PATHS.styles + "/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync(options)
                .on('error', handleError)
        )
        .pipe(prefix({cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(dest(PATHS.output + "/assets/css"))
        .pipe(browserSync.stream())
}

async function browser() {
  await browserSync.init({
    server: {
      baseDir: PATHS.output,
    },
  });
}

function watching() {
  // trigger Nunjucks render when pages or templates changes
  watch(PATHS.pages + "/**/*.+(html|njk|js|css)", compileNunjucks);
  watch(PATHS.templates + "/**/*.+(html|njk|js|css)", compileNunjucks);
  watch(PATHS.styles + "/**/*.scss", compileNunjucks);

  // reload browsersync when `dist` changes
  watch(PATHS.output + "/*").on("change", browserSync.reload);
}

function minify() {
  return src(PATHS.output + "/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        cssmin: true,
        jsmin: true,
        removeOptionalTags: true,
        removeComments: false,
      })
    )
    .pipe(src(PATHS.output));
}

exports.nunjucks = compileNunjucks;
exports.watching = watching;
exports.default = series(compileNunjucks, browser, watching);
exports.css = compileSass;


// Data
const SOURCE = {
    "items": [
      {
        "_id": "HkeKs8pNJL2bVpRh",
        "effects": [],
        "flags": {},
        "folder": null,
        "name": "Club",
        "permission": {
          "default": 0
        },
        "sort": 0,
        "system": {
          "attack": {
            "label": "Attack Roll",
            "type": "",
            "value": "[[d20 + 6]] vs. AC"
          },
          "description": {
            "label": "Description",
            "type": "",
            "value": ""
          },
          "group": {
            "label": "Group",
            "type": "String",
            "value": ""
          },
          "hit": {
            "label": "Hit",
            "type": "",
            "value": "[[4]] damage"
          },
          "hit1": {
            "label": "Hit",
            "type": "String"
          },
          "hit2": {
            "label": "Hit",
            "type": "String"
          },
          "hit3": {
            "label": "Hit",
            "type": "String"
          },
          "hit4": {
            "label": "Hit",
            "type": "String"
          },
          "hit5": {
            "label": "Hit",
            "type": "String"
          },
          "miss": {
            "label": "Miss",
            "type": "String"
          },
          "name": {
            "label": "Name",
            "type": "String"
          }
        },
        "type": "action"
      },
      {
        "_id": "MVfqVhrqOx7PfvKp",
        "effects": [],
        "flags": {},
        "folder": null,
        "name": "R: Shortbow",
        "permission": {
          "default": 0
        },
        "sort": 100000,
        "system": {
          "attack": {
            "label": "Attack Roll",
            "type": "",
            "value": "[[d20 + 6]] vs. AC"
          },
          "description": {
            "label": "Description",
            "type": "",
            "value": ""
          },
          "group": {
            "label": "Group",
            "type": "String",
            "value": ""
          },
          "hit": {
            "label": "Hit",
            "type": "",
            "value": "[[3]] damage"
          },
          "hit1": {
            "label": "Hit",
            "type": "String"
          },
          "hit2": {
            "label": "Hit",
            "type": "String"
          },
          "hit3": {
            "label": "Hit",
            "type": "String"
          },
          "hit4": {
            "label": "Hit",
            "type": "String"
          },
          "hit5": {
            "label": "Hit",
            "type": "String"
          },
          "miss": {
            "label": "Miss",
            "type": "String"
          },
          "name": {
            "label": "Name",
            "type": "String"
          }
        },
        "type": "action"
      },
      {
        "_id": "rbnfhbNHOmklZpBf",
        "effects": [],
        "flags": {},
        "folder": null,
        "name": "Shifty bugger",
        "permission": {
          "default": 0
        },
        "sort": 200000,
        "system": {
          "description": {
            "label": "Description",
            "type": "",
            "value": "Goblins gain a +5 bonus to disengage checks."
          },
          "group": {
            "label": "Group",
            "type": "String",
            "value": ""
          },
          "name": {
            "label": "Name",
            "type": "String"
          }
        },
        "type": "trait"
      }
    ],
    "name": "Goblin Scum",
    "system": {
      "attributes": {
        "ac": {
          "base": 10,
          "label": "Armor Class",
          "min": 0,
          "type": "Number",
          "value": 16
        },
        "attackMod": {
          "type": "Number",
          "value": 0
        },
        "critMod": {
          "atk": {
            "type": "Number",
            "value": 0
          },
          "def": {
            "type": "Number",
            "value": 0
          }
        },
        "disengage": 11,
        "disengageBonus": 0,
        "escalation": {
          "value": 6
        },
        "hp": {
          "automatic": true,
          "base": 10,
          "label": "Hit Points",
          "max": 5,
          "min": 0,
          "temp": 0,
          "tempmax": 0,
          "type": "Number",
          "value": 5
        },
        "init": {
          "label": "Initiative Modifier",
          "mod": 3,
          "type": "Number",
          "value": 3
        },
        "level": {
          "label": "Level",
          "max": 12,
          "min": 0,
          "type": "Number",
          "value": 1
        },
        "md": {
          "base": 10,
          "label": "Mental Defense",
          "min": 0,
          "type": "Number",
          "value": 11
        },
        "pd": {
          "base": 10,
          "label": "Physical Defense",
          "min": 0,
          "type": "Number",
          "value": 14
        },
        "recoveries": {
          "dice": "d8",
          "label": "Recoveries",
          "max": 8,
          "type": "Number",
          "value": 8
        },
        "saves": {
          "bonus": 0,
          "deathFails": {
            "max": 4,
            "steps": [
              false,
              false,
              false,
              false
            ],
            "value": 0
          },
          "disengageBonus": 0,
          "lastGaspFails": {
            "max": 4,
            "steps": [
              false,
              false,
              false,
              false
            ],
            "value": 0
          }
        }
      },
      "details": {
        "alignment": {
          "label": "Alignment",
          "type": "String"
        },
        "biography": {
          "label": "Biography",
          "type": "String"
        },
        "flavor": {
          "value": ""
        },
        "level": {
          "label": "Level",
          "max": 12,
          "min": 0,
          "type": "Number",
          "value": 1
        },
        "resistance": {
          "label": "Resistance",
          "type": "String",
          "value": ""
        },
        "role": {
          "label": "Role",
          "type": "String",
          "value": "mook"
        },
        "size": {
          "label": "Size",
          "type": "String",
          "value": "normal"
        },
        "type": {
          "label": "Type",
          "type": "String",
          "value": "humanoid"
        },
        "vulnerability": {
          "label": "Vulnerability",
          "type": "String",
          "value": ""
        }
      }
    },
    "type": "npc"
};