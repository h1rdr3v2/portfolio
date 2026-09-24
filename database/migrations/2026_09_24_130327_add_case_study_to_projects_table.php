<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->text('problem')->nullable()->after('story');
            $table->text('outcome')->nullable()->after('problem');
            $table->json('metrics')->nullable()->after('outcome');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['problem', 'outcome', 'metrics']);
        });
    }
};
