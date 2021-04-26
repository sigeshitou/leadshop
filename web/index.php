<?php
defined('YII_DEBUG') or define('YII_DEBUG', false);
defined('YII_ENV') or define('YII_ENV', 'prod');
defined('URL_STRING') or define('URL_STRING', 'HESHOP_URL_STRING');
defined('SHOP_ENVIRONMENT') or define('SHOP_ENVIRONMENT', 'leadshop');
defined('WE7_URL') or define('WE7_URL', '');

error_reporting(E_ALL);

ini_set('display_errors', '1');

require __DIR__ . '/../vendor/autoload.php';

require __DIR__ . '/../vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/../config/web.php';

$leadmall = (new framework\leadmall($config));

(new yii\web\Application($leadmall->config))->run();
