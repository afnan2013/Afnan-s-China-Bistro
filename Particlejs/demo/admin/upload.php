<?php

$targetPath = "uploads/" . basename($_FILES["inputImage"]["name"]);
move_uploaded_file($_FILES["inputImage"]["tmp_name"], $targetPath);

?>