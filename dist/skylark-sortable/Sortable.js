/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/is-browser","skylark-langx-hoster/is-mobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-layouts/oriented","skylark-domx-plugins-base","skylark-devices-points/touch","./dnd","./draggable","./droppable"],function(t,i,e,o,n,r,s,l,a,d,g,c,h,u,p,f,b,m){"use strict";function v(t){function l(r,s){return function(t,e,o,n){var i=t.options.group.name&&e.options.group.name&&t.options.group.name===e.options.group.name;return!(null!=r||!s&&!i)||null!=r&&!1!==r&&(s&&"clone"===r?r:"function"==typeof r?l(r(t,e,o,n),s)(t,e,o,n):(i=(s?t:e).options.group.name,!0===r||"string"==typeof r&&r===i||r.join&&-1<r.indexOf(i)))}}var e={},o=t.group;e.name=(o=o&&"object"==typeof o?o:{name:o}).name,e.checkPull=l(o.pull,!0),e.checkPut=l(o.put),e.revertClone=o.revertClone,t.group=e}var k=window,y=k.document,x=k.parseInt,E=k.setTimeout,w=(k.Polymer,e&&e.ie,e&&e.edge,e&&e.firefox,e&&e.safari,o&&o.apple.device,"draggable"in y.createElement("div")&&!o.apple.device),C=(r.support.cssPointerEvents,u.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(t,e,o,n){return h(this.el,i.mixin({excluding:[n,o]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:x(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(t,e){for(var o in this.overrided(t,e),(e=((this.el=t)[f.expando]=this).options).draggable=e.draggable||(/[uo]l/i.test(t.nodeName)?">li":">*"),v(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&w,this.nativeDraggable&&(this.options.touchStartThreshold=1),f.sortables.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),this.draggable=new b(this,this.options),this.droppable=new m(this,this.options)},_getDirection:function(t,e){var o=f.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,o,null):this.options.direction},_animate:function(t,e){var o,n,i,r=this.options.animation;f.dragEl;r&&(o=a.boundingRect(e),(t=1===t.nodeType?a.boundingRect(t):t).left+t.width/2===o.left+o.width/2&&t.top+t.height/2===o.top+o.height/2||(n=(i=c.matrix(this.el))&&i.a,i=i&&i.d,d.css(e,"transition","none"),d.css(e,"transform","translate3d("+(t.left-o.left)/(n||1)+"px,"+(t.top-o.top)/(i||1)+"px,0)"),s.reflow(e),d.css(e,"transition","transform "+r+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(e,"transform","translate3d(0,0,0)")),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=E(function(){d.css(e,"transition",""),d.css(e,"transform",""),e.animated=!1},r))},_hideClone:function(){},_showClone:function(t){var e=f.active.el,o=f.nextEl;"clone"!==t.lastPutMode?this._hideClone():f.cloneEl.cloneHidden&&(e.contains(f.dragEl)&&!this.options.group.revertClone?e.insertBefore(f.cloneEl,f.dragEl):o?e.insertBefore(f.cloneEl,o):e.appendChild(f.cloneEl),this.options.group.revertClone&&this._animate(f.dragEl,f.cloneEl),d.show(f.cloneEl),f.cloneEl.cloneHidden=!1)},_dispatchEvent:function(t,e,o,n,i,r,s,l,a,d,c){var h=(t=t||e[f.expando]).options,u="on"+o.charAt(0).toUpperCase()+o.substr(1),p=f.putSortable,o=g.create(o,{to:i||e,from:r||e,item:n||e,clone:f.cloneEl,oldIndex:s,newIndex:l,oldDraggableIndex:a,newDraggableIndex:d,originalEvent:c,pullMode:p?p.lastPutMode:void 0});e&&e.dispatchEvent(o),h[u]&&h[u].call(t,o)},toArray:function(){for(var t,e=[],o=this.el.children,n=0,i=o.length,r=this.options;n<i;n++)t=o[n],l.closest(t,r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||s.generateId(t));return e},sort:function(t){var o={},n=this.el;this.toArray().forEach(function(t,e){e=n.children[e];l.closest(e,this.options.draggable,n,!1)&&(o[t]=e)},this),t.forEach(function(t){o[t]&&(n.removeChild(o[t]),n.appendChild(o[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return l.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&v(o)},destroy:function(){var t=this.el;t[f.expando]=null,Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),f.sortables.splice(f.sortables.indexOf(this.el),1),this.el=t=null}}));return C.create=function(t,e){return new C(t,e)},C.version="1.9.0",t.attach("intg.Sortable",C)});
//# sourceMappingURL=sourcemaps/Sortable.js.map
