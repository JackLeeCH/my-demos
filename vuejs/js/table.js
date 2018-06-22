//Date formatter
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//Simulated data
var smData = [
    {
        page: 1,
        pageSize: 5,
        count: 12,
        list: [
            {id: 1, name: 'Aron', sex: 'male', age: 18, birthday: '1990-12-23 10:22:33'},
            {id: 2, name: 'Black', sex: 'male', age: 20, birthday: '1990-12-23 10:22:33'},
            {id: 3, name: 'Blue', sex: 'female', age: 18, birthday: '1990-12-23 10:22:33'},
            {id: 4, name: 'David', sex: 'male', age: 20, birthday: '1990-12-23 10:22:33'},
            {id: 5, name: 'Helln', sex: 'female', age: 18, birthday: '1990-12-23 10:22:33'}
        ]
    },
    {
        page: 2,
        pageSize: 5,
        count: 12,
        list: [
            {id: 6, name: 'Alice', sex: 'female', age: 18, birthday: '1990-12-23 10:22:33'},
            {id: 7, name: 'Geo', sex: 'male', age: 18, birthday: '1990-12-23 10:22:33'},
            {id: 8, name: 'Jack', sex: 'male', age: 23, birthday: '1990-12-23 10:22:33'},
            {id: 9, name: 'Olen', sex: 'male', age: 23, birthday: '1990-12-23 10:22:33'},
            {id: 10, name: 'Linda', sex: 'female', age: 18, birthday: '1990-12-23 10:22:33'}
        ]
    },
    {
        page: 3,
        pageSize: 5,
        count: 12,
        list: [
            {id: 11, name: 'Nick', sex: 'female', age: 19, birthday: '1990-12-23 10:22:33'},
            {id: 12, name: 'Peter', sex: 'male', age: 18, birthday: '1990-12-23 10:22:33'}
        ]
    }
];

//分页组件
var pagination = Vue.component("page", {
	template: "#page",
	props: {
        ops: {
        	type: Object,
        	default: {
				current: 1,
				showItem: 5,
				allpage: 1,
				targetpage: ''
			}
        }
    },
	data: function() {
		return this.ops;
	},
	computed: {
		pages: function() {
			//console.log(this.ops.current);
			var pag = [];
			if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
				//总页数和要显示的条数那个大就显示多少条
				var i = Math.min(this.showItem, this.allpage);
				while(i) {
					pag.unshift(i--);
				}
			} else { //当前页数大于显示页数了
				var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
					i = this.showItem;
				if(middle > (this.allpage - this.showItem)) {
					middle = (this.allpage - this.showItem) + 1
				}
				while(i--) {
					pag.push(middle++);
				}
			}
			return pag
		}
	},
	methods: {
		goto: function(index) {
			//console.log(this.ops);
			if(index == this.current) return;
			var numreg = /\d+/g;
			if(!numreg.test(index)){
                //layer.msg("页码格式不规范！");
                alert("页码格式不规范！");
				return;
			};
			this.current = index;
			
			//这里可以发送ajax请求
			this.$parent.$emit('pageChange', index);
		},
	}
});

//注册Vue
var vue = new Vue({
	el: '#container',
	data: {
		data: [],
		index: 1,
		query: {
			cp_name: '',  //姓名
			op: 'select',
			page: 1,
			pageSize: 5
		},
		pageoption: {
			current: 1,
			showItem: 5,
			allpage: 1,
			targetpage: ''
		}
	},
	methods: {
		querySearch: function(){
            //只模拟了返回数据，查询方法不支持
            
			//发起请求
			// $.get('php/xxxxxx.php', this.query, function(res,status,xhr){
			// 	...
            // }, 'json');
            var _this = this;
            var res = smData[_this.query.page-1];
            _this.data = res.list;
			_this.pageoption.allpage = Math.ceil(res.count/_this.query.pageSize);
		},
		queryReset: function(){
			this.query = {
				cp_name: '',  //姓名
				op: 'select',
				page: 1,
				pageSize: 5
			};
			this.querySearch();
        },
        edit: function(id, name){
            alert('编辑：'+id+'---'+name);
        },
        dele: function(id, name){
            alert('删除：'+id+'---'+name);
        }
	},
	mounted: function(){
		this.$on('pageChange', function(index){
			this.query.page = index;
			this.querySearch();
		});
	},
	components: {
		
	},
	filters: {
		dateFormat: function(str){
			var _time = new Date(str);
			return _time.Format('yyyy年MM月dd日');
		}
	}
});

vue.querySearch();
