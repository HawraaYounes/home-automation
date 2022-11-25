<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function getMessages()
    {
        $messages=Message::all();
        return response()->json($messages, 200);
    }
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'sender_id'=>Auth::user()->id,
            'message' => $request->message,
            'username'=>$request->username
        ]);
        return ['status' => 'Message Sent!'];
      }
}



