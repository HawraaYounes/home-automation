<?php

namespace App\Http\Controllers;

use App\Models\Memory;
use Illuminate\Http\Request;

class MemoryController extends Controller
{
    public function getMemories($id){
        $memories = Memory::where('album_id',$id);
        return response()->json($memories, 201);
    }

}
