<?php


namespace app\components;


use app\components\express\AliExpress;
use app\components\express\BaseExpress;
use yii\base\Component;

class Express extends Component
{
    /**@var BaseExpress $express*/
    private $express;

    public function setExpress($ex = 'Ali')
    {
        $class = $ex.'Express';
        $this->express = new $class();
    }

    public function getExpress()
    {
        if (!$this->express) {
            return new AliExpress();
        }
        return $this->express;
    }

    /**
     * @param $param
     * @return mixed
     */
    public function query($param)
    {
        return $this->getExpress()->query($param);
    }
}