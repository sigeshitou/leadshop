<?php


namespace app\components\cloud;


class CloudUpdate extends BaseCloud
{
    public function getVersionData($params = [])
    {
        return $this->httpGet('mall/update/index', $params);
    }
}