/**
 * @module chart
 * @author Yuan
 */

'use strict';


(function(window, undefined){
	
	/**
	 * 解析JSON解析后的对象
	 * @param {Object} obj
	 * @return {Object}
	 */
	function parseGraph(obj){
		let nodes = createNodes(obj),
				links = createLinks(nodes);
		
		return {
			nodes,
			links,
			category: getCategory(nodes),
		};
	}
	
	
	/**
	 * 将解析后的json对象转换为图的节点
	 * @param {Object} obj
	 */
	function createNodes(obj){
		let list = [];
		
		return create(obj, list);
		
		function create(obj, list){
			let len = obj.children.length;
			
			if(len !== 0){
				for(let i = len-1; i >= 0; create(obj.children[i--], list)){/*empty*/}
			}
			
			let node = JSON.parse(JSON.stringify(obj));
			delete node.children;
			list.push(node);
			
			return list;
		}
	}
	
	
	/* function createLinks(list){
		let links = [],
				count = [],
				_list = JSON.parse(JSON.stringify(list)),
				level = list[0].category;
		
		list.forEach(function(v, i){
			if(v.category === level-1){
				count.push(i);
			}
		});
		
		for(let i = 0, len = count.length; i < len; i++){
			let j = count[i-1]+1 || 0;
			alert(JSON.stringify(_list.splice(0, count[i]+1-j)));
		}
	} */
	
	/**
	 * 创建图的路径
	 * @param {Array} list 节点集合
	 * @return {Array} 路径集合
	 */
	function createLinks(list){
		let arr = [],
				cursor = [],
				links = [];
		
		arr[list[0].category] = [ {target: list[0].name} ];
		for(let i = 1, len = list.length; i<len; i++){
			let obj = list[i],
					lv = obj.category;
			
			if(lv < list[i-1].category){
				for(var j = cursor[lv] || 0, row = lv+1, l_len = arr[row].length; j<l_len; j++){
					arr[row][j].source = obj.name;
				}
				cursor[lv] = l_len;
			}
			
			arr[lv] ? arr[lv].push({target: obj.name}) : arr[lv] = [{target: obj.name}];
		}
		
		arr.forEach(function(v){ links = links.concat(v); });
		
		return links;
	}
	
	
	/**
	 * 获取类别数量值
	 * @param {Array} nodes
	 * @return {Number}
	 */
	function getCategory(nodes){
		return nodes.reduce(function(pre, v){
			return v.category > pre ? v.category : pre;
		}, 0)+1;
	}
	
	
	/**
	 * 生成图表
	 * @param {HTMLCanvasElement} element
	 * @param {Object} opt
	 */
	function createGraph(element, opt){
		if(!opt.data || !opt.links || !opt.category){
			throw new RangeError('缺少属性');
		}
		
		let option = {
			title: { text: opt.title || '', padding: [12, 0], },
			legend: {},
			series: {
				type: 'graph',
				data: opt.data,
				label: { show: true, offset: [0, 10], },
				links: opt.links,
				lineStyle: { color: 'source', },
				categories: [],
			},
		};
		
		for(let i = 0, arr = option.series.categories; i<opt.category; i++){
			arr.push({name: i.toString(),});
		}
		
		echarts.init(element).setOption(option);
	}
	
	
	/**
	 * 创建单轴散点图
	 * @param {HTMLCanvasElement} element
	 * @param {Object} obj
	 */
	 function createSingleScatter(element, obj){
		 let none = {show: false},
				 len = obj.axis.length,
				 handle = function(data){ return data; },
				 option = {
					 title: [],
					 singleAxis: [],
					 series: [],
				 };
		 
		 for(let i = 0; i<len; i++){
			 option.title.push({ top: (i*100+50)/len+'%', text: obj.title[i] || '' },);
			 option.singleAxis.push({
						 type: 'category', top: i*90/len+'%', left: 100, height: 100/len+'%',
						 data: obj.axis[i],
					 });
			 option.series.push({
						 type: 'scatter', coordinateSystem: 'singleAxis',
						 singleAxisIndex: i,
						 data: obj.data[i],
						 symbolSize: handle,
					 });
		 }
		 
		 echarts.init(element).setOption(option);
	 }
	
	
	/**
	 * The 'chart' object is exposed
	 * @type Object
	 */
	var chart = {
		createNodes,
		createLinks,
		getCategory,
		parseGraph,
		createGraph,
		createSingleScatter,
	};
	
	/* @export */
	window.chart = chart;
	
})(typeof window !== 'undefined' ? window : this, undefined);