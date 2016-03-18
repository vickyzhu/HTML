<?php
// Convert RSS feed to JSON, stripping out all but basic HTML
//$rss = new SimpleXMLElement(file_get_contents('http://feeds2.feedburner.com/ft/tech-blog'));
$rss = new SimpleXMLElement(file_get_contents('./rss.xml'));
$xpath = '/rss/channel';
$items = $rss->xpath($xpath);

if ($items) {
  $output = array();
  foreach ($items as $id => $item) {
    $pubdate = strtotime(strval($item->pubDate));
    // This will be encoded as an object, not an array, by json_encode
    $output[] = array(
      'id' => $id + 1,
      'headline' => strval($item->title),
      'date' => date('YÄêmÔÂdÈÕ',$pubdate),
      'body' => strval($item->description),
      'author' => strval($item->children('http://purl.org/dc/elements/1.1/')->creator)
    );
  }
}
//print_r($rss->$xpath);

 echo json_encode($rss -> channel);
//echo json_encode($output);
//echo "hello,api";

?>
