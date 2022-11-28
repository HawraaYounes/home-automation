<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Memory;
use Illuminate\Http\Request;
use Validator;

class MemoryController extends Controller
{
    public function getMemories($id){
        $memories = Memory::where('album_id',$id)->get();
        return response()->json($memories, 200);
    }

   
}
