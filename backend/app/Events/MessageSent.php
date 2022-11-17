<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender_id;
    public $rec_id;
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($sender_id,$msg)
    {
        $this->sender_id = $sender_id;
        $this->message = $msg;
    }
    public function broadcastOn()
    {
        return[
            new PrivateChannel('chat-'.$this->sender_id),
        ];
    }

    
}
