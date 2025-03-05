<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>PHP Задания</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>PHP Задания</h1>

    <!-- <h2>1. Информация о PHP</h2>
    <?php
    phpinfo();
    ?> -->

    <h2>2. Приветствие</h2>
    <?php
    echo "Привет всем!!! Сделал Куровский Роберт, ПЗТ-38";
    ?>

    <h2>3. Информация о разработчике</h2>
    <?php
    $color = "blue";
    $size = "20px";
    echo "<p style='color: $color; font-size: $size;'>ФИО РАЗРАБОТЧИКА</p>";
    ?>

    <h2>4. Константа NUM_E</h2>
    <?php
    define("NUM_E", 2.71828);
    echo "Число e равно " . NUM_E . ".<br>";
    $num_e1 = NUM_E;
    echo "Тип переменной \$num_e1: " . gettype($num_e1) . ", значение: $num_e1<br>";
    settype($num_e1, "string");
    echo "Тип переменной \$num_e1: " . gettype($num_e1) . ", значение: $num_e1<br>";
    settype($num_e1, "integer");
    echo "Тип переменной \$num_e1: " . gettype($num_e1) . ", значение: $num_e1<br>";
    settype($num_e1, "boolean");
    echo "Тип переменной \$num_e1: " . gettype($num_e1) . ", значение: $num_e1<br>";
    ?>

    <h2>5. Предопределенные константы и переменные</h2>
    <?php
    echo "Версия PHP: " . PHP_VERSION . "<br>";
    echo "Операционная система: " . PHP_OS . "<br>";
    ?>

    <h2>6. Дни недели в заданном месяце</h2>
    <?php
    function getWeekdaysInMonth($month, $year) {
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $weekdaysCount = [
            'Понедельник' => 0,
            'Вторник' => 0,
            'Среда' => 0,
            'Четверг' => 0,
            'Пятница' => 0,
            'Суббота' => 0,
            'Воскресенье' => 0,
        ];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = "$year-$month-$day";
            $weekdayNumber = date('N', strtotime($date)); 
            switch ($weekdayNumber) {
                case 1:
                    $weekdaysCount['Понедельник']++;
                    break;
                case 2:
                    $weekdaysCount['Вторник']++;
                    break;
                case 3:
                    $weekdaysCount['Среда']++;
                    break;
                case 4:
                    $weekdaysCount['Четверг']++;
                    break;
                case 5:
                    $weekdaysCount['Пятница']++;
                    break;
                case 6:
                    $weekdaysCount['Суббота']++;
                    break;
                case 7:
                    $weekdaysCount['Воскресенье']++;
                    break;
            }
        }

        return $weekdaysCount;
    }

    $month = 2; 
    $year = 2025;
    $weekdaysCount = getWeekdaysInMonth($month, $year);

    echo "Количество дней недели в феврале 2025 года:<br>";
    foreach ($weekdaysCount as $day => $count) {
        echo "$day: $count<br>";
    }
    ?>

    <h2>7. Вывод ФИО n+5 раз</h2>
    <?php
    $n = 12; 
    $fullName = "Куровский Роберт Анатольевич";
    for ($i = 0; $i < $n + 5; $i++) {
        echo $fullName . "<br>";
    }
    ?>

    <h2>8. Работа с массивами</h2>
    <?php
    $array = [-22, 10, 4, -2, -5];
    $sumPositive = 0;
    foreach ($array as $num) {
        if ($num > 0) {
            $sumPositive += $num;
        }
    }
    echo "Исходный массив: " . implode(", ", $array) . "<br>";  
    sort($array);
    echo "Сумма положительных элементов: $sumPositive<br>";
    echo "Отсортированный массив: " . implode(", ", $array) . "<br>";
    ?>


    <h2>9. Работа со строками</h2>
    <?php
    $S1 = "Я люблю Гродно"; 
    $S2 = "Я учусь в Политехническом колледже";

    echo "Длина строки S2: " . mb_strlen($S2, 'UTF-8') . "<br>"; 

    $n = 12; 
    if ($n <= strlen($S1)) { 
    $char = mb_substr($S1, $n - 1, 1, 'UTF-8'); 
    echo "Символ на позиции $n в строке S1: $char (ASCII: " . ord($char) . ")<br>";
    } else {
    echo "Ошибка: позиция $n выходит за пределы строки S1.<br>";
    }

    $S1 = str_replace("Гродно", "Минск", $S1); 
    echo "Измененная строка S1: $S1<br>";
    ?>

    <h2>10. Расчет по формуле</h2>
    <?php
    function calculateFormula($x, $y) {
        if ($x == 0) {
            return "Ошибка: деление на ноль.";
        }
        if ($y < 0) {
            return "Ошибка: корень из отрицательного числа.";
        }
        return ($x * $x + 18 * $y - sqrt($y)) / (7 * $x * $x);
    }

    $x = 0;
    $y = -4;
    $result = calculateFormula($x, $y);
    echo "Результат расчета для x = $x и y = $y: $result";
    ?>


</body>
</html>