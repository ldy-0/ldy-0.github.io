require('./b.js');

(function(w, undefined){
	/**
	 *
	 * add timeline click event
	 *
	 */
	function active(){
		var parent = document.getElementsByClassName('m-tl')[0];
		
		parent.addEventListener('click', function(e){
			var target = e.target || window.event.srcElement;
			
			if(target.tagName === 'H2'){
				var now = target.parentElement,
            // 水平时间轴中当前显示的节点
						active = document.getElementsByClassName('j-active')[0],
            // 垂直时间轴中当前显示的节点
						active_m = document.getElementsByClassName('j-tl-show')[0],
						now_m = document.getElementsByClassName('m-tl2')[now.value];
						
				if(active === now){
					return ;
				}
				
				active.classList.remove('j-active');
				now.classList.add('j-active');
				
				active_m.classList.remove('j-tl-show');
				active_m.classList.add('j-tl-hide');
				
				now_m.classList.remove('j-tl-hide');
				now_m.classList.add('j-tl-show');
				
			}
			
		});
		
	}
	
	/**
	 *
	 * 创建垂直时间轴节点
	 *
	 * @param {Array} arr
	 */
	function create(arr){
		var tl = document.getElementsByClassName('m-tl2');
		
		for(var k = 0; k<3; k++){
			var data = arr[k];
			
			for(var i = 0, len = data.length; i<len; i++){
				var li = document.createElement('li'),
						h2 = document.createElement('h2'),
						ul = document.createElement('ul');
				
				h2.appendChild(document.createTextNode(data[i].date));
				
				for(var j = 0, tip_len = data[i].tips.length; j<tip_len; j++){
					var lll = document.createElement('li');
					lll.appendChild(document.createTextNode(data[i].tips[j]));
					ul.appendChild(lll);
				}
				ul.classList.add('tl2-content');
				
				li.appendChild(h2);
				li.appendChild(ul);
				
				li.classList.add('u-tl2');
				tl[k].appendChild(li);
				
			}
			
		}
		
	}
	
	base.active = active;
	base.create = create;
})(window, undefined);
	