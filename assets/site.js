$(document)
  .ready(function() {

    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.toggler')
      .sidebar('attach events', '.ui.sidebar .close.icon')
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('setting', 'dimPage', false)
      .sidebar('setting', 'closable', false)
      .sidebar('setting', 'onChange', rememberState)
    ;

    function rememberState() {
      if ($(this).sidebar('is hidden'))
        cookie.set('sidebar_open', true, { path: '/eloquentjs/' });
      else
        cookie.set('sidebar_open', '', { path: '/eloquentjs/' });
    }

    if (cookie.get('sidebar_open')) {
      $('.ui.restorable.sidebar')
        .sidebar('show');
    }

    $('main.ui.text.container h2')
      .visibility({
        onTopPassed: function () {
          setActiveItem(this.id);
        },
        onTopPassedReverse: function () {
          var previous = $(this).prevAll('h2').first().attr('id');
          if (previous) setActiveItem(previous);
        },
        once: false
      });

    function setActiveItem(name) {
      $('.ui.sidebar.menu a').each(function () {
        var $this = $(this);
        if (name && $this.attr('href').indexOf('#'+name) >= 0) {
          $this.addClass('active');
        } else {
          $this.removeClass('active');
        }
      });
    }
  })
;

// Copyright (c) 2015 Florian Hartmann, https://github.com/florian https://github.com/florian/cookie.js
!function(a,b){var c=function(){return c.get.apply(c,arguments)},d=c.utils={isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isPlainObject:function(a){return!!a&&"[object Object]"===Object.prototype.toString.call(a)},toArray:function(a){return Array.prototype.slice.call(a)},getKeys:Object.keys||function(a){var b=[],c="";for(c in a)a.hasOwnProperty(c)&&b.push(c);return b},encode:function(a){return String(a).replace(/[,;"\\=\s%]/g,function(a){return encodeURIComponent(a)})},decode:function(a){return decodeURIComponent(a)},retrieve:function(a,b){return null==a?b:a}};c.defaults={},c.expiresMultiplier=86400,c.set=function(c,e,f){if(d.isPlainObject(c))for(var g in c)c.hasOwnProperty(g)&&this.set(g,c[g],e);else{f=d.isPlainObject(f)?f:{expires:f};var h=f.expires!==b?f.expires:this.defaults.expires||"",i=typeof h;"string"===i&&""!==h?h=new Date(h):"number"===i&&(h=new Date(+new Date+1e3*this.expiresMultiplier*h)),""!==h&&"toGMTString"in h&&(h=";expires="+h.toGMTString());var j=f.path||this.defaults.path;j=j?";path="+j:"";var k=f.domain||this.defaults.domain;k=k?";domain="+k:"";var l=f.secure||this.defaults.secure?";secure":"";f.secure===!1&&(l=""),a.cookie=d.encode(c)+"="+d.encode(e)+h+j+k+l}return this},c.setDefault=function(a,e,f){if(d.isPlainObject(a)){for(var g in a)this.get(g)===b&&this.set(g,a[g],e);return c}return this.get(a)===b?this.set.apply(this,arguments):void 0},c.remove=function(a){a=d.isArray(a)?a:d.toArray(arguments);for(var b=0,c=a.length;c>b;b++)this.set(a[b],"",-1);return this},c.empty=function(){return this.remove(d.getKeys(this.all()))},c.get=function(a,b){var c=this.all();if(d.isArray(a)){for(var e={},f=0,g=a.length;g>f;f++){var h=a[f];e[h]=d.retrieve(c[h],b)}return e}return d.retrieve(c[a],b)},c.all=function(){if(""===a.cookie)return{};for(var b=a.cookie.split("; "),c={},e=0,f=b.length;f>e;e++){var g=b[e].split("="),h=d.decode(g.shift()),i=d.decode(g.join("="));c[h]=i}return c},c.enabled=function(){if(navigator.cookieEnabled)return!0;var a="_"===c.set("_","_").get("_");return c.remove("_"),a},"function"==typeof define&&define.amd?define(function(){return c}):"undefined"!=typeof exports?exports.cookie=c:window.cookie=c}("undefined"==typeof document?null:document);