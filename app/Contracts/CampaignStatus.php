<?php

namespace App\Contracts;

interface CampaignStatus
{
    public const DRAFT = 'draft';
    public const PAUSE = 'pause';
    public const SEND_NOW = 'send-now';
    public const SEND_LATER = 'send-later';
}
