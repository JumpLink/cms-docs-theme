var validator = require('validator');
var moment = require('moment');
moment.locale('de');

var updateBrowser = function (req, res, next, force) {
  return ThemeService.view(req, 'views/fallback/browser.jade', res, {force: force, host: req.host, url: req.path, useragent: req.useragent, title: 'Ihr Browser wird nicht unterstützt' });
}

var fallbackOverview = function (req, res, next, force, showLegacyToast) {
  sails.log.debug("fallbackOverview");
  var about = null, goals = null, page = 'layout.home', events;
  MultisiteService.getCurrentSiteConfig(req.session.uri.host, function (err, config) {
    if(err) { return res.serverError(err); }
    Navigation.find({where:{page:page, site:config.name}, sort: 'position'}).exec(function found(err, navs) {
      if(err) { return res.serverError(err); }
      Content.findOne({where:{page:page, name: 'news', site:config.name, type: 'fix'}}).exec(function found(err, news) {
        if(err) { return res.serverError(err); }
        Content.find({where:{page:page, site:config.name, type: 'dynamic'}, sort: 'position'}).exec(function found(err, contents) {
          if(err) { return res.serverError(err); }
          Timeline.find({site:config.name}).exec(function found(err, results) {
            if(err) { return res.serverError(err); }
            // sails.log.debug(results);
            events = EventService.transform(results);
            return ThemeService.view(req, 'views/fallback/home/content.jade', res, {showLegacyToast: showLegacyToast, force: force, host: req.host, url: req.path, contents: contents, news:news, events:events, useragent: req.useragent, title: 'Nautischer Verein Cuxhaven e.V. - Startseite', config: {paths: sails.config.paths}, navs: navs});
          });
        });
      });
    });
  });
}

var fallbackCms = function (req, res, next, force, showLegacyToast) {
  var links = null;
  MultisiteService.getCurrentSiteConfig(req.session.uri.host, function (err, config) {
    if(err) { return res.serverError(err); }
    CmsService.infoUser(function (error, cmsInfo) {
      return ThemeService.view(req, 'views/fallback/cms/content.jade', res, {showLegacyToast: showLegacyToast, force: force, host: req.host, url: req.path, links: links, useragent: req.useragent, title: 'Nautischer Verein Cuxhaven e.V. - Links', config: {paths: sails.config.paths}, cmsInfo: cmsInfo});
    });
  });
}

var fallback = function (req, res, next, force) {

  var ok = function (req, res, next, force) {
    switch(req.path) {
      case "/fallback/browser":
        return updateBrowser(req, res, next, force, showLegacyToast = false);
      case "/fallback/overview":
        return fallbackOverview(req, res, next, force, showLegacyToast = true);
      case "/fallback/cms":
        return fallbackCms(req, res, next, force, showLegacyToast = true);
      default:
        return fallbackOverview(req, res, next, force, showLegacyToast = true);
    }
  }

  // var force = null; // modern | fallback
  if(req.param('force'))
    force = req.param('force');
  if(req.query.force)
    force = req.query.force;

  // sails.log.debug('force', force);

  if(UseragentService.isModern(req, force)) {
    if(force != null && typeof force != 'undefined')
      return res.redirect('/?force='+force);
    else
      return res.redirect('/');
  } else {
    return ok(req, res, next, force);
  }
}

  /*
   * fallback html page to allow browser to auto-fill e-mail and password
   */
var signin = function(req, res, next) {

  sails.log('signin(req, res, next)');

  var ok = function () {
    // TODO use toast for flash
    return ThemeService.view(req, 'views/fallback/signin.jade', res,  { showLegacyToast: false, flash: req.session.flash });
  }

  var force = null; // modern | fallback

  if(req.param('force'))
    force = req.param('force');

  if(req.query.force)
    force = req.query.force;

  // sails.log.debug('force', force);

  if((UseragentService.supported(req) || force == 'modern') && (force != 'fallback' && force != 'noscript')) {
    return ok(req, res, next);
  } else {
    if(force != null)
      return res.redirect('/fallback/home?force='+force);
    else
      return res.redirect('/fallback/home');
  }

}

module.exports = {
  updateBrowser: updateBrowser
  , fallback: fallback
  , signin: signin
};

