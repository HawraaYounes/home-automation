<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Temperature implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $temperature;

  public function __construct($temperature)
  {
      $this->temperature = $temperature;
  }

    public function broadcastOn()
    {
        return ['temperature-channel'];
    }
    public function broadcastAs()
    {
        return 'temperature';
    }
}
