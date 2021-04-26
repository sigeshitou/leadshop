<?php

namespace app\controllers;

use app\forms\ImageTools;
use Yii;
use yii\web\Controller;

class SiteController extends Controller
{
    use ImageTools;
    public $layout = false;

    /**
     * Displays homepage.
     * 测试访问地址
     * https://qmpaas.picp.vip/index.php?q=api/leadmall/demo
     * @return string
     */
    public function actionIndex()
    {
        $install_file = Yii::$app->BasePath . '/install.lock';
        if (!file_exists($install_file)) {
            $this->redirect(array('/install/index'));
        } else {
            $this->redirect(array('/admin/index'));
        }
    }
}
