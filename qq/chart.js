var chart = (function() {
	var $btn = document.querySelector('.chart_send');
	var $txt = document.querySelector('.chart_content');
	var $rigth = document.querySelector('.main__right');
	var chartBox = document.querySelector('.chart-box__main');
	return {
		init: function() {
			this.event()
		},
		event: function() {
			var _this = this;
			$btn.onclick = function() {
				// 获取文本框的值
				var val = $txt.value.trim();
				if(val) {
					// 如果文本框有内容
					_this.chartdom(val);
					// 聊天内容加入以后在计算高度
					chartBox.scrollTop = chartBox.scrollHeight - chartBox.clientHeight;
					// 清空文本
					$txt.value = '';

				}
				_this.sendAjax(val,_this.cb);
			}
			$txt.onkeydown = function(ev) {
				ev = ev || window.event;
				var keyCode = ev.keyCode || ev.which;
				if(ev.ctrlKey) {
					if(keyCode == 13) {
						$btn.click();
					}
				}
			}
		},
		chartdom(val, imgAvter) {
			imgAvter = imgAvter || 'img/xiaolan.jpg'
			var $li = document.createElement('li');
			$li.className = 'main__right';
			var span = document.createElement('span');
			span.className = 'main_bg';
			var $text = document.createTextNode(val);
			span.appendChild($text);
			$li.appendChild(span);
			span = document.createElement('span');
			span.className = 'main_avater';
			var $img = document.createElement('img');
			$img.src = imgAvter;
			span.appendChild($img);
			$li.appendChild(span);
			chartBox.appendChild($li);
		},
		sendAjax(val,cb) {	
			var _this = this
			var xhr = new XMLHttpRequest();
			var prams = {
				"key": "d736a63a648647258c6ca195baa72671",
//				"info": "val"
				"userid":"123456"
			
			}
			xhr.open('POST', `http://www.tuling123.com/openapi/api?key=d736a63a648647258c6ca195baa72671&info=${val}&"userid"="123456"`, true);
			xhr.send(prams);
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					_this.data = xhr.responseText;
					_this.data = JSON.parse(_this.data);
					if(typeof cb == "function"){
						cb(_this.data);
					}
				}
			}
		},
		cb(data){
			setTimeout(function(){
			var text = data.text;
			var $li = document.createElement('li');
			$li.className = 'main__left';
			span = document.createElement('span');
			span.className = 'main_avater';
			$li.appendChild(span);
			var $img = document.createElement('img');
			$img.src = 'img/xiaoming.jpg';
			span.appendChild($img);
			var span = document.createElement('span');
			span.className = 'main_bg';
			var $text = document.createTextNode(text);
			span.appendChild($text);
			$li.appendChild(span);
			chartBox.appendChild($li);
			chartBox.scrollTop = chartBox.scrollHeight - chartBox.clientHeight
			}
		,1000)}
		
	}
}())