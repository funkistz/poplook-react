<!DOCTYPE html>
<html>
<head>
	<title>Loyalty List Fetch</title>
</head>
<body>
	<p>Hello! {{ $name }}. The Loyalty List you fetch is finish, you can check the list.</p>
	@foreach ($id_shop as $shop)
	@if($shop == 6)
	<h4>SGD</h4>
	@elseif($shop == 7)
	<h4>INTL</h4>
	@else
	<h4>MY</h4>
	@endif
	<ul>
		<li>Bronze List click <a href={{ $url . '?year_sel='.$year.'&filter_tier=1&filter_shop='.$shop.'&fetch_filter_button=0' }}>Here</a></li>
		<li>Silver List click <a href={{ $url . '?year_sel='.$year.'&filter_tier=2&filter_shop='.$shop.'&fetch_filter_button=0' }}>Here</a></li>
		<li>Gold List click <a href={{ $url . '?year_sel='.$year.'&filter_tier=3&filter_shop='.$shop.'&fetch_filter_button=0' }}>Here</a></li>
	</ul>
	@endforeach
</body>
</html>
