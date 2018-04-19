
/**
* 面板字体渐入渐出动画
*/
function penel(){
	var elements = document.getElementsByClassName('penel')[0].getElementsByClassName('opacity');
	// HTMLCollection是动态的
	while(elements.length){
		elements[0].classList.remove('opacity');
	}
}

/**
 * 设置菜单点击事件
 */
function menuTrigger(){
	trigger();
	document.getElementsByClassName('nav-btn')[0].addEventListener('click', trigger, false);

	function trigger(e){
		var nav = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0];
		//TODO: IE9 no suport contains
		if(/j-hide/.test(nav.className)){
			nav.classList.remove('j-hide');
			return nav.classList.add('j-show');
		};

		nav.classList.remove('j-show');
		nav.classList.add('j-hide');
	}
	
}

/**
*缩列图点击事件
*/
function thumbnail(){
	document.getElementsByClassName('thumbnail-wrap')[0].addEventListener('click', callback, true);

	function callback(e){
		var target = e.target || e.srcElement;

		if(target.tagName === 'IMG'){
			return window.open(target.getAttribute('alt')+'.html', '_self');
		}else if(target.className.match(/(?:blur|caption)/)){
			return window.open(target.getAttribute('value')+'.html', '_self');
		};
	}
}


/**
 *
 * To determine whether the mobile terminal/判断是否为移动端
 *
 * @return {Boolean}
 */
function isMob(){
	return /(Android|iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}


/**
 * 发起get请求
 *
 * @param {String} path
 * @param {Function} callback
 */
function get(path, callback){
		if(window.XMLHttpRequest){
			var xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject('MicroSoft.XMLHTTP');
		}
		
		xhr.onreadystatechange = function(e){
			if(xhr.readyState === 4 && xhr.status === 200){
				callback(JSON.parse(xhr.responseText));
			}
		}
		
		xhr.open('GET', path, true);
		xhr.send();

}


/**
*国旗绘制
*/
function drawFlag(){
	var ps = document.getElementsByClassName('flag-star');
	ps[0].setAttribute('points',draw(40,40,24));
	ps[1].setAttribute('points',draw(80,16,8));
	ps[2].setAttribute('points',draw(96,32,8));
	ps[3].setAttribute('points',draw(96,56,8));
	ps[4].setAttribute('points',draw(80,72,8));
}

/**
 * 单个五角星绘制
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r
 * @return {String} points
 */
function draw(x,y,r){
	var points = x+' '+(y-r), t = 0.38,
		cos18 = Math.cos(Math.PI/10), sin18 = Math.sin(Math.PI/10),
		cos54 = Math.cos(Math.PI*54/180), sin54 = Math.sin(Math.PI*54/180);

	points += ' '+(x+r*t*cos54)+' '+(y-r*t*sin54);
	points += ' '+(x+r*cos18)+' '+(y-r*sin18);
	points += ' '+(x+r*t*cos18)+' '+(y+r*t*sin18);
	points += ' '+(x+r*cos54)+' '+(y+r*sin54);
	points += ' '+(x)+' '+(y+r*t);
	points += ' '+(x-r*cos54)+' '+(y+r*sin54);
	points += ' '+(x-r*t*cos18)+' '+(y+r*t*sin18);
	points += ' '+(x-r*cos18)+' '+(y-r*sin18)
	points += ' '+(x-r*t*cos54)+' '+(y-r*t*sin54);
	
	return points;
}