<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function getHistories(){
        $histories=History::all();
        return response()->json($histories, 201);
    }
}
