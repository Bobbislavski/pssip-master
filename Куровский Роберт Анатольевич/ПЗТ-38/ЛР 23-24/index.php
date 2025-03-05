<?php
session_start();

if (isset($_POST['set_cookie'])) {
    $cookie_value = $_POST['cookie_value'];
    setcookie('user', $cookie_value, time() + 3600, '/'); 
    echo "<p class='message'>Cookie 'user' установлен со значением: $cookie_value</p>";
}

if (isset($_POST['clear_cookie'])) {
    setcookie('user', '', time() - 3600, '/');
    echo "<p class='message'>Cookie 'user' очищен.</p>";
}

if (isset($_POST['set_session'])) {
    $_SESSION['username'] = $_POST['session_value'];
    echo "<p class='message'>Сессия установлена. Имя пользователя: " . $_SESSION['username'] . "</p>";
}

if (isset($_POST['clear_session'])) {
    session_unset();
    session_destroy();
    echo "<p class='message'>Сессия завершена.</p>";
}


$file = 'example.txt';

if (isset($_POST['write_file'])) {
    $text = $_POST['file_content'];
    file_put_contents($file, $text . PHP_EOL, FILE_APPEND);
    echo "<p class='message'>Текст успешно записан в файл.</p>";
}

if (isset($_POST['clear_file'])) {
    file_put_contents($file, '');
    echo "<p class='message'>Файл очищен.</p>";
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Работа с Cookies, Сессиями и Файлами</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #444;
            text-align: center;
        }
        h2 {
            color: #555;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
        }
        form {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input[type="text"], textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        textarea {
            resize: vertical;
            height: 100px;
        }
        button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #218838;
        }
        button[name="clear_cookie"],
        button[name="clear_session"],
        button[name="clear_file"] {
            background-color: #dc3545;
        }
        button[name="clear_cookie"]:hover,
        button[name="clear_session"]:hover,
        button[name="clear_file"]:hover {
            background-color: #c82333;
        }
        .message {
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }
        pre {
            background: #fff;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #ddd;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>Работа с Cookies, Сессиями и Файлами</h1>

    <h2>Cookies</h2>
    <form method="post">
        <label for="cookie_value">Установить Cookie:</label>
        <input type="text" id="cookie_value" name="cookie_value" placeholder="Введите значение">
        <button type="submit" name="set_cookie">Установить</button>
        <button type="submit" name="clear_cookie">Очистить Cookie</button>
    </form>
    <p>Текущее значение Cookie 'user': <strong><?php echo $_COOKIE['user'] ?? 'Не установлено'; ?></strong></p>

    <h2>Сессии</h2>
    <form method="post">
        <label for="session_value">Установить Сессию:</label>
        <input type="text" id="session_value" name="session_value" placeholder="Введите имя">
        <button type="submit" name="set_session">Установить</button>
        <button type="submit" name="clear_session">Завершить Сессию</button>
    </form>
    <p>Текущее значение Сессии 'username': <strong><?php echo $_SESSION['username'] ?? 'Не установлено'; ?></strong></p>

    <h2>Файлы</h2>
    <form method="post">
        <label for="file_content">Записать в файл:</label>
        <textarea id="file_content" name="file_content" placeholder="Введите текст"></textarea>
        <button type="submit" name="write_file">Записать</button>
        <button type="submit" name="clear_file">Очистить файл</button>
    </form>
    <h3>Содержимое файла:</h3>
    <pre><?php echo file_exists($file) ? file_get_contents($file) : 'Файл пуст или отсутствует.'; ?></pre>
</body>
</html>