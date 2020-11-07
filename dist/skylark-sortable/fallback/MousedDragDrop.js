/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-eventer","skylark-domx-styler","skylark-domx-transforms","./ghoster","./autoscroll"],function(t,e,o,n,i,a,l){return t.Emitter.inherit({_construct:function(t){this.dnd=t;var o=e(document);this.listenTo(o,"mousemove",this._onTouchMove.bind(this)),this.listenTo(o,"mouseup",this._onMouseUp.bind(this))},_onMouseUp:function(t){var e=this.dnd;e.putSortable&&e.putSortable._onDrop(t),e.active&&e.active._onDragEnd(t),a.remove(),this.destroy()},_onTouchMove:function(t,e){var o=this.dnd,l=a.ghostEl,r=o.active,s=o.dragEl,c=o.tapEvt;if(c){var d=r.options,h=d.fallbackTolerance,u=d.fallbackOffset,_=t.touches?t.touches[0]:t,v=l&&i.matrix(l),p=l&&v&&v.a,f=l&&v&&v.d,g=a.getRelativeScrollOffset(),m=(_.clientX-c.clientX+u.x)/(p||1)+(g?g[0]-ghostRelativeParentInitialScroll[0]:0)/(p||1),x=(_.clientY-c.clientY+u.y)/(f||1)+(g?g[1]-ghostRelativeParentInitialScroll[1]:0)/(f||1),k=t.touches?"translate3d("+m+"px,"+x+"px,0)":"translate("+m+"px,"+x+"px)";if(!this._dragStarted&&!o.awaitingDragStarted){if(h&&Math.min(Math.abs(_.clientX-r._lastX),Math.abs(_.clientY-r._lastY))<h)return;r._onDragStart(t,!0),a._appendGhost(s,document.body,r.options),o.ignoreNextClick=!0,this._dragStarted=!0,this._loopId=setInterval(this._emulateDragOver.bind(this),50)}!e&&this._handleAutoScroll(_,!0),o.touchEvt=_,l&&n.css(l,"transform",k),t.preventDefault()}},_emulateDragOver:function(t){var e=this.dnd,o=e.dragEl,n=e.touchEvt;if(n){if(this._lastX===n.clientX&&this._lastY===n.clientY&&!t)return;this._lastX=n.clientX,this._lastY=n.clientY;for(var i=document.elementFromPoint(n.clientX,n.clientY),a=i;i&&i.shadowRoot&&(i=i.shadowRoot.elementFromPoint(n.clientX,n.clientY))!==a;)a=i;if(a)do{if(a[e.expando])if(a[e.expando]._onDragOver({clientX:n.clientX,clientY:n.clientY,target:i,rootEl:a}))break;i=a}while(a=a.parentNode);o.parentNode[e.expando]._computeIsAligned(n)}},_handleAutoScroll:function(t,e){var o=this.dnd;if(o.dragEl&&o.active.options.scroll)return l._handleAutoScroll(t,o.active.options,e,o.expando)},destroy:function(){this.unlistenTo(),this._loopId&&clearInterval(this._loopId),l._nulling(),l._clearAutoScrolls(),l._cancelThrottle(),this._dragStarted=!1}})});
//# sourceMappingURL=../sourcemaps/fallback/MousedDragDrop.js.map