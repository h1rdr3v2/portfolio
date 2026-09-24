<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->text('story')->nullable()->change();
        });
    }

    public function down(): void
    {
        DB::table('projects')->whereNull('story')->update(['story' => '']);

        Schema::table('projects', function (Blueprint $table) {
            $table->text('story')->nullable(false)->change();
        });
    }
};
