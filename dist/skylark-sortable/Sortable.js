/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-domx-plugins","skylark-devices-points/touch","./containers","./dnd"],function(t,e,n,a,o,i,r,l,s,d,g,c,h,u,p,f,v,b){"use strict";var m,_=[];var E,x,D,y=window,C=y.document,k=y.parseInt,S=y.setTimeout,w=(y.Polymer,n&&n.ie,n&&n.edge,n&&n.firefox,n&&n.safari,a&&a.apple.device,"draggable"in C.createElement("div")&&!a.apple.device),I=(i.support.cssPointerEvents,!1),T=!1,P=function(t){function e(t,n){return function(a,o,i,r){var l=a.options.group.name&&o.options.group.name&&a.options.group.name===o.options.group.name;if(null==t&&(n||l))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(a,o,i,r),n)(a,o,i,r);var s=(n?a:o).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var n={},a=t.group;a&&"object"==typeof a||(a={name:a}),n.name=a.name,n.checkPull=e(a.pull,!0),n.checkPut=e(a.put),n.revertClone=a.revertClone,t.group=n},A=p.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(t,n,a,o){return u(this.el,e.mixin({excluding:[o,a]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:k(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(t,e){for(var n in this.overrided(t,e),this.el=t,t[b.expando]=this,(e=this.options).draggable=e.draggable||/[uo]l/i.test(t.nodeName)?">li":">*",P(e),this)"_"===n.charAt(0)&&"function"==typeof this[n]&&(this[n]=this[n].bind(this));this.nativeDraggable=!e.forceFallback&&w,this.nativeDraggable&&(this.options.touchStartThreshold=1),f.mousy(t),g.on(t,"mousedown",this._onMouseDown),this.nativeDraggable&&(g.on(t,"dragover",this),g.on(t,"dragenter",this),g.on(t,"drop",this)),b.sortables.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),g.on(t,"selectstart",this)},_onMouseDown:function(t){var e,n,a=this,o=this._elm,i=this.options,r=i.preventOnFilter,s=t.type,d=t.touches&&t.touches[0],g=(d||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||g,h=i.filter;if(function(t){_.length=0;for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var a=e[n];a.checked&&_.push(a)}}(o),!(/mousedown/.test(s)&&0!==t.button||i.disabled||c.isContentEditable||(g=l.closest(g,i.draggable,o,!1),m===g))){if(b.log("_onTapStart",g.tagName+","+g.className),e=v._index(g),n=v._index(g,i.draggable),"function"==typeof h){if(h.call(this,t,g,this))return a._dispatchEvent(a,c,"filter",g,o,o,e,void 0,n),void(r&&t.cancelable&&t.preventDefault())}else if(h&&(h=h.split(",").some(function(t){if(t=l.closest(c,t.trim(),o,!1))return a._dispatchEvent(a,t,"filter",g,o,o,e,void 0,n),!0})))return void(r&&t.cancelable&&t.preventDefault());i.handle&&!l.closest(c,i.handle,o,!1)||this._prepareDragStart(t,d,g,e,n)}},_prepareDragStart:function(t,e,n,a,o){var i,r,l=this,s=l._elm,g=l.options,c=(s.ownerDocument,this.dragEl),h=(b.parentEl,b.nextEl,b.oldIndex),u=b.oldDraggableIndex;b.tapEvt;b.log("_prepareDragStart","start"),n&&!c&&n.parentNode===s&&(r=s,c=this.dragEl=n,b.parentEl=c.parentNode,b.nextEl=c.nextSibling,m=n,b.activeGroup=this.options.group,h=b.oldIndex=a,u=b.oldDraggableIndex=o,b.tapEvt={target:c,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,c.style["will-change"]="all",c.style.transition="",c.style.transform="",i=function(){l.nativeDraggable&&(c.draggable=!0),l._triggerDragStart(t,e),l._dispatchEvent(l,r,"choose",c,r,r,h,void 0,u),d.toggleClass(c,g.chosenClass,!0)},g.ignore.split(",").forEach(function(t){!function(t,e,n){if(t){var a=t.getElementsByTagName(e),o=0,i=a.length;if(n)for(;o<i;o++)n(a[o],o);return a}}(c,t.trim(),b._disableDraggable)}),this.nativeDraggable&&(this.options.touchStartThreshold=4,c.draggable=!0),i())},_triggerDragStart:function(t,n){b.log("_triggerDragStart","start"),b.log("_triggerDragStart","nativeDraggable is "+this.nativeDraggable),b.prepare(this),this.nativeDraggable&&(g.on(this.dragEl,"dragend",this._onDragEnd),g.on(this.dragEl,"dragstart",this._onDragStart));try{C.selection?e.defer(function(){C.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_onDragStart:function(t,n){b.log("_onDragStart","start");var a=this,o=this.dragEl,i=this._elm,l=t.dataTransfer,s=a.options,g=b.cloneEl=r.clone(o,!0);g.draggable=!1,g.style["will-change"]="",d.toggleClass(g,a.options.chosenClass,!1),a._cloneId=e.defer(function(){a.options.removeCloneOnHide||i.insertBefore(g,o),a._dispatchEvent(a,i,"clone",o)}),n||d.toggleClass(o,s.dragClass,!0),n||(l&&(l.effectAllowed="move",s.setData&&s.setData.call(a,l,o)),d.css(o,"transform","translateZ(0)")),b.awaitingDragStarted=!0,a._dragStartId=e.defer(a._dragStarted.bind(a,n,t))},_dragStarted:function(t,e){b.awaitingDragStarted=!1;var n=this.dragEl,a=this._elm,o=b.oldIndex,i=b.oldDraggableIndex;if(a&&n){b.start(this);var r=this.options;!t&&d.toggleClass(n,r.dragClass,!1),d.toggleClass(n,r.ghostClass,!0),d.css(n,"transform",""),b.active=this,this._dispatchEvent(this,a,"start",n,a,a,o,void 0,i,void 0,e)}else this._nulling()},_onDragEnd:function(t){this._elm,this.options,this.dragEl,b.putSortable;b.awaitingDragStarted=!1,!1,clearTimeout(this._dragStartTimer),this._cloneId&&(this._cloneId.stop(),this._cloneId=null),this._dragStartId&&(this._dragStartId.stop(),this._dragStartId=null),this.nativeDraggable&&(g.off(this.dragEl,"dragstart",this._onDragStart),g.off(this.dragEl,"dragend",this._onDragEnd)),m=null,_.forEach(function(t){t.checked=!0}),_.length=0,this.dragEl=null,b.end()},_onMove:function(t,e,n,a,o,i,r,l){var d,c,h=t[b.expando],u=h.options.onMove;return d=g.create("move",{to:e,from:t,dragged:n,draggedRect:a,related:o||e,relatedRect:i||s.boundingRect(e),willInsertAfter:l,originalEvent:r}),t.dispatchEvent(d),u&&(c=u.call(h,d,r)),c},_computeIsAligned:function(t){var e,n=b.draggable.dragEl;if(e=t.target,e=l.closest(e,this.options.draggable,this.el,!1),!T&&n&&n.parentNode===this.el){for(var a=this.el.children,o=0;o<a.length;o++)l.closest(a[o],this.options.draggable,this.el,!1)&&a[o]!==e&&(a[o].sortableMouseAligned=v._isClientInRowColumn(t.clientX,t.clientY,a[o],this._getDirection(t,null),this.options));l.closest(e,this.options.draggable,this.el,!0)||null,T=!0,S(function(){T=!1},30)}},_getDirection:function(t,e){var n=b.draggable.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,n,null):this.options.direction},_animate:function(t,e){var n=this.options.animation,a=b.draggable.dragEl;if(n){var o=s.boundingRect(e);if(e===a&&o,1===t.nodeType&&(t=s.boundingRect(t)),t.left+t.width/2!==o.left+o.width/2||t.top+t.height/2!==o.top+o.height/2){var i=c.matrix(this.el),r=i&&i.a,l=i&&i.d;d.css(e,"transition","none"),d.css(e,"transform","translate3d("+(t.left-o.left)/(r||1)+"px,"+(t.top-o.top)/(l||1)+"px,0)"),this._repaint(e),d.css(e,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=S(function(){d.css(e,"transition",""),d.css(e,"transform",""),e.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offUpEvents:function(){var t=this.el.ownerDocument;g.off(t,"mouseup",this._onDrop),g.off(C,"selectstart",this)},_onDragOver:function(t){var e,n,a,o=this.el,i=t.target,r=this.options,g=r.group,c=b.active,h=b.activeGroup===g,u=r.sort,p=this,f=b.draggable.dragEl,m=b.draggable.elm(),_=b.putSortable,E=b.nextEl,x=b.oldIndex,y=b.oldDraggableIndex;if(!I){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),D=!0,i=l.closest(i,r.draggable,o,!0),f.contains(t.target)||i.animated)return B(!1);if(i!==f&&(b.ignoreNextClick=!1),c&&!r.disabled&&(h?u||(a=!m.contains(f)):_===this||(this.lastPutMode=b.activeGroup.checkPull(this,c,f,t))&&g.checkPut(this,c,f,t))){var k=this._getDirection(t,i);if(e=s.boundingRect(f),a)return this._hideClone(),b.parentEl=m,E?m.insertBefore(f,E):m.appendChild(f),B(!0);var w=function(t){return l.lastChild(t,{ignoreHidden:!0,excluding:[null]})}(o);if(!w||function(t,e,n){var a=s.boundingRect(l.lastChild(n,{ignoreHidden:!0,excluding:[]})),o="vertical"===e?t.clientY:t.clientX,i="vertical"===e?t.clientX:t.clientY,r="vertical"===e?a.bottom:a.right,d="vertical"===e?a.left:a.top,g="vertical"===e?a.right:a.bottom;return"vertical"===e?i>g+10||i<=g&&o>r&&i>=d:o>r&&i>d||o<=r&&i>g+10}(t,k,o)&&!w.animated){if(w&&o===t.target&&(i=w),i&&(n=s.boundingRect(i)),h?c._hideClone():c._showClone(this),!1!==this._onMove(m,o,f,e,i,n,t,!!i))return o.appendChild(f),b.parentEl=o,null,M(),B(!0)}else if(i&&i!==f&&i.parentNode===o){null,i,1,n=s.boundingRect(i);var T=i.nextElementSibling,P=!1;P=!0;var A=this._onMove(m,o,f,e,i,n,t,P);if(!1!==A)return 1!==A&&-1!==A||(P=1===A),I=!0,S(N,30),h?c._hideClone():c._showClone(this),P&&!T?o.appendChild(f):i.parentNode.insertBefore(f,P?T:i),b.parentEl=f.parentNode,M(),B(!0)}if(o.contains(f))return B(!1)}return!1}function B(a){return a&&(h?c._hideClone():c._showClone(p),c&&(d.toggleClass(f,_?_.options.ghostClass:c.options.ghostClass,!1),d.toggleClass(f,r.ghostClass,!0)),_!==p&&p!==b.active?_=b.putSortable=p:p===b.active&&(_=b.putSortable=null),e&&p._animate(e,f),i&&n&&p._animate(n,i)),(i===f&&!f.animated||i===o&&!i.animated)&&null,r.dragoverBubble||t.rootEl||i===C||(b.over(t),f.parentNode[b.expando]._computeIsAligned(t),!a&&b.nearestEmptyInsertDetectEvent(t)),!r.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function M(){p._dispatchEvent(p,m,"change",i,o,m,x,v._index(f),y,v._index(f,r.draggable),t)}},_onDrop:function(t){this.el;var e=this.options,n=b.draggable.elm(),a=b.draggable.dragEl,o=b.putSortable,i=b.parentEl,l=b.oldIndex,s=b.oldDraggableIndex,c=b.nextEl;!1,!1,this.nativeDraggable&&g.off(C,"drop",this),this._offUpEvents(),t&&(D&&(t.cancelable&&t.preventDefault(),!e.dropBubble&&t.stopPropagation()),(n===i||o&&"clone"!==o.lastPutMode)&&r.remove(b.cloneEl),a&&(b._disableDraggable(a),a.style["will-change"]="",d.toggleClass(a,o?o.options.ghostClass:this.options.ghostClass,!1),d.toggleClass(a,this.options.chosenClass,!1),this._dispatchEvent(this,n,"unchoose",a,i,n,l,null,s,null,t),n!==i?(E=v._index(a),x=v._index(a,e.draggable),E>=0&&(this._dispatchEvent(null,i,"add",a,i,n,l,E,s,x,t),this._dispatchEvent(this,n,"remove",a,i,n,l,E,s,x,t),this._dispatchEvent(null,i,"sort",a,i,n,l,E,s,x,t),this._dispatchEvent(this,n,"sort",a,i,n,l,E,s,x,t)),o&&o.save()):a.nextSibling!==c&&(E=v._index(a),x=v._index(a,e.draggable),E>=0&&(this._dispatchEvent(this,n,"update",a,i,n,l,E,s,x,t),this._dispatchEvent(this,n,"sort",a,i,n,l,E,s,x,t))),b.active&&(null!=E&&-1!==E||(E=l,x=s),this._dispatchEvent(this,n,"end",a,i,n,l,E,s,x,t),this.save()))),this._nulling()},_nulling:function(){D=E=null},_hideClone:function(){b.cloneEl.cloneHidden||(d.hide(b.cloneEl),b.cloneEl.cloneHidden=!0,b.cloneEl.parentNode&&this.options.removeCloneOnHide&&r.remove(b.cloneEl))},_showClone:function(t){var e=b.active.el,n=b.nextEl;"clone"===t.lastPutMode?b.cloneEl.cloneHidden&&(e.contains(b.draggable.dragEl)&&!this.options.group.revertClone?e.insertBefore(b.cloneEl,b.draggable.dragEl):n?e.insertBefore(b.cloneEl,n):e.appendChild(b.cloneEl),this.options.group.revertClone&&this._animate(b.draggable.dragEl,b.cloneEl),d.show(b.cloneEl),b.cloneEl.cloneHidden=!1):this._hideClone()},handleEvent:function(t){switch(t.type){case"drop":this._onDrop(t);break;case"dragenter":case"dragover":b.draggable.dragEl&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},_dispatchEvent:function(t,e,n,a,o,i,r,l,s,d,c){var h,u=(t=t||e[expando]).options,p="on"+n.charAt(0).toUpperCase()+n.substr(1),f=this.putSortable;h=g.create(n,{to:o||e,from:i||e,item:a||e,clone:this.cloneEl,oldIndex:r,newIndex:l,oldDraggableIndex:s,newDraggableIndex:d,originalEvent:c,pullMode:f?f.lastPutMode:void 0}),e&&e.dispatchEvent(h),u[p]&&u[p].call(t,h)},toArray:function(){for(var t,e=[],n=this.el.children,a=0,o=n.length,i=this.options;a<o;a++)t=n[a],l.closest(t,i.draggable,this.el,!1)&&e.push(t.getAttribute(i.dataIdAttr)||r.generateId(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,a){var o=n.children[a];l.closest(o,this.options.draggable,n,!1)&&(e[t]=o)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return l.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&P(n)},destroy:function(){var t=this.el;t[b.expando]=null,g.off(t,"mousedown",this._onTapStart),this.nativeDraggable&&(g.off(t,"dragover",this),g.off(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),b.sortables.splice(b.sortables.indexOf(this.el),1),this.el=t=null}});function N(){I=!1}return A.create=function(t,e){return new A(t,e)},A.version="1.9.0",t.attach("intg.Sortable",A)});
//# sourceMappingURL=sourcemaps/Sortable.js.map
