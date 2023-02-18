<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Document</title>
	<script src="./script.js" defer></script>
</head>

<body>
	<div id="chat-window">
		<div id="chat-header">
			<h2>Welcome to the Web IRC Clone Chat Box</h2>
		</div>
		<div id="chat-messages">
			<ul id="previous-messages">
				<?php
				$filename = "chat-log.txt";
				$file = fopen($filename, "r");

				if ($file) {
					while (($line = fgets($file)) !== false) {
						$message = explode("|", $line);
						$username = $message[0];
						$text = $message[1];
						echo "<li><span class='username'>$username:</span> $text</li>";
					}
					fclose($file);
				} else {
					echo "Error opening file.";
				}
				?>
			</ul>
		</div>
		<div id="chat-input">
			<input type="text" placeholder="Type a message">
			<button id="btn-send">Send</button>
		</div>
	</div>
</body>

</html>