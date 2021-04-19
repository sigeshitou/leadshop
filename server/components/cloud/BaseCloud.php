<?php

namespace app\components\cloud;

use app\components\core\Request;

abstract class BaseCloud extends Request
{
    public $baseUrl = 'aHR0cHM6Ly9jbG91ZC5sZWFkc2hvcC52aXA=';

    public function init()
    {
        $this->requestHeader = [
            'x-version' => app_version(),
        ];
        parent::init();
    }
}