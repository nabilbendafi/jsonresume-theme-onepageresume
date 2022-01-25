var fs = require("fs");
var _ = require('lodash');

var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.template", "utf-8");
	resume.basics.picture = resume.basics.picture ? resume.basics.picture : "http://css-tricks.com/examples/OnePageResume/images/cthulu.png";

	_.each(resume.basics.profiles, function(profile){
		switch(profile.network.toLowerCase()) {
			// special cases
			case "google-plus":
			case "googleplus":
				profile.iconClass = "fab fa-google-plus";
				break;
			case "flickr":
			case "flicker":
				profile.iconClass = "fab fa-flickr";
				break;
			case "dribbble":
			case "dribble":
				profile.iconClass = "fab fa-dribbble";
				break;
			case "codepen":
				profile.iconClass = "fab fa-codepen";
				break;
			case "soundcloud":
				profile.iconClass = "fab fa-soundcloud";
				break;
			case "reddit":
				profile.iconClass = "fab fa-reddit";
				break;
			case "tumblr":
			case "tumbler":
				profile.iconClass = "fab fa-tumblr";
				break;
			case "stack-overflow":
			case "stackoverflow":
				profile.iconClass = "fab fa-stack-overflow";
				break;
			case "blog":
			case "rss":
				profile.iconClass = "fas fa-rss";
				break;
			case "gitlab":
				profile.iconClass = "fab fa-gitlab";
				break;
			case "keybase":
				profile.iconClass = "fas fa-key";
				break;
			default:
				// try to automatically select the icon based on the name
				profile.iconClass = "fab fa-" + profile.network.toLowerCase();
		}

		profile.text = profile.url ? profile.url : profile.network + ": " + profile.username;
	});

	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
