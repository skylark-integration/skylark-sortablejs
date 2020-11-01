/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./ghoster"],function(t,e,o,l,n,a,r,i,s,c,d,g,u,h,v,f,m){"use strict";var p="Sortable"+(new Date).getTime(),E={log:function(t,e){n("#console").append("<div>"+t+":"+e+"</div>")},expando:p,activeGroup:null,active:null,putSortable:null,sortables:[],dragEl:null,cloneEl:null,ignoreNextClick:!1,awaitingDragStarted:!1,touchEvt:null,prepare:function(t){this.draggable=t;var e=t.elm().ownerDocument;d.on(e,"dragover",this.nearestEmptyInsertDetectEvent),d.on(e,"mousemove",this.nearestEmptyInsertDetectEvent)},start:function(t,e){this.draggable.nativeDraggable?(d.on(document,"dragover",this._handleAutoScroll),d.on(document,"dragover",this._checkAlignment)):d.on(document,"mousemove",this._onTouchMove)},over:function(t){this._handleAutoScroll(t)},end:function(t){this.draggable.nativeDraggable?(d.off(document,"dragover",this._handleAutoScroll),d.off(document,"dragover",this._checkAlignment)):d.off(document,"mousemove",this._onTouchMove),this.draggable=null,this._nulling()},nearestEmptyInsertDetectEvent:function(t){if(E.dragEl){t=t.touches?t.touches[0]:t;var e=E._detectNearestEmptySortable(t.clientX,t.clientY);if(e){var o={};for(var l in t)o[l]=t[l];o.target=o.rootEl=e,o.preventDefault=void 0,o.stopPropagation=void 0,e[p]._onDragOver(o)}}},_detectNearestEmptySortable:function(t,e){for(var o=this.sortables,l=0;l<o.length;l++)if(!i.lastChild(o[l],{ignoreHidden:!0,excluding:[this.ghostEl]})){var n=s.boundingRect(o[l]),a=o[l][p].options.emptyInsertThreshold,r=t>=n.left-a&&t<=n.right+a,c=e>=n.top-a&&e<=n.bottom+a;if(a&&r&&c)return o[l]}},_checkAlignment:function(t){this.dragEl&&this.dragEl.parentNode&&this.dragEl.parentNode[p]&&this.dragEl.parentNode[p]._computeIsAligned(t)},_emulateDragOver:function(t){var e=this.dragEl,o=this.touchEvt;if(o){if(this._lastX===o.clientX&&this._lastY===o.clientY&&!t)return;this._lastX=o.clientX,this._lastY=o.clientY;for(var l=document.elementFromPoint(o.clientX,o.clientY),n=l;l&&l.shadowRoot&&(l=l.shadowRoot.elementFromPoint(o.clientX,o.clientY))!==n;)n=l;if(n)do{if(n[p])if(n[p]._onDragOver({clientX:o.clientX,clientY:o.clientY,target:l,rootEl:n}))break;l=n}while(n=n.parentNode);e.parentNode[p]._computeIsAligned(o)}},_onMove:function(t,e,o,l,n,a,r,i){var c,g,u=t[p],h=u.options.onMove;return c=d.create("move",{to:e,from:t,dragged:o,draggedRect:l,related:n||e,relatedRect:a||s.boundingRect(e),willInsertAfter:i,originalEvent:r}),t.dispatchEvent(c),h&&(g=h.call(u,c,r)),g},_dispatchEvent:function(t,e,o,l,n,a,r,i,s,c,g){var u,h=(t=t||e[p]).options,v="on"+o.charAt(0).toUpperCase()+o.substr(1),f=this.putSortable;u=d.create(o,{to:n||e,from:a||e,item:l||e,clone:this.cloneEl,oldIndex:r,newIndex:i,oldDraggableIndex:s,newDraggableIndex:c,originalEvent:g,pullMode:f?f.lastPutMode:void 0}),e&&e.dispatchEvent(u),h[v]&&h[v].call(t,u)},_disableDraggable:function(t){t.draggable=!1},_handleAutoScroll:function(t,e){if(E.dragEl&&E.draggable.options.scroll)return f._handleAutoScroll(t,E.draggable.options,e)},_onTouchMove:function(t,e){E.log("_onTouchMove","start");var o=m.ghostEl,l=E.draggable;if(tapEvt){var n=l.options,a=n.fallbackTolerance,r=n.fallbackOffset,i=t.touches?t.touches[0]:t,s=o&&g.matrix(o),d=o&&s&&s.a,u=o&&s&&s.d,h=m.getRelativeScrollOffset(),v=(i.clientX-tapEvt.clientX+r.x)/(d||1)+(h?h[0]-ghostRelativeParentInitialScroll[0]:0)/(d||1),f=(i.clientY-tapEvt.clientY+r.y)/(u||1)+(h?h[1]-ghostRelativeParentInitialScroll[1]:0)/(u||1),p=t.touches?"translate3d("+v+"px,"+f+"px,0)":"translate("+v+"px,"+f+"px)";if(!E.active&&!E.awaitingDragStarted){if(a&&Math.min(Math.abs(i.clientX-l._lastX),Math.abs(i.clientY-l._lastY))<a)return;l._onDragStart(t,!0)}!e&&E._handleAutoScroll(i,!0),moved=!0,E.touchEvt=i,o&&c.css(o,"transform",p),t.preventDefault()}},_nulling:function(){E.rootEl=E.dragEl=E.parentEl=m.ghostEl=E.nextEl=E.cloneEl=f.scrollEl=f.scrollParentEl=f.autoScrolls.length=E.touchEvt=E.oldIndex=E.putSortable=E.activeGroup=E.active=null}};return E});
//# sourceMappingURL=sourcemaps/dnd.js.map
