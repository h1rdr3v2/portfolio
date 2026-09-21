<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();
            $table->string('emoji', 16);
            $table->string('fingerprint', 64);
            $table->timestamps();

            // One of each emoji per reader per post; toggling removes the row.
            $table->unique(['post_id', 'emoji', 'fingerprint']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
