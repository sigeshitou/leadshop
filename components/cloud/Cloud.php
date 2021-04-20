<?php


namespace app\components\cloud;


use yii\base\Component;

class Cloud extends Component
{
    /** @var CloudUpdate $update */
    public $update;

    public function init()
    {
        parent::init();
        $this->update = new CloudUpdate();
    }
}