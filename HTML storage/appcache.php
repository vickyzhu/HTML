<!DOCTYPE html>
<html lang="en" manifest="manifest.appcache">
<head>
	<meta charset="UTF-8">
	<title>App cache demo</title>
</head>
<body>
	<h1>APP Cache Demo</h1>	
	<ul>
		<li><img src="1.jpg"></li>
		<li><img src="2.jpg"></li>
		<li><img src="pikachu.jpg"></li>
	</ul>
	<script type="text/javascript">
		window.addEventListener('load',function(e){
			window.applicationCache.addEventListener('updateready',function(e){
				console.log(window.applicationCache.status);
				if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
					window.applicationCache.swapCache();
					if(confirm('A new version of this site is available.Load if?')){
						window.location.reload();
					}
				}else{
					console.log("manifest didn't change");
				}
			},false);
		},false);
	</script>
</body>
</html>