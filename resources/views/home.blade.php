<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.scss')
    <title>MyApp</title>
</head>

<body>
    <div id="root"></div>
    @vite('resources/js/main.jsx')
</body>

</html>