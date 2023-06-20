$(document).ready(function(){
	$(".fixed_img_col  li").each(function(h){
		var i = $(this).find("a").attr("href");
		var j = (width!=180) ? "C320x180":"C120x90";
		var k =( width==180)?"":"mq";
		if(h%col==0 )$ (this).addClass("odd");
		var d = $(this).find(".thumb img");
		var f = $(this).find(".thumb #str");
		$.ajax({
			url:i,
			dataType:"html",
			success:function(b){

				var e = '<meta property="og:image" content="';
				var g = '"';
				if(b.match(e+"(.*?)"+g)!=null){
					a = b.match(e+"(.*?)"+g)[0];
					a = a.substring(35,a.length-1);
					d.removeClass("dno");
					a = a.replace("image",j);
					a = a.replace("C74x107",j);
					a = a.replace("S74x74",j);
					d.attr("src",a.replace('original',j));
					f.hide();
				}else{
					var tl = b.indexOf('<div id="articleBtmWrap">',0);
					if(tl < 0) tl = b.indexOf('<div class="another_category',0);
					if(tl < 0) tl = b.indexOf('</body',0);
					b = b.substring(b.indexOf('<div class="article">',0),tl);
					var a;
					e = 'https://cfile';
					if(b.match(e+"(.*?)"+g)!=null){
						a = b.match(e+"(.*?)"+g)[0];
						a = a.substring(0,a.length-1);
						d.removeClass("dno");
						a = a.replace("image",j);
						a = a.replace("C74x107",j);
						a = a.replace("S74x74",j);
						d.attr("src",a.replace('original',j));
						f.hide();
					}else{
						e = 'youtube.com/';
						var c = b.indexOf(e);
						if(c > 0){
							c = b.indexOf("/",c+13)+1;
							var l = b.indexOf("?",c);
							if(l<0||l-c>20){
								l = b.indexOf("&",c)
							}
							if(l<0||l-c>20){
								l = b.indexOf('"',c)
							}
							var idx = b.substring(c,l);
							if(idx != "x-shockwave-flash"){
								d.removeClass("dno");
								d.attr("src","https://i2.ytimg.com/vi/"+idx+"/"+k+"default.jpg");
								f.hide();
							}else{
								f.text("No Img")
							}
						}else{
							f.text("No Img")
						}
					}
				}
			}
		});
	});
});