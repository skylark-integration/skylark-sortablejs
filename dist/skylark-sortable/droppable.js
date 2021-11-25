/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-finder","skylark-domx-styler","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-plugins-dnd/droppable","./dnd"],function(e,t,n,r,o,a,i,l){var s,d,c,h=!1;function p(e,n){for(var r=t.scrollableParent(e,!0),i=a.boundingRect(e)[n];r;){var l=a.boundingRect(r)[n];if(!("top"===n||"left"===n?i>=l:i<=l))return r;if(r===o.scrollingElement())break;r=t.scrollableParent(r,!1)}return!1}function v(){h=!1}function u(e,n){return t.index(e,function(e){return!("TEMPLATE"===e.nodeName.toUpperCase()||e===l.cloneEl||n&&!t.matches(e,n))})}function g(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}return class{constructor(e,t){this.sortable=e;var n=this.el=this._elm=e.elm();this.options=t;var o=this;this._dndDroppable=new i(n,{started:function(e){e.acceptable=!0,e.activeClass="active",e.hoverClass="over"},overing:function(e){l.dragEl&&(o._onDragOver(e.originalEvent),g(e.originalEvent))},dropped:function(e){o._onDrop(e.originalEvent)}}),r.on(n,"drop",this),r.on(n,"selectstart",this)}_onMove(e,t,n,o,i,s,d,c){var h,p,v=e[l.expando],u=v.options.onMove;return h=r.create("move",{to:t,from:e,dragged:n,draggedRect:o,related:i||t,relatedRect:s||a.boundingRect(t),willInsertAfter:c,originalEvent:d}),e.dispatchEvent(h),u&&(p=u.call(v,h,d)),p}_onDragOver(e){var r,o,i,g,f,b,m,_=this._elm,E=e.target,C=this.options,D=C.group,w=l.active,k=l.activeGroup===D,x=C.sort,R=this.sortable,y=l.dragEl,T=l.active.elm(),P=l.putSortable,S=l.nextEl,M=l.oldIndex,B=l.oldDraggableIndex;if(!h){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),s=!0,E=t.closest(E,C.draggable,_,!0),y.contains(e.target)||E.animated)return z(!1);if(w&&!C.disabled&&(k?x||(i=!T.contains(y)):P===this||(this.lastPutMode=l.activeGroup.checkPull(this,w,y,e))&&D.checkPut(this,w,y,e))){var I=R._getDirection(e,E);if(r=a.boundingRect(y),i)return this._hideClone(),l.parentEl=T,S?T.insertBefore(y,S):T.appendChild(y),z(!0);var N=function(e){return t.lastChild(e,{ignoreHidden:!0,excluding:[]})}(_);if(!N||function(e,n,r){var o=a.boundingRect(t.lastChild(r,{ignoreHidden:!0,excluding:[]})),i="vertical"===n?e.clientY:e.clientX,l="vertical"===n?e.clientX:e.clientY,s="vertical"===n?o.bottom:o.right,d="vertical"===n?o.left:o.top,c="vertical"===n?o.right:o.bottom;return"vertical"===n?l>c+10||l<=c&&i>s&&l>=d:i>s&&l>d||i<=s&&l>c+10}(e,I,_)&&!N.animated){if(N&&_===e.target&&(E=N),E&&(o=a.boundingRect(E)),k?w._hideClone():w._showClone(this),!1!==this._onMove(T,_,y,r,E,o,e,!!E))return _.appendChild(y),l.parentEl=_,F(),z(!0)}else if(E&&E!==y&&E.parentNode===_){var A,O=0,U=E.sortableMouseAligned,X=y.parentNode!==_,Y="vertical"===I?"top":"left",G=p(E,"top")||p(y,"top"),H=G?G.scrollTop:void 0;if(f!==E&&(g=null,A=a.boundingRect(E)[Y],d=!1),function(e,t,n){var r=a.boundingRect(e),o=a.boundingRect(t),i="vertical"===n?r.left:r.top,l="vertical"===n?r.right:r.bottom,s="vertical"===n?r.width:r.height,d="vertical"===n?o.left:o.top,c="vertical"===n?o.right:o.bottom,h="vertical"===n?o.width:o.height;return i===d||l===c||i+s/2===d+h/2}(y,E,I)&&U||X||G||C.invertSwap||"insert"===g||"swap"===g?("swap"!==g&&(c=C.invertSwap||X),O=function(e,t,n,r,o,i,l){var s=a.boundingRect(t),c="vertical"===n?e.clientY:e.clientX,h="vertical"===n?s.height:s.width,p="vertical"===n?s.top:s.left,v="vertical"===n?s.bottom:s.right,u=a.boundingRect(y),g=!1;if(!i)if(l&&m<h*r){if(!d&&(1===b?c>p+h*o/2:c<v-h*o/2)&&(d=!0),d)g=!0;else if("vertical"===n?u.top:u.left,"vertical"===n?u.bottom:u.right,1===b?c<p+m:c>v-m)return-1*b}else if(c>p+h*(1-r)/2&&c<v-h*(1-r)/2)return J(t);return(g=g||i)&&(c<p+h*o/2||c>v-h*o/2)?c>p+h/2?1:-1:0}(e,E,I,C.swapThreshold,null==C.invertedSwapThreshold?C.swapThreshold:C.invertedSwapThreshold,c,f===E),g="swap"):(O=J(E),g="insert"),0===O)return z(!1);f=E,b=O,o=a.boundingRect(E);var L=E.nextElementSibling,j=!1;j=1===O;var q=this._onMove(T,_,y,r,E,o,e,j);if(!1!==q)return 1!==q&&-1!==q||(j=1===q),h=!0,setTimeout(v,30),k?w._hideClone():w._showClone(this),j&&!L?_.appendChild(y):E.parentNode.insertBefore(y,j?L:E),G&&a.scrollBy(G,0,H-G.scrollTop),l.parentEl=y.parentNode,void 0===A||c||(m=Math.abs(A-a.boundingRect(E)[Y])),F(),z(!0)}if(_.contains(y))return z(!1)}return!1}function z(t){return t&&(k?w._hideClone():w._showClone(R),w&&(n.toggleClass(y,P?P.options.ghostClass:w.options.ghostClass,!1),n.toggleClass(y,C.ghostClass,!0)),P!==R&&R!==l.active?P=l.putSortable=R:R===l.active&&(P=l.putSortable=null),r&&R._animate(r,y),E&&o&&R._animate(o,E)),(E===y&&!y.animated||E===_&&!E.animated)&&(f=null),C.dragoverBubble||e.rootEl||E===document||(l.over(e),!t&&l.nearestEmptyInsertDetectEvent(e)),!C.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function F(){R._dispatchEvent(R,T,"change",E,_,T,M,u(y),B,u(y,C.draggable),e)}function J(e){return u(y)<u(e)?1:-1}}_onDrop(e){this.el;var t,a,i=this.options,h=this.sortable,p=l.active.elm(),v=l.dragEl,g=l.putSortable,f=l.parentEl,b=l.oldIndex,m=l.oldDraggableIndex,_=l.nextEl;c=!1,d=!1,h.nativeDraggable&&r.off(document,"drop",this),this._offUpEvents(),e&&(s&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),(p===f||g&&"clone"!==g.lastPutMode)&&o.remove(l.cloneEl),v&&(l._disableDraggable(v),v.style["will-change"]="",n.toggleClass(v,g?g.options.ghostClass:this.options.ghostClass,!1),n.toggleClass(v,this.options.chosenClass,!1),h._dispatchEvent(this,p,"unchoose",v,f,p,b,null,m,null,e),p!==f?(t=u(v),a=u(v,i.draggable),t>=0&&(h._dispatchEvent(null,f,"add",v,f,p,b,t,m,a,e),h._dispatchEvent(this,p,"remove",v,f,p,b,t,m,a,e),h._dispatchEvent(null,f,"sort",v,f,p,b,t,m,a,e),h._dispatchEvent(this,p,"sort",v,f,p,b,t,m,a,e)),g&&g.save()):v.nextSibling!==_&&(t=u(v),a=u(v,i.draggable),t>=0&&(h._dispatchEvent(this,p,"update",v,f,p,b,t,m,a,e),h._dispatchEvent(this,p,"sort",v,f,p,b,t,m,a,e))),l.active&&(null!=t&&-1!==t||(t=b,a=m),h._dispatchEvent(this,p,"end",v,f,p,b,t,m,a,e),h.save()))),this._nulling()}_offUpEvents(){var e=this.el.ownerDocument;r.off(e,"mouseup",this._onDrop),r.off(document,"selectstart",this)}_nulling(){s=null}handleEvent(e){switch(e.type){case"drop":this._onDrop(e);break;case"dragenter":case"dragover":l.dragEl&&(this._onDragOver(e),g(e));break;case"selectstart":e.preventDefault()}}destroy(){this.sortable,his._dndDroppable.destroy()}}});
//# sourceMappingURL=sourcemaps/droppable.js.map
